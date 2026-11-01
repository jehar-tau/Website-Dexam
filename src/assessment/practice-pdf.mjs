import { PDFDocument, PDFName, PDFString, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export const A4_SIZE = [595.2755905511812, 841.8897637795277];
export const PRACTICE_PDF_PAGES = 5;
export const PDF_LAYOUT_VERSION = "discovery-a4-v1";
export const PDF_FONT_FILES = {
  body: "Figtree-Regular.ttf",
  strong: "Figtree-SemiBold.ttf",
  heading: "ZillaSlab-Medium.ttf",
  brand: "ZillaSlab-Bold.ttf",
};
const W = A4_SIZE[0],
  H = A4_SIZE[1],
  M = 42,
  CW = W - M * 2,
  BOTTOM = 778;
const hex = (value) =>
  rgb(...value.match(/.{2}/g).map((x) => parseInt(x, 16) / 255));
const C = {
  paper: hex("faf9f3"),
  ink: hex("162824"),
  green: hex("386451"),
  muted: hex("53634f"),
  line: hex("dde0d4"),
  sage: hex("edf1df"),
  peach: hex("f4eade"),
  sand: hex("f4efdc"),
  orange: hex("ef633d"),
  yellow: hex("edc668"),
  white: hex("fffef9"),
};
const clean = (text) =>
  String(text)
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/\u00a0/g, " ");
let fontRequest;
async function loadFonts() {
  if (!fontRequest)
    fontRequest = Promise.all(
      Object.entries(PDF_FONT_FILES).map(async ([key, name]) => {
        const response = await fetch(
          `${import.meta.env?.BASE_URL || "/"}assets/fonts/${name}`,
        );
        if (!response.ok) throw new Error("PDF fonts could not be loaded");
        return [key, new Uint8Array(await response.arrayBuffer())];
      }),
    )
      .then(Object.fromEntries)
      .catch((error) => {
        fontRequest = undefined;
        throw error;
      });
  return fontRequest;
}

// A separate vector layout keeps the file A4 on every device. All text remains
// selectable; local fonts are embedded, and no response is sent to a service.
export async function createPracticePdf(report, { fontBytes } = {}) {
  if (
    !report.complete ||
    report.coaching.priorities.length !== 3 ||
    report.coaching.plan.length !== 4
  )
    throw new Error(
      "Complete all 30 activities before downloading the full report.",
    );
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const bytes = fontBytes || (await loadFonts());
  const fonts = Object.fromEntries(
    await Promise.all(
      Object.keys(PDF_FONT_FILES).map(async (key) => [
        key,
        await doc.embedFont(bytes[key], { subset: true }),
      ]),
    ),
  );
  doc.setTitle("Your design practice plan | DEXAM");
  doc.setAuthor("DEXAM - Design Exam Academy");
  doc.setSubject(
    "Personal practice priorities, daily observations and a four-week plan",
  );
  doc.setCreator(`DEXAM Discovery / ${PDF_LAYOUT_VERSION}`);
  doc.catalog.set(PDFName.of("Lang"), PDFString.of("en-IN"));

  function lines(value, width, size = 10.2, font = fonts.body) {
    const output = [];
    for (const paragraph of clean(value).split("\n")) {
      let line = "";
      for (const word of paragraph.split(/\s+/).filter(Boolean)) {
        if (font.widthOfTextAtSize(word, size) > width)
          throw new Error("PDF contains a word wider than its column");
        const next = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(next, size) > width && line) {
          output.push(line);
          line = word;
        } else line = next;
      }
      output.push(line);
    }
    return output;
  }
  const height = (value, width, size = 10.2, leading = 14, font = fonts.body) =>
    lines(value, width, size, font).length * leading;
  function text(
    page,
    value,
    x,
    top,
    width,
    { size = 10.2, leading = 14, font = fonts.body, color = C.muted } = {},
  ) {
    const wrapped = lines(value, width, size, font);
    if (top + wrapped.length * leading > BOTTOM)
      throw new Error("The report needs more space on this page");
    wrapped.forEach((line, i) =>
      page.drawText(line, {
        x,
        y: H - top - size - i * leading,
        size,
        font,
        color,
      }),
    );
    return top + wrapped.length * leading;
  }
  function box(page, x, top, width, tall, color = C.white, border = true) {
    if (top < 20 || top + tall > BOTTOM)
      throw new Error(
        `A report panel would extend beyond the printable area (${Math.round(top)} + ${Math.round(tall)})`,
      );
    page.drawRectangle({
      x,
      y: H - top - tall,
      width,
      height: tall,
      color,
      ...(border ? { borderColor: C.line, borderWidth: 0.6 } : {}),
    });
  }
  function rule(page, top, x = M, width = CW) {
    page.drawLine({
      start: { x, y: H - top },
      end: { x: x + width, y: H - top },
      color: C.line,
      thickness: 0.6,
    });
  }
  const label = (page, value, x, top, width = CW) =>
    text(page, value.toUpperCase(), x, top, width, {
      size: 7.6,
      leading: 10,
      font: fonts.strong,
      color: C.green,
    });
  function brand(page) {
    let x = M;
    for (const [value, color] of [
      ["DEX", C.ink],
      ["A", C.orange],
      ["M", C.ink],
    ]) {
      page.drawText(value, {
        x,
        y: H - 48,
        size: 22,
        font: fonts.brand,
        color,
      });
      x += fonts.brand.widthOfTextAtSize(value, 22);
    }
    page.drawLine({
      start: { x: x + 12, y: H - 30 },
      end: { x: x + 12, y: H - 49 },
      color: C.line,
      thickness: 0.8,
    });
    text(page, "DESIGN EXAM ACADEMY", x + 23, 35, 180, {
      size: 7.3,
      leading: 10,
      font: fonts.strong,
      color: C.ink,
    });
    rule(page, 62);
  }
  function page(number, eyebrow, title, intro) {
    const p = doc.addPage(A4_SIZE);
    p.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.paper });
    brand(p);
    label(p, eyebrow, M, 81);
    text(p, title, M, 98, CW, {
      size: 28,
      leading: 32,
      font: fonts.heading,
      color: C.ink,
    });
    if (intro) text(p, intro, M, 136, CW, { size: 10, leading: 14 });
    rule(p, 796);
    p.drawText("DEXAM / PERSONAL PRACTICE GUIDE", {
      x: M,
      y: 29,
      font: fonts.body,
      size: 7.3,
      color: C.muted,
    });
    const count = `${number} / ${PRACTICE_PDF_PAGES}`;
    p.drawText(count, {
      x: W - M - fonts.strong.widthOfTextAtSize(count, 8),
      y: 29,
      font: fonts.strong,
      size: 8,
      color: C.ink,
    });
    return p;
  }
  function bullets(p, items, x, top, width) {
    let y = top;
    for (const item of items) {
      p.drawCircle({ x: x + 2, y: H - y - 5.5, size: 1.3, color: C.green });
      y = text(p, item, x + 12, y, width - 12) + 5;
    }
    return y;
  }
  function linkedResource(p, resource, top) {
    const title = `${resource.publisher} - ${resource.title}`;
    let end = text(p, title, M, top, CW, {
      size: 9.5,
      leading: 13,
      font: fonts.strong,
      color: C.green,
    });
    const url = resource.href.replace(/^https:\/\//, "");
    end = text(p, url, M, end + 2, CW, { size: 8, leading: 11 });
    const annotation = doc.context.register(
      doc.context.obj({
        Type: "Annot",
        Subtype: "Link",
        Rect: [M, H - end, W - M, H - top],
        Border: [0, 0, 0],
        A: { Type: "Action", S: "URI", URI: PDFString.of(resource.href) },
      }),
    );
    p.node.addAnnot(annotation);
    return end + 9;
  }

  // 1 - Personal priorities. Area marks are intentionally deferred to page 5.
  {
    const p = page(1, "01 / YOUR NEXT STEPS", "A clearer way to grow.");
    const introEnd = text(p, report.coaching.intro, M, 139, CW - 92, {
      size: 10.4,
      leading: 14.5,
    });
    box(p, W - M - 70, 83, 70, 75, C.sage);
    text(p, String(report.overall), W - M - 58, 91, 52, {
      size: 31,
      leading: 35,
      font: fonts.heading,
      color: C.ink,
    });
    label(p, "/100", W - M - 54, 128, 43);
    let y = Math.max(175, introEnd + 12);
    for (const focus of report.coaching.priorities) {
      const ix = M + 17,
        leftWidth = 218,
        rightX = M + 269,
        rightWidth = CW - 286;
      const leftH = 18 + height(focus.diagnosis, leftWidth);
      const rightH =
        18 +
        focus.study.reduce((n, t) => n + height(t, rightWidth - 12) + 5, 0);
      const panelH = 50 + Math.max(leftH, rightH) + 16;
      box(p, M, y, CW, panelH);
      label(
        p,
        `${focus.order < 10 ? "0" : ""}${focus.order} / ${focus.skill}`,
        ix,
        y + 14,
        CW - 34,
      );
      text(p, focus.title, ix, y + 29, CW - 34, {
        size: 18,
        leading: 22,
        font: fonts.heading,
        color: C.ink,
      });
      label(p, "What to strengthen", ix, y + 54, leftWidth);
      text(p, focus.diagnosis, ix, y + 72, leftWidth);
      label(p, "Study these ideas", rightX, y + 54, rightWidth);
      bullets(p, focus.study, rightX, y + 72, rightWidth);
      y += panelH + 13;
    }
    const compactLoop = [
      "3 min / Observe one example and describe a design decision.",
      "5 min / Sketch one change and compare it with the original.",
      "2 min / Note what became clearer and what to try tomorrow.",
    ];
    label(p, "A ten-minute daily loop", M, y + 1);
    y += 18;
    const col = (CW - 24) / 3;
    const tall =
      24 + Math.max(...compactLoop.map((s) => height(s, col - 24, 9.2, 12)));
    compactLoop.forEach((s, i) => {
      box(p, M + i * (col + 12), y, col, tall, C.sage);
      text(p, s, M + i * (col + 12) + 12, y + 12, col - 24, {
        size: 9.2,
        leading: 12,
      });
    });
  }

  // 2 - Everyday practice, with room for a short written reflection.
  {
    const p = page(
      2,
      "02 / NOTICE A LITTLE MORE",
      "A design habit. In your everyday.",
      "Use familiar signs, objects and spaces to practise seeing decisions more deliberately.",
    );
    let y = 170;
    for (const [i, focus] of report.coaching.priorities.entries()) {
      const leftW = (CW - 48) / 2,
        rightW = leftW;
      const tall =
        52 +
        Math.max(
          18 + height(focus.notice, leftW),
          18 +
            height(focus.today, rightW, 9.8, 13.5) +
            10 +
            height("Ask: " + focus.reflect, rightW, 9.5, 13),
        ) +
        16;
      box(p, M, y, CW, tall, [C.sage, C.peach, C.sand][i]);
      label(p, focus.skill, M + 16, y + 12, CW - 32);
      text(p, focus.observationTitle, M + 16, y + 26, CW - 32, {
        size: 17,
        leading: 20,
        font: fonts.heading,
        color: C.ink,
      });
      label(p, "Notice this", M + 16, y + 51, leftW);
      text(p, focus.notice, M + 16, y + 68, leftW);
      const rx = M + CW / 2 + 8;
      label(p, "Try this", rx, y + 51, rightW);
      const end = text(p, focus.today, rx, y + 68, rightW, {
        size: 9.8,
        leading: 13.5,
      });
      text(p, "Ask: " + focus.reflect, rx, end + 10, rightW, {
        size: 9.5,
        leading: 13,
      });
      y += tall + 12;
    }
    if (y + 42 < BOTTOM)
      text(
        p,
        "Keep a quick photo, sketch or three-line note: what you noticed, what you changed and what you want to try tomorrow.",
        M,
        y + 4,
        CW,
        { size: 9.7, leading: 13 },
      );
  }

  // 3 and 4 - Two complete weekly briefs per page, with explicit outputs.
  for (let group = 0; group < 2; group++) {
    const p = page(
      3 + group,
      `0${3 + group} / YOUR FOUR-WEEK PLAN`,
      `Weeks ${group * 2 + 1} & ${group * 2 + 2}. Make it a practice.`,
      "Build a small body of work. Compare versions and revise after a real conversation.",
    );
    let y = 174;
    for (const week of report.coaching.plan.slice(group * 2, group * 2 + 2)) {
      const col = (CW - 56) / 2,
        x = M + 17,
        rx = M + CW / 2 + 11;
      const leftH =
        10 +
        8 +
        week.study.reduce((n, t) => n + height(t, col - 12) + 5, 0) +
        9 +
        height(week.notice, col) +
        13 +
        height(week.rhythm, col, 9.3, 12.5);
      const rightH =
        10 +
        8 +
        height(week.make, col) +
        13 +
        10 +
        7 +
        height(week.output, col, 9.5, 13) +
        14 +
        10 +
        7 +
        height(week.check, col, 9.5, 13);
      const tall = 65 + Math.max(leftH, rightH) + 16;
      box(p, M, y, CW, tall);
      label(p, `Week ${week.week} / ${week.skill}`, x, y + 14, CW - 34);
      text(p, week.title, x, y + 30, CW - 34, {
        size: 19,
        leading: 23,
        font: fonts.heading,
        color: C.ink,
      });
      label(p, "Learn & notice", x, y + 65, col);
      let ly = bullets(p, week.study, x, y + 83, col) + 8;
      ly = text(p, week.notice, x, ly, col) + 12;
      rule(p, ly, x, col);
      text(p, week.rhythm, x, ly + 9, col, { size: 9.3, leading: 12.5 });
      label(p, "Make this", rx, y + 65, col);
      let ry = text(p, week.make, rx, y + 83, col) + 13;
      label(p, "By the end of the week", rx, ry, col);
      ry += 17;
      ry = text(p, week.output, rx, ry, col, { size: 9.5, leading: 13 }) + 14;
      label(p, "Check your progress", rx, ry, col);
      text(p, week.check, rx, ry + 17, col, { size: 9.5, leading: 13 });
      y += tall + 18;
    }
  }

  // 5 - A brief area overview, useful resources and interpretation notes.
  {
    const p = page(
      5,
      "05 / YOUR PERFORMANCE, AT A GLANCE",
      "Keep the curiosity. Build the practice.",
      "Use this skill snapshot to place your guidance in context. Keep the work you make to see change over time.",
    );
    const gap = 12,
      cellW = (CW - gap * 2) / 3,
      cellH = 62;
    for (const [i, skill] of report.skills.entries()) {
      const x = M + (i % 3) * (cellW + gap),
        y = 174 + Math.floor(i / 3) * (cellH + 9);
      box(p, x, y, cellW, cellH);
      const score = String(skill.score ?? "-");
      const scoreWidth = Math.max(
        28,
        fonts.heading.widthOfTextAtSize(score, 19),
      );
      text(p, skill.name, x + 11, y + 11, cellW - 28 - scoreWidth, {
        size: 10,
        leading: 12,
        font: fonts.strong,
        color: C.ink,
      });
      text(p, score, x + cellW - 11 - scoreWidth, y + 8, scoreWidth + 1, {
        size: 19,
        leading: 22,
        font: fonts.heading,
        color: C.ink,
      });
      p.drawRectangle({
        x: x + 11,
        y: H - y - 40,
        width: cellW - 22,
        height: 2.5,
        color: C.line,
      });
      if (skill.score > 0)
        p.drawRectangle({
          x: x + 11,
          y: H - y - 40,
          width: ((cellW - 22) * skill.score) / 100,
          height: 2.5,
          color: C.green,
        });
      text(p, skill.label, x + 11, y + 46, cellW - 22, {
        size: 8,
        leading: 10,
      });
    }
    let y = 392;
    label(p, "How to see your progress", M, y);
    y =
      text(p, report.coaching.progress, M, y + 18, CW, {
        size: 9.7,
        leading: 13.5,
      }) + 18;
    const resources = [
      ...new Map(
        report.coaching.priorities
          .map((s) => s.resources[0])
          .concat(report.coaching.processResource)
          .map((s) => [s.href, s]),
      ).values(),
    ];
    label(p, "A place to keep learning", M, y);
    y += 20;
    for (const resource of resources) y = linkedResource(p, resource, y);
    rule(p, y);
    y += 13;
    y =
      text(
        p,
        "This practice guide uses your final submitted work and fixed scoring rules, with no AI service. Overall scores weight the nine measured skill averages equally. The feedback bands are prototype groupings, not comparisons with other students.",
        M,
        y,
        CW,
        { size: 8.7, leading: 11.5 },
      ) + 8;
    y =
      text(
        p,
        "The exercise rubrics have not been validated as a career or admissions assessment. Consider your interests, real projects and mentor feedback when exploring a design career.",
        M,
        y,
        CW,
        { size: 8.7, leading: 11.5 },
      ) + 9;
    text(
      p,
      `${report.assessmentVersion} / ${report.reportVersion} / ${PDF_LAYOUT_VERSION}`,
      M,
      y,
      CW,
      { size: 7.4, leading: 10 },
    );
  }
  return doc.save();
}

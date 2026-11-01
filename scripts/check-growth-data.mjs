import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const files = {
  tasks: new URL("../growth/TASKS.csv", import.meta.url),
  search: new URL("../growth/SEARCH_VISIBILITY_BASELINE.csv", import.meta.url),
  ai: new URL("../growth/AI_SEARCH_PROMPTS.csv", import.meta.url),
  baseline: new URL("../growth/COMPETITIVE_BASELINE.md", import.meta.url),
  progress: new URL("../growth/PROGRESS.md", import.meta.url),
};

function parseLine(line) {
  const fields = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index++) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index++;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      fields.push(value);
      value = "";
    } else {
      value += character;
    }
  }
  assert.equal(quoted, false, "CSV row has a closing quote");
  fields.push(value);
  return fields;
}

function parseCsv(text, expectedHeaders, label) {
  const rows = text.trimEnd().split(/\r?\n/).map(parseLine);
  assert.deepEqual(rows[0], expectedHeaders, `${label} headers`);
  rows.slice(1).forEach((row, index) =>
    assert.equal(
      row.length,
      expectedHeaders.length,
      `${label} row ${index + 2} column count`,
    ),
  );
  return rows.slice(1).map((row) =>
    Object.fromEntries(expectedHeaders.map((header, index) => [header, row[index]])),
  );
}

const taskHeaders = [
  "id",
  "phase",
  "title",
  "priority",
  "owner",
  "status",
  "depends_on",
  "due_date",
  "started_at",
  "completed_at",
  "evidence",
  "blocker",
  "next_action",
];
const searchHeaders = [
  "recorded_at",
  "provider",
  "query",
  "intent",
  "scope",
  "device",
  "country",
  "location_context",
  "personalisation",
  "dexam_local_pack",
  "dexam_first_8_web",
  "first_8_web_domains",
  "notes",
];
const aiHeaders = [
  "prompt_id",
  "prompt",
  "intent",
  "geo",
  "target_url",
  "provider",
  "mode",
  "sampled_at",
  "dexam_mentioned",
  "cited_or_linked_url",
  "mention_type",
  "repeat_cadence",
  "status",
  "notes",
];

const [taskText, searchText, aiText, baselineText, progressText] = await Promise.all(
  Object.values(files).map((url) => readFile(url, "utf8")),
);
const tasks = parseCsv(taskText, taskHeaders, "task ledger");
const search = parseCsv(searchText, searchHeaders, "search baseline");
const ai = parseCsv(aiText, aiHeaders, "AI prompt baseline");

assert.ok(tasks.some(({ id }) => id === "T05"), "T05 is tracked");
assert.ok(search.length >= 14, "At least fourteen dated search samples");
assert.equal(new Set(search.map(({ query }) => query)).size, search.length, "Search queries are unique");
for (const row of search) {
  assert.equal(row.provider, "Google Search", `Search provider: ${row.query}`);
  assert.ok(!Number.isNaN(Date.parse(row.recorded_at)), `Search timestamp: ${row.query}`);
  assert.ok(["yes", "no", "n/a"].includes(row.dexam_local_pack), `Local result state: ${row.query}`);
  assert.ok(["yes", "no"].includes(row.dexam_first_8_web), `Web result state: ${row.query}`);
  assert.ok(row.first_8_web_domains.includes("."), `Observed result domains: ${row.query}`);
}

assert.ok(ai.length >= 12 && ai.length <= 20, "AI prompt suite stays between 12 and 20 prompts");
assert.equal(new Set(ai.map(({ prompt_id }) => prompt_id)).size, ai.length, "AI prompt IDs are unique");
assert.equal(new Set(ai.map(({ prompt }) => prompt)).size, ai.length, "AI prompts are unique");
assert.ok(ai.filter(({ status }) => status === "sampled").length >= 5, "At least five AI prompts are sampled");
for (const row of ai) {
  assert.match(row.target_url, /^https:\/\/designexam\.com\//, `DEXAM target URL: ${row.prompt_id}`);
  assert.equal(row.repeat_cadence, "monthly", `Monthly cadence: ${row.prompt_id}`);
  assert.ok(["sampled", "pending"].includes(row.status), `AI prompt status: ${row.prompt_id}`);
  if (row.status === "sampled") {
    assert.equal(row.provider, "Google", `AI provider: ${row.prompt_id}`);
    assert.equal(row.mode, "AI Mode", `AI mode: ${row.prompt_id}`);
    assert.ok(!Number.isNaN(Date.parse(row.sampled_at)), `AI timestamp: ${row.prompt_id}`);
    assert.ok(["yes", "no"].includes(row.dexam_mentioned), `AI mention state: ${row.prompt_id}`);
    if (row.dexam_mentioned === "yes")
      assert.match(row.cited_or_linked_url, /^https:\/\//, `Mention evidence URL: ${row.prompt_id}`);
  }
}

const publicEvidence = [searchText, aiText, baselineText, progressText].join("\n");
assert.doesNotMatch(
  publicEvidence,
  /@gmail|snehal|Laxmi|campaignId|ocid|__u=|__c=|\b\d{10}\b/i,
  "Public growth evidence excludes account, precise device-location and campaign identifiers",
);
assert.match(baselineText, /dated observation, not a guaranteed rank/i, "Ranking limitation is explicit");
assert.match(baselineText, /local business entity/i, "AI mention type is qualified");

console.log(
  `PASS: ${search.length} search samples, ${ai.length} AI prompts (${ai.filter(({ status }) => status === "sampled").length} sampled), privacy checks and T05 ledger contract.`,
);

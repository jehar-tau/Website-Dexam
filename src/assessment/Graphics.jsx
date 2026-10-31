import { useRef, useState } from "react";

export const C = {
  ink: "#162824",
  orange: "#ef633d",
  green: "#386451",
  lime: "#dceba1",
  yellow: "#edc668",
  cream: "#f4f0e6",
  blue: "#648a9d",
  pink: "#d7a5b0",
};
export function Icon({ name, size = 20, ...props }) {
  const paths = {
    arrow: "M5 12h14m-6-6 6 6-6 6",
    back: "M19 12H5m6-6-6 6 6 6",
    rotate: "M4 9a8 8 0 1 1 1 10M4 3v6h6",
    undo: "M8 7H3v-5m0 5c8-7 18-1 16 8-1 4-7 6-11 3",
    close: "m6 6 12 12M6 18 18 6",
    grid: "M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z",
    check: "m5 12 5 5L20 7",
    lock: "M6 10h12v11H6zM8 10V7a4 4 0 0 1 8 0v3",
    download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
    plus: "M12 4v16M4 12h16",
    camera: "M3 7h5l2-3h4l2 3h5v13H3zM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    edit: "m5 16-1 5 5-1L21 8l-5-5zM13 6l5 5",
    share: "M12 16V3m-5 5 5-5 5 5M4 12v9h16v-9",
    image: "M3 3h18v18H3zm0 13 5-5 4 4 3-3 6 6M9 7h.01",
    heart: "M12 21S1 14 3 7c2-5 7-3 9 0 2-3 7-5 9 0 2 7-9 14-9 14",
    sun: "M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0",
    leaf: "M3 21C3 7 10 3 21 3c0 12-4 18-12 15M3 21 16 8",
    spark: "m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] || paths.spark} />
    </svg>
  );
}

export function Stage({ children, className = "", ...props }) {
  return (
    <svg className={`lab-svg ${className}`} viewBox="0 0 800 520" {...props}>
      {children}
    </svg>
  );
}
export function SvgDefs() {
  return (
    <defs>
      <filter id="softShadow" x="-80%" y="-80%" width="260%" height="260%">
        <feDropShadow
          dx="0"
          dy="8"
          stdDeviation="8"
          floodColor="#233e31"
          floodOpacity=".12"
        />
      </filter>
      <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r=".9" fill="#c8cdc3" />
      </pattern>
      <linearGradient id="ceramic" x1="0" x2="1">
        <stop stopColor="#fff" stopOpacity=".12" />
        <stop offset=".5" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity=".12" />
      </linearGradient>
    </defs>
  );
}

export function Handle({
  x,
  y,
  onMove,
  label = "Move handle",
  children,
  axis,
  className = "",
}) {
  const drag = useRef(null);
  const point = (e) => {
    const svg = e.currentTarget.ownerSVGElement;
    const p = svg.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    return p.matrixTransform(svg.getScreenCTM().inverse());
  };
  return (
    <g
      className={`lab-drag ${className}`}
      tabIndex="0"
      role="button"
      aria-label={label}
      onPointerDown={(e) => {
        e.preventDefault();
        const p = point(e);
        drag.current = { x: p.x - x, y: p.y - y };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        const p = point(e);
        onMove({
          x:
            axis === "y"
              ? x
              : Math.max(35, Math.min(765, p.x - drag.current.x)),
          y:
            axis === "x"
              ? y
              : Math.max(35, Math.min(480, p.y - drag.current.y)),
        });
      }}
      onPointerUp={() => {
        drag.current = null;
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
      onKeyDown={(e) => {
        const d = e.shiftKey ? 10 : 2;
        const arrows = {
          ArrowLeft: [-d, 0],
          ArrowRight: [d, 0],
          ArrowUp: [0, -d],
          ArrowDown: [0, d],
        };
        if (arrows[e.key]) {
          e.preventDefault();
          const [dx, dy] = arrows[e.key];
          onMove({
            x: axis === "y" ? x : Math.max(35, Math.min(765, x + dx)),
            y: axis === "x" ? y : Math.max(35, Math.min(480, y + dy)),
          });
        }
      }}
      transform={`translate(${x},${y})`}
    >
      {children || (
        <>
          <circle r="20" fill="transparent" />
          <circle r="8" fill="white" stroke={C.orange} strokeWidth="3" />
        </>
      )}
    </g>
  );
}

export function Range({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  suffix = "",
}) {
  return (
    <label className="lab-range">
      <span>
        {label}
        <b>
          {Math.round(value * 100) / 100}
          {suffix}
        </b>
      </span>
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
export function Controls({ children }) {
  return <div className="lab-controls">{children}</div>;
}
export function Tag({ x, y, children }) {
  return (
    <text x={x} y={y} className="lab-svg-tag" textAnchor="middle">
      {children}
    </text>
  );
}

export function ColourPicker({ color, onChange }) {
  const colors = [
    "#243b32",
    "#ef633d",
    "#e6b85e",
    "#dceba1",
    "#7399aa",
    "#c18b9e",
    "#744e43",
    "#f3e8cf",
    "#fffaf1",
    "#53644c",
    "#c3b29c",
    "#322a39",
  ];
  return (
    <div className="lab-swatches">
      {colors.map((c) => (
        <button
          key={c}
          aria-label={`Paint ${c}`}
          aria-pressed={color === c}
          className={color === c ? "selected" : ""}
          style={{ background: c }}
          onClick={() => onChange(c)}
        />
      ))}
      <label className="lab-custom-color" title="Choose any colour">
        <Icon name="plus" size={16} />
        <input
          type="color"
          aria-label="Custom paint colour"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export function StillLife({ colors, onPaint = () => {} }) {
  const region = (i) => ({
    fill: colors[i],
    onClick: () => onPaint(i),
    className: "lab-paint-region",
    role: "button",
    tabIndex: 0,
    "aria-label": `Paint ${["background", "vase", "bowl", "table", "fruit", "leaf"][i]}`,
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPaint(i);
      }
    },
  });
  return (
    <Stage>
      <SvgDefs />
      <rect x="100" y="35" width="600" height="450" rx="6" {...region(0)} />
      <circle cx="575" cy="145" r="65" fill="#fff" opacity=".18" />
      <path d="M100 350h600v135H100z" {...region(3)} />
      <ellipse
        cx="376"
        cy="380"
        rx="205"
        ry="35"
        fill="#162824"
        opacity=".08"
      />
      <path
        d="M245 195h100l-14 44c40 31 56 68 45 108-6 24-32 35-81 35s-74-11-80-35c-11-40 5-77 45-108z"
        {...region(1)}
      />
      <path
        d="M245 195h100l-14 44c40 31 56 68 45 108-6 24-32 35-81 35s-74-11-80-35c-11-40 5-77 45-108z"
        fill="url(#ceramic)"
        pointerEvents="none"
      />
      <ellipse cx="295" cy="195" rx="50" ry="9" fill="#162824" opacity=".17" />
      <path
        d="M295 197q-16-95 30-145"
        stroke="#425640"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M300 148q-88-33-64-83 66 11 64 83M306 113q79-8 75-54-64-4-75 54"
        {...region(5)}
      />
      <path d="M420 310h190q-9 83-95 83t-95-83" {...region(2)} />
      <ellipse cx="515" cy="310" rx="95" ry="14" fill="#fff" opacity=".15" />
      <circle cx="484" cy="285" r="31" {...region(4)} />
      <circle cx="541" cy="280" r="35" {...region(4)} />
      <path
        d="M541 250q-3-15 7-20"
        stroke="#425640"
        strokeWidth="3"
        fill="none"
      />
      <ellipse
        cx="484"
        cy="278"
        rx="10"
        ry="16"
        fill="#fff"
        opacity=".13"
        pointerEvents="none"
      />
    </Stage>
  );
}

export function City({ transform = "" }) {
  return (
    <g transform={transform}>
      <rect x="0" y="0" width="1000" height="650" fill="#d2e3df" />
      <circle cx="760" cy="100" r="70" fill="#eac774" />
      <path
        d="M0 350 250 230l140 100 160-160 210 180 240-100v400H0"
        fill="#a1bfb3"
      />
      <rect x="80" y="200" width="180" height="300" fill="#e9ded0" />
      <path d="m80 200 90-80 90 80" fill="#c08067" />
      <rect x="300" y="110" width="140" height="390" fill="#eea183" />
      <rect x="440" y="200" width="150" height="300" fill="#f1e7d5" />
      <rect x="640" y="175" width="180" height="325" fill="#6e948b" />
      {[100, 150, 200, 320, 370, 460, 510, 660, 710, 760].map((x, i) => (
        <g key={x}>
          {[240, 300, 360].map((y) => (
            <rect
              key={y}
              x={x}
              y={y}
              width="20"
              height="34"
              rx="9"
              fill={i > 6 ? "#d5e1c9" : "#496e65"}
            />
          ))}
        </g>
      ))}
      <path d="M0 465h1000v185H0" fill="#ddcfb9" />
      <path d="M0 525h1000" stroke="#ede4d4" strokeWidth="3" />
      <g transform="translate(360 480)">
        <circle
          cx="-42"
          cy="22"
          r="33"
          fill="none"
          stroke="#284c41"
          strokeWidth="5"
        />
        <circle
          cx="50"
          cy="22"
          r="33"
          fill="none"
          stroke="#284c41"
          strokeWidth="5"
        />
        <path
          d="m-42 22 35-50 20 50h-55l28-35 64 35-15-65"
          fill="none"
          stroke="#d7603d"
          strokeWidth="5"
        />
        <circle cx="12" cy="-85" r="13" fill="#b17b5a" />
        <path
          d="m10-65-30 28 31 15 4 44m-35-59 25 7 27-10"
          fill="none"
          stroke="#244b40"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M0-94q22-12 26 12"
          stroke="#edc668"
          strokeWidth="7"
          fill="none"
        />
      </g>
      <g transform="translate(840 420)">
        <path d="M0 100V-70" stroke="#49634e" strokeWidth="10" />
        <circle cy="-90" r="65" fill="#63876b" />
        <circle cx="35" cy="-60" r="45" fill="#759579" />
      </g>
    </g>
  );
}

export function Furniture({ type }) {
  if (type === 0)
    return (
      <g filter="url(#softShadow)">
        <rect x="-95" y="-48" width="190" height="96" rx="18" fill="#58796a" />
        <rect x="-75" y="-30" width="150" height="61" rx="10" fill="#88a48c" />
        <path
          d="M0-25v51M-70-20h140"
          stroke="#486d5b"
          strokeWidth="2"
          opacity=".4"
        />
        <rect x="-95" y="-27" width="20" height="70" rx="8" fill="#6d8c76" />
        <rect x="75" y="-27" width="20" height="70" rx="8" fill="#6d8c76" />
        <rect
          x="-63"
          y="-19"
          width="30"
          height="26"
          rx="6"
          fill="#e2c78e"
          transform="rotate(-10)"
        />
        <rect
          x="33"
          y="-19"
          width="30"
          height="26"
          rx="6"
          fill="#e2c78e"
          transform="rotate(10)"
        />
      </g>
    );
  if (type === 1)
    return (
      <g filter="url(#softShadow)">
        <ellipse rx="57" ry="40" fill="#bb875a" />
        <ellipse rx="51" ry="34" fill="#dab18a" />
        <path d="M-40 0h80" stroke="#b98b60" opacity=".5" />
        <rect
          x="-24"
          y="-16"
          width="23"
          height="29"
          rx="2"
          fill="#f4e8cf"
          transform="rotate(-12)"
        />
        <circle cx="22" cy="0" r="10" fill="#f6eee0" />
        <circle cx="22" cy="0" r="6" fill="#705443" />
      </g>
    );
  if (type === 2)
    return (
      <g filter="url(#softShadow)">
        <rect x="-90" y="-22" width="180" height="44" rx="5" fill="#b58a60" />
        <rect x="-80" y="-9" width="160" height="15" rx="3" fill="#182c27" />
        <rect x="-65" y="-7" width="130" height="6" rx="3" fill="#3d5650" />
        <path d="m-70 18 10 11m130-11-10 11" stroke="#493c31" strokeWidth="3" />
        <path
          d="M0 24v28m-20 0h40"
          stroke="#364d43"
          strokeWidth="2"
          opacity=".3"
        />
      </g>
    );
  if (type === 3)
    return (
      <g filter="url(#softShadow)">
        <circle r="32" fill="#e0ba68" />
        <circle r="27" fill="#f3d78c" />
        <circle r="7" fill="#fff1c4" />
        <path d="m0-28v56m-28-28h56" stroke="#cba65b" opacity=".3" />
      </g>
    );
  return (
    <g filter="url(#softShadow)">
      <circle r="29" fill="#c3a17c" />
      <path
        d="M0 10Q-56-35-20-43 10-50 0 10Q10-56 40-26 55 7 0 10Q-43 42-40 12-33-9 0 10Q48 50 38 10 29-14 0 10"
        fill="#527c57"
      />
      <path
        d="M0 10v-40m0 40 25-26m-25 26-22 4"
        stroke="#9bb683"
        strokeWidth="2"
        fill="none"
      />
    </g>
  );
}

export function Artwork({ miniature = false }) {
  return (
    <svg
      viewBox="0 0 500 560"
      className={miniature ? "lab-mini-art" : "lab-artwork"}
      aria-hidden="true"
    >
      <rect width="500" height="560" rx="8" fill="#e7ebcf" />
      <path d="M90 440V225a160 160 0 0 1 320 0v215" fill="#ebc16c" />
      <circle cx="250" cy="237" r="104" fill="#ef633d" />
      <circle cx="250" cy="237" r="56" fill="#e7ebcf" />
      <path d="M77 385h350v105H77z" fill="#25483a" />
      <path
        d="m110 490 70-105 70 105 70-105 70 105"
        fill="none"
        stroke="#a8bb8d"
        strokeWidth="3"
      />
      <path d="M55 65h80M55 78h45" stroke="#25483a" strokeWidth="3" />
      <text
        x="445"
        y="79"
        textAnchor="end"
        fill="#25483a"
        fontSize="13"
        fontFamily="sans-serif"
      >
        STUDIES IN FORM / 01
      </text>
    </svg>
  );
}

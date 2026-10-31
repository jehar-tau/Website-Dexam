import { useState } from "react";
import {
  C,
  Stage,
  SvgDefs,
  Handle,
  Tag,
  Range,
  Controls,
  ColourPicker,
  StillLife,
  City,
  Furniture,
  Icon,
} from "./Graphics.jsx";

function Swaps({ value, onChange, count, children, className = "" }) {
  const [selected, setSelected] = useState(null);
  const swap = (i) => {
    if (selected === null) setSelected(i);
    else {
      const order = [...value.order];
      [order[i], order[selected]] = [order[selected], order[i]];
      onChange({ ...value, order });
      setSelected(null);
    }
  };
  return (
    <div className={`lab-swap-row ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          aria-label={`Swap tile ${i + 1}`}
          aria-pressed={selected === i}
          className={selected === i ? "picked" : ""}
          draggable
          onDragStart={() => setSelected(i)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => swap(i)}
          onClick={() => swap(i)}
        >
          {children(value.order[i], i)}
        </button>
      ))}
    </div>
  );
}

function Balance({ value: v, onChange: set }) {
  const tilt = Math.max(
    -12,
    Math.min(12, ((220 - 400) * 1.4 + (v.x - 400)) / 26),
  );
  return (
    <Stage>
      <SvgDefs />
      <path d="M400 70v65" stroke={C.ink} strokeWidth="2" />
      <circle cx="400" cy="70" r="5" fill={C.ink} />
      <g transform={`rotate(${tilt} 400 145)`}>
        <path
          d="M150 145h550"
          stroke={C.ink}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="400" cy="145" r="8" fill={C.ink} />
        <path d="M220 145v100" stroke={C.ink} strokeWidth="2" />
        <circle cx="220" cy="303" r="58" fill={C.orange} />
        <path d={`M${v.x} 145v100`} stroke={C.ink} strokeWidth="2" />
        <circle cx={v.x} cy="294" r="49" fill={C.green} />
      </g>
      <Handle
        x={v.x}
        y={145}
        axis="x"
        label="Slide the green weight"
        onMove={(p) => set({ x: Math.max(425, Math.min(690, p.x)) })}
      >
        <circle r="27" fill="#fff" stroke={C.green} strokeWidth="2" />
        <path
          d="m-9 0 4-4m-4 4 4 4M9 0 5-4m4 4-4 4"
          stroke={C.green}
          strokeWidth="2"
          fill="none"
        />
      </Handle>
      <Tag x="400" y="457">
        DRAG THE HANDLE ALONG THE RAIL
      </Tag>
    </Stage>
  );
}

function Centre({ value: v, onChange: set }) {
  return (
    <Stage>
      <path d="M400 85 650 390H150Z" fill={C.lime} />
      <path
        d="M400 85 650 390H150Z"
        stroke={C.green}
        strokeWidth="1.5"
        fill="none"
      />
      <Handle x={v.x} y={v.y} label="Place the visual centre" onMove={set}>
        <circle r="21" fill={C.orange} />
        <circle r="5" fill="#fff" />
      </Handle>
    </Stage>
  );
}

function Spacing({ value: v, onChange: set }) {
  const widths = [50, 85, 35, 65, 50];
  return (
    <Stage>
      <path d="M120 315h560" stroke="#d2d6ca" />
      <SvgDefs />
      {v.xs.map((x, i) =>
        i === 0 || i === 4 ? (
          <g key={i} transform={`translate(${x} 260)`}>
            <rect
              x={-widths[i] / 2}
              y="-55"
              width={widths[i]}
              height="110"
              rx="4"
              fill={C.green}
            />
            <circle cy="100" r="4" fill={C.green} />
          </g>
        ) : (
          <Handle
            key={i}
            x={x}
            y={260}
            axis="x"
            label={`Move shape ${i + 1}`}
            onMove={(p) => set({ xs: v.xs.map((a, j) => (i === j ? p.x : a)) })}
          >
            <rect
              x={-widths[i] / 2}
              y="-55"
              width={widths[i]}
              height="110"
              rx="4"
              fill={[C.orange, C.yellow, C.blue][i - 1]}
              filter="url(#softShadow)"
            />
            <path
              d="m-8 77-5 4 5 4m16-8 5 4-5 4"
              stroke={C.ink}
              fill="none"
              strokeWidth="1.5"
            />
          </Handle>
        ),
      )}
      <Tag x="400" y="430">
        THE TWO ENDPOINTS ARE FIXED
      </Tag>
    </Stage>
  );
}

function Anomaly({ value: v, onChange: set }) {
  return (
    <Stage>
      {Array.from({ length: 36 }, (_, i) => (
        <g
          key={i}
          role="button"
          tabIndex="0"
          aria-label={`Tile ${i + 1}`}
          onClick={() => set({ selected: i })}
          onKeyDown={(e) => {
            if (e.key === "Enter") set({ selected: i });
          }}
          className="lab-tappable"
          transform={`translate(${225 + (i % 6) * 70} ${95 + Math.floor(i / 6) * 65})`}
        >
          <rect
            x="-28"
            y="-28"
            width="56"
            height="56"
            rx="12"
            fill={v.selected === i ? "#fce1d5" : "#edf0e4"}
            stroke={v.selected === i ? C.orange : "none"}
            strokeWidth="2"
          />
          <g transform={`rotate(${i === 17 ? 135 : 45})`}>
            <path
              d="M-12 10V-10h24"
              stroke={C.green}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
      ))}
    </Stage>
  );
}

function Rhythm({ value: v, onChange: set }) {
  const glyph = (n) => (
    <svg viewBox="0 0 100 120">
      <rect
        x="15"
        y={90 - [25, 45, 65, 85][n]}
        width="70"
        height={[25, 45, 65, 85][n]}
        rx="4"
        fill={[C.green, C.blue, C.orange, C.yellow][n]}
      />
    </svg>
  );
  return (
    <div className="lab-rhythm">
      <div className="lab-fixed-rhythm">
        {[0, 1, 2, 3].map((n) => (
          <span key={n}>{glyph(n)}</span>
        ))}
        <b>→</b>
      </div>
      <Swaps value={v} onChange={set} count={4}>
        {glyph}
      </Swaps>
      <p className="lab-gesture">
        Tap two tiles to swap · or drag a tile onto another
      </p>
    </div>
  );
}

function ColourMatch({ kind, value: v, onChange: set }) {
  const [dragging, setDragging] = useState(false);
  const hue = kind === "hue",
    target = hue ? "hsl(212 65% 56%)" : "hsl(18 67% 60%)";
  const current = hue
    ? `hsl(${v.hue} 65% 56%)`
    : `hsl(18 ${v.saturation}% 60%)`;
  const wheelMove = (e) => {
    const p = e.currentTarget.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    const q = p.matrixTransform(e.currentTarget.getScreenCTM().inverse());
    set({
      hue: Math.round(
        ((Math.atan2(q.x - 400, -(q.y - 230)) * 180) / Math.PI + 360) % 360,
      ),
    });
  };
  return (
    <>
      <Stage
        className={hue ? "lab-wheel-stage" : ""}
        onPointerDown={
          hue
            ? (e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                setDragging(true);
                wheelMove(e);
              }
            : undefined
        }
        onPointerMove={
          hue
            ? (e) => {
                if (dragging) wheelMove(e);
              }
            : undefined
        }
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        {hue ? (
          <>
            <foreignObject x="230" y="60" width="340" height="340">
              <div className="lab-hue-wheel" />
            </foreignObject>
            <circle cx="400" cy="230" r="122" fill="#faf9f3" />
            <path d="M400 122a108 108 0 0 0 0 216z" fill={target} />
            <path d="M400 122a108 108 0 0 1 0 216z" fill={current} />
            <g transform={`rotate(${v.hue} 400 230)`}>
              <circle
                cx="400"
                cy="75"
                r="13"
                fill="#fff"
                stroke={C.ink}
                strokeWidth="3"
              />
            </g>
          </>
        ) : (
          <>
            <rect
              x="175"
              y="100"
              width="220"
              height="250"
              rx="14"
              fill="#e6d4c7"
            />
            <rect
              x="405"
              y="100"
              width="220"
              height="250"
              rx="14"
              fill="#b6c3ae"
            />
            <circle cx="285" cy="225" r="72" fill={target} />
            <circle cx="515" cy="225" r="72" fill={current} />
          </>
        )}
        <Tag x="400" y="450">
          {hue
            ? "TUNE THE OUTER RING · MATCH THE TWO HALVES"
            : "IGNORE THE BACKGROUNDS · MATCH THE CENTRES"}
        </Tag>
      </Stage>
      <Controls>
        <Range
          label={hue ? "Hue" : "Intensity"}
          min={0}
          max={hue ? 359 : 100}
          value={hue ? v.hue : v.saturation}
          onChange={(x) => set(hue ? { hue: x } : { saturation: x })}
        />
      </Controls>
    </>
  );
}

function ValueOrder({ value: v, onChange: set }) {
  return (
    <div className="lab-order">
      <div className="lab-order-ends">
        <span>◐</span>
        <span>◯</span>
      </div>
      <Swaps count={6} value={v} onChange={set}>
        {(n) => <span style={{ background: `hsl(155 22% ${22 + n * 12}%)` }} />}
      </Swaps>
      <p className="lab-gesture">Tap two swatches to swap · or drag</p>
    </div>
  );
}

function Painting({ value: v, onChange: set }) {
  const [brush, setBrush] = useState(C.orange);
  return (
    <>
      <StillLife
        colors={v.colors}
        onPaint={(i) =>
          set({
            colors: v.colors.map((c, j) => (j === i ? brush : c)),
            painted: [...new Set([...v.painted, i])],
          })
        }
      />
      <ColourPicker color={brush} onChange={setBrush} />
      <div className="lab-gesture">
        {v.painted.length}/6 regions coloured · choose a swatch, tap an object
      </div>
    </>
  );
}

function Harmony({ value: v, onChange: set }) {
  return (
    <>
      <Stage>
        <foreignObject x="230" y="55" width="340" height="340">
          <div className="lab-hue-wheel" />
        </foreignObject>
        <circle cx="400" cy="225" r="135" fill="#faf9f3" />
        {[18, v.a, v.b].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 400 225)`}>
            <path d="M400 225V70" stroke={C.ink} strokeWidth="1" opacity=".2" />
            <circle
              cx="400"
              cy="70"
              r="14"
              fill={`hsl(${angle} 65% 55%)`}
              stroke="white"
              strokeWidth="4"
            />
          </g>
        ))}
        <circle cx="400" cy="225" r="7" fill={C.ink} />
        {[18, v.a, v.b].map((h, i) => (
          <circle
            key={i}
            cx={355 + i * 45}
            cy="440"
            r="18"
            fill={`hsl(${h} 65% 55%)`}
          />
        ))}
      </Stage>
      <Controls>
        <Range
          label="Colour II"
          min={0}
          max={359}
          value={v.a}
          onChange={(a) => set({ ...v, a })}
        />
        <Range
          label="Colour III"
          min={0}
          max={359}
          value={v.b}
          onChange={(b) => set({ ...v, b })}
        />
      </Controls>
    </>
  );
}

function Kerning({ value: v, onChange: set }) {
  return (
    <Stage>
      <path d="M150 335h500" stroke="#c7cec2" strokeDasharray="3 6" />
      {["W", "A", "V", "E"].map((letter, i) => (
        <Handle
          key={i}
          x={v.xs[i]}
          y={325}
          axis="x"
          label={`Position letter ${letter}`}
          onMove={(p) => {
            if (i > 0 && i < 3)
              set({ xs: v.xs.map((x, j) => (i === j ? p.x : x)) });
          }}
        >
          <text
            textAnchor="middle"
            fontSize="130"
            fill={i === 0 || i === 3 ? C.ink : C.green}
            fontFamily="Georgia,serif"
          >
            {letter}
          </text>
          {i > 0 && i < 3 && <circle cy="45" r="5" fill={C.orange} />}
        </Handle>
      ))}
      <Tag x="400" y="440">
        W AND E ARE FIXED
      </Tag>
    </Stage>
  );
}

function Alignment({ value: v, onChange: set }) {
  return (
    <Stage>
      <rect x="220" y="80" width="130" height="95" fill={C.orange} />
      <circle cx="285" cy="128" r="31" fill={C.yellow} />
      {v.xs.map((x, i) => (
        <Handle
          key={i}
          x={x}
          y={220 + i * 86}
          axis="x"
          label={`Align text block ${i + 1}`}
          onMove={(p) => set({ xs: v.xs.map((x, j) => (i === j ? p.x : x)) })}
        >
          {i === 0 ? (
            <text
              fontSize="35"
              fontWeight="600"
              fill={C.ink}
              fontFamily="Georgia"
            >
              Objects &amp; ideas.
            </text>
          ) : (
            <g fill={i === 1 ? "#799083" : "#aeb9af"}>
              {[0, 1, 2].map((n) => (
                <rect
                  key={n}
                  y={n * 14 - 15}
                  width={n === 2 ? 215 : 335}
                  height="6"
                  rx="3"
                />
              ))}
            </g>
          )}
          <circle cx="-22" cy="-8" r="4" fill={C.orange} />
        </Handle>
      ))}
    </Stage>
  );
}

function Reading({ value: v, onChange: set }) {
  return (
    <>
      <div className="lab-reading">
        <article
          style={{
            maxWidth: v.width,
            fontSize: v.size,
            lineHeight: `${v.leading}px`,
          }}
        >
          <span>FIELD NOTES / 004</span>
          <h3>The quiet art of noticing.</h3>
          <p>
            Good design begins with attention. A patch of afternoon light. The
            rhythm of windows along a street. The way a handle meets your hand.
          </p>
          <p>
            Look a little longer. The ordinary world is full of small decisions
            that shape how we feel and what we do next.
          </p>
        </article>
      </div>
      <Controls>
        <Range
          label="Line spacing"
          min={16}
          max={45}
          value={v.leading}
          onChange={(leading) => set({ ...v, leading })}
        />
        <Range
          label="Column width"
          min={270}
          max={650}
          value={v.width}
          onChange={(width) => set({ ...v, width })}
        />
        <Range
          label="Type size"
          min={12}
          max={28}
          value={v.size}
          onChange={(size) => set({ ...v, size })}
        />
      </Controls>
    </>
  );
}

function Poster({ value: v, onChange: set, capstone = false }) {
  const color = capstone ? `hsl(${v.hue} 75% 57%)` : C.orange;
  return (
    <>
      <Stage>
        <rect x="180" y="30" width="440" height="460" fill="#e9ecd7" />
        <text x="210" y="65" fontSize="9" fill={C.green} letterSpacing="3">
          DEXAM CULTURE CLUB
        </text>
        <circle cx="475" cy="270" r="120" fill={color} />
        <circle cx="475" cy="270" r="63" fill="#e9ecd7" />
        <path d="M210 385h380v75H210z" fill={C.green} />
        <text x="230" y="420" fontSize="12" fill="#fff">
          24 AUGUST
        </text>
        <text x="230" y="440" fontSize="10" fill="#dceba1">
          PUNE · OPEN STUDIO
        </text>
        <Handle
          x={v.x}
          y={v.y}
          label="Move poster headline"
          onMove={(p) => set({ ...v, x: p.x, y: p.y })}
        >
          <text
            fontFamily="Georgia,serif"
            fontWeight="bold"
            fontSize={68 * v.scale}
            fill={C.ink}
          >
            {capstone ? "FORM" : "OPEN"}
          </text>
          <text
            y={capstone ? v.leading : 60 * v.scale}
            fontFamily="Georgia,serif"
            fontSize={58 * v.scale}
            fontWeight="bold"
            fill={C.ink}
          >
            {capstone ? "& FEEL." : "STUDIO."}
          </text>
        </Handle>
      </Stage>
      <Controls>
        <Range
          label="Headline size"
          min={0.5}
          max={1.6}
          step={0.01}
          value={v.scale}
          onChange={(scale) => set({ ...v, scale })}
        />
        {capstone && (
          <>
            <Range
              label="Accent hue"
              min={0}
              max={359}
              value={v.hue}
              onChange={(hue) => set({ ...v, hue })}
            />
            <Range
              label="Line spacing"
              min={25}
              max={95}
              value={v.leading}
              onChange={(leading) => set({ ...v, leading })}
            />
          </>
        )}
      </Controls>
    </>
  );
}

function Crop({ value: v, onChange: set }) {
  return (
    <>
      <Stage>
        <defs>
          <clipPath id="frame">
            <rect x="160" y="65" width="480" height="390" rx="2" />
          </clipPath>
        </defs>
        <g clipPath="url(#frame)">
          <rect x="160" y="65" width="480" height="390" fill="#c4d4c4" />
          <g
            transform={`translate(${160 + v.x} ${v.y - 120}) scale(${v.zoom * 0.85})`}
          >
            <City />
          </g>
          <path
            d="M320 65v390M480 65v390M160 195h480M160 325h480"
            stroke="white"
            strokeWidth="1"
            opacity=".5"
          />
        </g>
        <path
          d="M150 90V55h35m430 0h35v35M150 430v35h35m430 0h35v-35"
          fill="none"
          stroke={C.ink}
          strokeWidth="3"
        />
      </Stage>
      <Controls>
        <Range
          label="Move image"
          min={-300}
          max={80}
          value={v.x}
          onChange={(x) => set({ ...v, x })}
        />
        <Range
          label="Zoom"
          min={0.85}
          max={1.8}
          step={0.01}
          value={v.zoom}
          onChange={(zoom) => set({ ...v, zoom })}
        />
      </Controls>
    </>
  );
}

function Tangram({ value: v, onChange: set }) {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <Stage>
        <path
          d="M400 140 540 280 400 420 260 280Z"
          fill="#e0e5d5"
          stroke="#bec7b3"
          strokeDasharray="6 7"
          strokeWidth="2"
        />
        {v.pieces.map((p, i) => (
          <Handle
            key={i}
            x={p.x}
            y={p.y}
            label={`Move puzzle piece ${i + 1}`}
            onMove={(pt) => {
              setSelected(i);
              set({
                pieces: v.pieces.map((a, j) =>
                  i === j ? { ...a, x: pt.x, y: pt.y } : a,
                ),
              });
            }}
          >
            <g
              transform={`rotate(${p.r})`}
              onPointerDown={() => setSelected(i)}
            >
              <path
                d="M-70-70H70L-70 70Z"
                fill={[C.orange, C.green, C.yellow, C.blue][i]}
                stroke={selected === i ? "#fff" : "none"}
                strokeWidth="3"
              />
              <circle r="4" fill="#fff" opacity=".7" />
            </g>
          </Handle>
        ))}
        <Tag x="400" y="475">
          SELECT A PIECE · ROTATE BELOW
        </Tag>
      </Stage>
      <Controls>
        <div className="lab-object-select">
          {v.pieces.map((_, i) => (
            <button
              key={i}
              className={selected === i ? "active" : ""}
              onClick={() => setSelected(i)}
            >
              Piece {i + 1}
            </button>
          ))}
        </div>
        <button
          className="lab-tool"
          onClick={() =>
            set({
              pieces: v.pieces.map((p, i) =>
                i === selected ? { ...p, r: (p.r + 45) % 360 } : p,
              ),
            })
          }
        >
          <Icon name="rotate" /> Rotate piece {selected + 1} · 45°
        </button>
      </Controls>
    </>
  );
}

function Rotation({ value: v, onChange: set }) {
  const solid = (
    <>
      <path d="M-65-80h65V-5h65v85H-65Z" />
      <path d="M-48-62h30v70h65v54h-95Z" fill="white" opacity=".15" />
    </>
  );
  return (
    <>
      <Stage>
        <g
          transform="translate(250 260) rotate(45)"
          fill="none"
          stroke="#9aaf9a"
          strokeDasharray="6 5"
          strokeWidth="2"
        >
          {solid}
        </g>
        <g transform={`translate(550 260) rotate(${v.r})`} fill={C.orange}>
          {solid}
        </g>
        <path d="M382 260h36m-8-7 8 7-8 7" stroke={C.green} fill="none" />
        <Tag x="250" y="450">
          REFERENCE
        </Tag>
        <Tag x="550" y="450">
          YOUR OBJECT
        </Tag>
      </Stage>
      <Controls>
        <Range
          label="Orientation"
          min={0}
          max={359}
          value={v.r}
          onChange={(r) => set({ r })}
          suffix="°"
        />
      </Controls>
    </>
  );
}

function Perspective({ value: v, onChange: set }) {
  return (
    <Stage>
      <rect x="100" y="65" width="600" height="390" fill="#e7ede1" />
      <path d="M100 155h600" stroke="#abbba5" strokeDasharray="5 5" />
      <path d="m100 455 300-300 300 300" fill="#eee1cb" />
      {[
        [100, 260],
        [100, 355],
        [700, 260],
        [700, 355],
        [220, 455],
        [580, 455],
      ].map(([x, y], i) => (
        <line
          key={i}
          x1={x}
          y1={y}
          x2={v.x}
          y2={v.y}
          stroke={i < 4 ? C.green : C.orange}
          strokeWidth="2"
        />
      ))}
      <path
        d="M100 260V65h120v390H100m600-195V65H580v390h120"
        fill={C.green}
        opacity=".09"
      />
      <Handle x={v.x} y={v.y} label="Move vanishing point" onMove={set} />
    </Stage>
  );
}

function Curve({ value: v, onChange: set }) {
  return (
    <Stage>
      <path
        d="M160 360C200 100 600 100 640 360"
        fill="none"
        stroke="#becbb3"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray="1 24"
      />
      <path
        d={`M160 360C${v.a.x} ${v.a.y} ${v.b.x} ${v.b.y} 640 360`}
        fill="none"
        stroke={C.orange}
        strokeWidth="6"
      />
      <path
        d={`M160 360 ${v.a.x} ${v.a.y}M640 360 ${v.b.x} ${v.b.y}`}
        stroke={C.green}
        strokeWidth="1.5"
      />
      {["a", "b"].map((key) => (
        <Handle
          key={key}
          x={v[key].x}
          y={v[key].y}
          label={`Move curve handle ${key}`}
          onMove={(p) => set({ ...v, [key]: p })}
        />
      ))}
      {[160, 640].map((x) => (
        <rect key={x} x={x - 5} y="355" width="10" height="10" fill={C.green} />
      ))}
      <Tag x="400" y="455">
        TWO HANDLES · ONE CONTINUOUS CURVE
      </Tag>
    </Stage>
  );
}

function Room({ value: v, onChange: set }) {
  const [selected, setSelected] = useState(0),
    names = ["Sofa", "Coffee table", "Television", "Floor lamp", "Plant"];
  const update = (change) =>
    set({
      items: v.items.map((p, i) => (i === selected ? { ...p, ...change } : p)),
    });
  return (
    <>
      <Stage>
        <SvgDefs />
        <defs>
          <pattern
            id="wood"
            width="74"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <rect width="74" height="24" fill="#eadfcf" />
            <path
              d="M0 0h74M0 24h74M45 0v24"
              stroke="#d7c9b5"
              strokeWidth=".6"
            />
          </pattern>
        </defs>
        <rect
          x="140"
          y="65"
          width="520"
          height="390"
          fill="url(#wood)"
          stroke="#607064"
          strokeWidth="12"
        />
        <rect x="330" y="65" width="170" height="7" fill="#a7d5d4" />
        <path d="M340 57v17m150-17v17" stroke="#faf8f0" strokeWidth="5" />
        <ellipse cx="410" cy="270" rx="164" ry="115" fill="#e8e9d7" />
        <ellipse
          cx="410"
          cy="270"
          rx="154"
          ry="105"
          fill="none"
          stroke="#b9c5aa"
          strokeWidth="2"
        />
        <path
          d="M140 342v108h108"
          stroke="#faf9f3"
          strokeWidth="16"
          fill="none"
        />
        <path
          d="M140 342a108 108 0 0 1 108 108M140 342v108"
          stroke="#8b9986"
          strokeWidth="1.5"
          fill="none"
        />
        {v.items.map((p, i) => (
          <Handle
            key={i}
            x={p.x}
            y={p.y}
            label={`Move ${names[i]}`}
            onMove={(pt) => {
              setSelected(i);
              set({
                items: v.items.map((a, j) =>
                  i === j
                    ? {
                        ...a,
                        x: Math.max(185, Math.min(610, pt.x)),
                        y: Math.max(120, Math.min(410, pt.y)),
                      }
                    : a,
                ),
              });
            }}
          >
            <g
              transform={`rotate(${p.r}) scale(${p.s})`}
              onPointerDown={() => setSelected(i)}
            >
              {selected === i && (
                <rect
                  x={i === 0 || i === 2 ? -107 : -65}
                  y={i === 0 ? -60 : -48}
                  width={i === 0 || i === 2 ? 214 : 130}
                  height={i === 0 ? 120 : 96}
                  fill="none"
                  stroke={C.orange}
                  strokeDasharray="4 4"
                  rx="10"
                />
              )}
              <Furniture type={i} />
            </g>
          </Handle>
        ))}
        <Tag x="400" y="497">
          KEEP THE DOOR CLEAR · POINT THE SEATING TOWARD THE TV
        </Tag>
      </Stage>
      <Controls>
        <div className="lab-object-select">
          {names.map((n, i) => (
            <button
              className={i === selected ? "active" : ""}
              key={n}
              onClick={() => setSelected(i)}
            >
              {n}
            </button>
          ))}
        </div>
        <button
          className="lab-tool"
          onClick={() => update({ r: (v.items[selected].r + 45) % 360 })}
        >
          <Icon name="rotate" /> Rotate 45°
        </button>
        <Range
          label={`${names[selected]} angle`}
          min={0}
          max={359}
          value={v.items[selected].r}
          onChange={(r) => update({ r })}
          suffix="°"
        />
        <Range
          label="Size"
          min={0.65}
          max={1.3}
          step={0.05}
          value={v.items[selected].s}
          onChange={(s) => update({ s })}
        />
      </Controls>
    </>
  );
}

function Touch({ value: v, onChange: set, compact }) {
  return (
    <>
      <Stage>
        <rect
          x={compact ? 265 : 210}
          y="70"
          width={compact ? 270 : 380}
          height="370"
          rx="36"
          fill="#fff"
          stroke="#d4dacc"
          strokeWidth="2"
        />
        <rect x="365" y="85" width="70" height="5" rx="2.5" fill="#d1d5c9" />
        <rect
          x={compact ? 290 : 240}
          y="125"
          width="140"
          height="9"
          rx="4"
          fill="#afbaa8"
        />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={compact ? 290 : 240}
            y={170 + i * 40}
            width={compact ? 220 : 320}
            height="26"
            rx="7"
            fill="#eef1e6"
          />
        ))}
        <path
          d={`M${compact ? 275 : 220} 345h${compact ? 250 : 360}`}
          stroke="#e1e5d9"
        />
        {["heart", "share", "plus", "camera"].map((name, i) => (
          <g key={name} transform={`translate(${400 + (i - 1.5) * v.gap} 385)`}>
            <rect
              x={-v.size / 2}
              y={-v.size / 2}
              width={v.size}
              height={v.size}
              rx="9"
              fill="#dceba1"
              fillOpacity=".4"
              stroke={C.green}
              strokeDasharray="3 3"
            />
            <foreignObject x="-11" y="-11" width="22" height="22">
              <Icon name={name} size={22} />
            </foreignObject>
          </g>
        ))}
      </Stage>
      <Controls>
        <Range
          label="Touch area"
          min={24}
          max={64}
          value={v.size}
          onChange={(size) => set({ ...v, size })}
          suffix="px"
        />
        <Range
          label="Distance"
          min={30}
          max={90}
          value={v.gap}
          onChange={(gap) => set({ ...v, gap })}
          suffix="px"
        />
      </Controls>
    </>
  );
}

function Chart({ value: v, onChange: set }) {
  const [mono, setMono] = useState(false);
  const dashes = ["none", "10 8", "2 8"],
    paths = [
      "M180 350Q260 180 340 270T620 150",
      "M180 300Q300 350 380 180T620 220",
      "M180 390Q300 200 420 320T620 110",
    ];
  return (
    <>
      <Stage>
        <path d="M160 90v330h500" fill="none" stroke="#bec9b3" />
        {[150, 230, 310, 390].map((y) => (
          <line key={y} x1="160" x2="660" y1={y} y2={y} stroke="#e1e6d7" />
        ))}
        {paths.map((d, i) => (
          <path
            key={d}
            d={d}
            stroke={mono ? "#435344" : v.colors[i]}
            strokeDasharray={dashes[v.styles[i]]}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        ))}
        <Tag x="400" y="470">
          THREE ROUTES · THREE DISTINCT IDENTITIES
        </Tag>
      </Stage>
      <Controls>
        <button
          className={`lab-tool ${mono ? "active" : ""}`}
          onClick={() => setMono(!mono)}
        >
          ◐ {mono ? "Restore colour" : "Preview greyscale"}
        </button>
        {v.styles.map((s, i) => (
          <label className="lab-route-style" key={i}>
            Route {i + 1}
            <input
              type="color"
              aria-label={`Route ${i + 1} colour`}
              value={v.colors[i]}
              onChange={(e) =>
                set({
                  ...v,
                  colors: v.colors.map((c, j) =>
                    i === j ? e.target.value : c,
                  ),
                })
              }
            />
            <select
              aria-label={`Route ${i + 1} line style`}
              value={s}
              onChange={(e) =>
                set({
                  ...v,
                  styles: v.styles.map((a, j) =>
                    i === j ? Number(e.target.value) : a,
                  ),
                })
              }
            >
              <option value="0">Solid</option>
              <option value="1">Dashed</option>
              <option value="2">Dotted</option>
            </select>
          </label>
        ))}
      </Controls>
    </>
  );
}

function Flow({ value: v, onChange: set }) {
  const icons = ["camera", "image", "edit", "share", "check"];
  return (
    <div className="lab-flow">
      <Swaps value={v} onChange={set} count={5}>
        {(n, i) => (
          <div className="lab-flow-phone">
            <span>{String(i + 1).padStart(2, "0")}</span>
            <Icon name={icons[n]} size={48} />
            <i />
            <b />
          </div>
        )}
      </Swaps>
      <p className="lab-gesture">
        Tap two screens to swap · think from the first action to the final
        result
      </p>
    </div>
  );
}

function Route({ value: v, onChange: set }) {
  return (
    <>
      <Stage
        onClick={(e) => {
          const p = e.currentTarget.createSVGPoint();
          p.x = e.clientX;
          p.y = e.clientY;
          const q = p.matrixTransform(e.currentTarget.getScreenCTM().inverse());
          set({
            points: [...v.points, { x: Math.round(q.x), y: Math.round(q.y) }],
          });
        }}
        className="lab-route-stage"
      >
        <SvgDefs />
        <rect x="100" y="65" width="600" height="390" fill="url(#dots)" />
        <rect x="280" y="105" width="70" height="235" rx="12" fill="#c5d0b8" />
        <rect x="450" y="240" width="70" height="210" rx="12" fill="#c5d0b8" />
        <path
          d={`M140 350 ${v.points.map((p) => `L${p.x} ${p.y}`).join(" ")}`}
          stroke={C.orange}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {v.points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="6" fill={C.orange} />
        ))}
        <circle cx="140" cy="350" r="17" fill={C.green} />
        <circle cx="660" cy="150" r="17" fill={C.orange} />
        <text x="140" y="355" textAnchor="middle" fontSize="13" fill="white">
          A
        </text>
        <text x="660" y="155" textAnchor="middle" fontSize="13" fill="white">
          B
        </text>
      </Stage>
      <Controls>
        <button
          className="lab-tool"
          onClick={() => set({ points: v.points.slice(0, -1) })}
        >
          <Icon name="undo" /> Remove last point
        </button>
      </Controls>
    </>
  );
}

function Group({ value: v, onChange: set }) {
  return (
    <Stage>
      <SvgDefs />
      {v.pieces.map((p, i) => (
        <Handle
          key={i}
          x={p.x}
          y={p.y}
          label={`Move ${["circle", "triangle", "square"][i % 3]} ${Math.floor(i / 3) + 1}`}
          onMove={(pt) =>
            set({ pieces: v.pieces.map((a, j) => (i === j ? pt : a)) })
          }
        >
          <circle r="34" fill="#fff" filter="url(#softShadow)" />
          {i % 3 === 0 ? (
            <circle r="14" fill={C.green} />
          ) : i % 3 === 1 ? (
            <path d="M0-17 17 14H-17Z" fill={C.orange} />
          ) : (
            <rect x="-14" y="-14" width="28" height="28" rx="4" fill={C.blue} />
          )}
        </Handle>
      ))}
    </Stage>
  );
}

function Responsive({ value: v, onChange: set }) {
  const [width, setWidth] = useState(330);
  return (
    <>
      <div className="lab-responsive">
        <div className="lab-size-switch">
          {[280, 330, 500].map((w) => (
            <button
              key={w}
              className={width === w ? "active" : ""}
              onClick={() => setWidth(w)}
            >
              {w === 280 ? "S" : w === 330 ? "M" : "L"}
            </button>
          ))}
        </div>
        <article style={{ width, padding: v.gap }}>
          <div className="lab-card-visual" style={{ height: v.image }}>
            <span />
            <i />
          </div>
          <small>FIELD NOTES / 05</small>
          <h3 style={{ fontSize: v.size }}>
            See the extraordinary
            <br />
            in the everyday.
          </h3>
          <p>A walk through shapes, shadows and the spaces between.</p>
          <button>
            Explore the collection <Icon name="arrow" size={16} />
          </button>
        </article>
      </div>
      <Controls>
        <Range
          label="Image height"
          min={70}
          max={250}
          value={v.image}
          onChange={(image) => set({ ...v, image })}
        />
        <Range
          label="Text size"
          min={14}
          max={38}
          value={v.size}
          onChange={(size) => set({ ...v, size })}
        />
        <Range
          label="Padding"
          min={8}
          max={45}
          value={v.gap}
          onChange={(gap) => set({ ...v, gap })}
        />
      </Controls>
    </>
  );
}

function Icons({ value: v, onChange: set }) {
  return (
    <>
      <Stage>
        {[0, 1, 2].map((n) => (
          <g key={n} transform={`translate(${220 + n * 180} 250)`}>
            <rect
              x="-60"
              y="-60"
              width="120"
              height="120"
              rx={n === 1 ? v.radius : 14}
              fill="none"
              stroke={C.green}
              strokeWidth={n === 1 ? v.stroke : 3}
            />
            {n === 0 ? (
              <path
                d="M-25 20 0-25 25 20Z"
                fill="none"
                stroke={C.green}
                strokeWidth="3"
              />
            ) : n === 1 ? (
              <>
                <circle
                  r="26"
                  fill="none"
                  stroke={C.green}
                  strokeWidth={v.stroke}
                />
                <circle r="3" fill={C.green} />
              </>
            ) : (
              <path
                d="M-27-22h54v44h-54zM-27 22 0-5l27 27"
                fill="none"
                stroke={C.green}
                strokeWidth="3"
              />
            )}
          </g>
        ))}
        <Tag x="400" y="415">
          ADJUST THE MIDDLE ICON
        </Tag>
      </Stage>
      <Controls>
        <Range
          label="Stroke"
          min={1}
          max={10}
          step={0.5}
          value={v.stroke}
          onChange={(stroke) => set({ ...v, stroke })}
        />
        <Range
          label="Corner radius"
          min={0}
          max={35}
          value={v.radius}
          onChange={(radius) => set({ ...v, radius })}
        />
      </Controls>
    </>
  );
}

function Tiles({ value: v, onChange: set }) {
  return (
    <Stage>
      <g transform="translate(240 75)">
        {v.rotations.map((r, i) => (
          <g
            key={i}
            transform={`translate(${(i % 2) * 160} ${Math.floor(i / 2) * 160})`}
            role="button"
            tabIndex="0"
            aria-label={`Rotate pattern tile ${i + 1}`}
            className="lab-tappable"
            onClick={() =>
              set({
                rotations: v.rotations.map((a, j) =>
                  i === j ? (a + 90) % 360 : a,
                ),
              })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter")
                set({
                  rotations: v.rotations.map((a, j) =>
                    i === j ? (a + 90) % 360 : a,
                  ),
                });
            }}
          >
            <rect
              width="160"
              height="160"
              fill="#e8edda"
              stroke="#fffef9"
              strokeWidth="3"
              rx="5"
            />
            <g transform={`rotate(${r} 80 80)`}>
              <path
                d="M80 0Q80 80 160 80"
                stroke={C.green}
                strokeWidth="9"
                fill="none"
              />
            </g>
            <circle cx="80" cy="80" r="4" fill={C.orange} />
          </g>
        ))}
      </g>
      <Tag x="400" y="460">
        TAP A TILE TO TURN IT · CONNECT ALL FOUR INTO A LOOP
      </Tag>
    </Stage>
  );
}

export default function Challenge({ task, value, onChange }) {
  const props = { value, onChange };
  const components = {
    balance: Balance,
    centre: Centre,
    spacing: Spacing,
    anomaly: Anomaly,
    sequence: Rhythm,
    order: ValueOrder,
    paint: Painting,
    harmony: Harmony,
    kerning: Kerning,
    alignment: Alignment,
    reading: Reading,
    poster: Poster,
    crop: Crop,
    tangram: Tangram,
    rotation: Rotation,
    perspective: Perspective,
    curve: Curve,
    room: Room,
    touch: Touch,
    chart: Chart,
    flow: Flow,
    route: Route,
    group: Group,
    responsive: Responsive,
    icons: Icons,
    tiles: Tiles,
    capstone: Poster,
    hue: ColourMatch,
    saturation: ColourMatch,
  };
  const Component = components[task.kind];
  return (
    <Component
      {...props}
      kind={task.kind}
      compact={task.compact}
      capstone={task.kind === "capstone"}
    />
  );
}

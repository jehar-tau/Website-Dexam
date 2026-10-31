import { useState } from "react";
import { C, Artwork, Icon } from "../assessment/Graphics.jsx";

export { Icon };

export function Art({
  kind = "poster",
  className = "",
  label,
  interactive = false,
}) {
  const [angle, setAngle] = useState(0);
  const ink = C.ink,
    green = C.green,
    orange = C.orange,
    yellow = C.yellow,
    lime = C.lime;
  let drawing;
  switch (kind) {
    case "poster":
      drawing = (
        <>
          <rect x="90" y="25" width="220" height="280" fill="#e8ecd3" />
          <text x="111" y="52" fontSize="7" letterSpacing="2" fill={green}>
            STUDIES IN SEEING
          </text>
          <path d="M120 257V153a80 80 0 0 1 160 0v104" fill={yellow} />
          <circle cx="200" cy="160" r="59" fill={orange} />
          <circle cx="200" cy="160" r="29" fill="#e8ecd3" />
          <path d="M110 242h180v43H110" fill={green} />
          <path
            d="m120 285 30-43 30 43 30-43 30 43 30-43"
            fill="none"
            stroke={lime}
          />
        </>
      );
      break;
    case "product":
      drawing = (
        <>
          <ellipse cx="205" cy="278" rx="112" ry="16" fill="#dbd8c8" />
          <path
            d="m143 230-15 58m109-58 15 58"
            stroke="#6b644d"
            strokeWidth="7"
          />
          <path d="M128 103q0-19 20-19h95q19 0 19 20v99H128" fill={green} />
          <path d="M145 104h99v85h-99" fill="#88a486" />
          <path
            d="M118 188h150q12 0 12 13v26q0 13-12 13H118q-12 0-12-13v-26q0-13 12-13"
            fill={orange}
          />
          <path d="M121 201h143" stroke="#f99573" strokeWidth="3" />
          <path d="M317 245V104" stroke={green} strokeWidth="4" />
          <path d="M280 108h73l-16-52h-41Z" fill={yellow} />
          <ellipse cx="316" cy="246" rx="22" ry="7" fill={green} />
          <path d="M40 62h38M40 73h21" stroke={green} strokeWidth="2" />
        </>
      );
      break;
    case "space":
      drawing = (
        <>
          <path d="m63 207 142-83 144 83-143 83Z" fill="#d8c7ab" />
          <path d="M63 207V94l142-82v112Z" fill="#c0d1ba" />
          <path d="M205 124V12l144 82v113Z" fill="#e5e6cc" />
          <path d="m98 144 56-32v-61l-56 32Z" fill="#f5f4e9" />
          <path d="m105 130 42-24V64l-42 25Z" fill="#98bbba" />
          <path d="m134 198 67-39 76 44-67 40Z" fill="#95ae8c" />
          <path d="m134 198 76 45v27l-76-44Z" fill={green} />
          <path d="m210 243 67-40v27l-67 40Z" fill="#527e5e" />
          <path d="m145 182 54-31 66 38-54 32Z" fill="#b3c49b" />
          <path d="m244 248 35-20 32 18-34 20Z" fill={orange} />
          <path
            d="m244 248 33 18v12l-33-18Zm33 18 34-20v12l-34 20Z"
            fill="#c34f31"
          />
          <path
            d="m311 154 0-41m-16 11 16-20 17 20-17 10Z"
            stroke={green}
            fill={yellow}
            strokeWidth="2"
          />
        </>
      );
      break;
    case "fashion":
      drawing = (
        <>
          <ellipse cx="200" cy="283" rx="100" ry="12" fill="#d6cdcb" />
          <path
            d="M174 65v-17q0-20 25-20t25 20"
            fill="none"
            stroke={green}
            strokeWidth="4"
          />
          <path
            d="m201 61-103 52h207Z"
            fill="none"
            stroke={green}
            strokeWidth="3"
          />
          <path
            d="m169 91 30 20 31-20 45 36-29 44-20-18 45 118H126l45-118-20 18-29-44Z"
            fill="#c78c9d"
          />
          <path
            d="m169 91 30 20 31-20M172 153q26 15 52 0"
            stroke="#8c6370"
            fill="none"
            strokeWidth="3"
          />
          <path
            d="m171 172-17 78m42-75-2 77m29-79 24 78"
            stroke="#e7b6bc"
            fill="none"
            strokeWidth="3"
          />
          <circle cx="70" cy="227" r="23" fill={orange} />
          <circle cx="79" cy="211" r="6" fill={yellow} />
          <path d="M300 68h48m-35 10h35" stroke={green} />
        </>
      );
      break;
    case "geometry":
      drawing = (
        <>
          <circle
            cx="200"
            cy="161"
            r="101"
            fill="none"
            stroke="#aac1a0"
            strokeWidth="1.5"
            strokeDasharray="5 7"
          />
          <g transform={`rotate(${angle} 200 161)`}>
            <path d="m200 48 113 113-113 113L87 161Z" fill={green} />
            <path d="M87 161h113V48Z" fill={yellow} />
            <path d="M200 161v113l113-113Z" fill={orange} />
            <path d="M200 48v226M87 161h226" stroke="#faf9f3" strokeWidth="2" />
          </g>
          <circle cx="200" cy="161" r="7" fill="#faf9f3" />
          <path d="M40 61h40m240 215h40" stroke={green} />
        </>
      );
      break;
    case "interface":
      drawing = (
        <>
          <g transform="rotate(-9 140 160)">
            <rect x="71" y="38" width="133" height="252" rx="21" fill={green} />
            <rect
              x="79"
              y="47"
              width="117"
              height="235"
              rx="15"
              fill="#f7f4e8"
            />
            <rect x="122" y="53" width="33" height="4" rx="2" fill="#a4b395" />
            <rect x="90" y="83" width="95" height="98" rx="9" fill={lime} />
            <circle cx="135" cy="129" r="30" fill={orange} />
            <path d="M95 199h76m-76 11h49" stroke={green} strokeWidth="4" />
            <rect x="92" y="237" width="91" height="21" rx="5" fill={green} />
          </g>
          <g transform="rotate(8 270 173)">
            <rect
              x="217"
              y="72"
              width="122"
              height="215"
              rx="18"
              fill="#fff"
              stroke="#c5ceb7"
            />
            <circle cx="278" cy="145" r="32" fill={yellow} />
            <path
              d="m264 144 11 11 22-26"
              stroke={green}
              fill="none"
              strokeWidth="3"
            />
            <path d="M239 205h77m-64 12h50" stroke="#adbb9b" strokeWidth="4" />
            <rect x="238" y="248" width="79" height="17" rx="4" fill={orange} />
          </g>
        </>
      );
      break;
    case "papers":
    case "practice":
      drawing = (
        <>
          <g transform="rotate(-10 160 160)">
            <rect
              x="87"
              y="38"
              width="183"
              height="248"
              rx="5"
              fill="#dce5c8"
            />
            <path
              d="M108 70h83m-83 13h49M108 225h125m-125 13h92"
              stroke="#9caf86"
              strokeWidth="3"
            />
          </g>
          <g transform="rotate(8 237 170)">
            <rect
              x="143"
              y="58"
              width="172"
              height="228"
              rx="5"
              fill="#fffef8"
              stroke="#e0e4d4"
            />
            <text
              x="166"
              y="89"
              fontSize="10"
              fill={green}
              fontFamily="sans-serif"
            >
              OBSERVE. THINK. MAKE.
            </text>
            <path
              d="M166 110h102m-102 12h68"
              stroke="#d0d8c3"
              strokeWidth="3"
            />
            <circle cx="232" cy="181" r="36" fill={orange} />
            <path
              d="m208 203 48-47m-24-11v73"
              stroke={yellow}
              strokeWidth="3"
            />
            <path
              d="M166 247h102m-102 12h76"
              stroke="#b8c6a5"
              strokeWidth="3"
            />
          </g>
          <g transform="rotate(25 98 233)">
            <path d="M94 130h13v128l-7 20-6-20Z" fill={yellow} />
            <path d="m96 268 4 10 4-10" fill={green} />
          </g>
        </>
      );
      break;
    case "curve":
      drawing = (
        <>
          <path
            d="M72 251C100 45 299 45 328 251"
            fill="none"
            stroke="#bbcbb0"
            strokeWidth="9"
            strokeDasharray="1 18"
            strokeLinecap="round"
          />
          <path
            d={`M72 251C${104 + angle} 45 299 45 328 251`}
            fill="none"
            stroke={orange}
            strokeWidth="5"
          />
          <path
            d="M72 251 104 45M328 251 299 45"
            stroke={green}
            strokeWidth="1.5"
          />
          {[
            [72, 251],
            [328, 251],
            [104, 45],
            [299, 45],
          ].map(([x, y]) => (
            <circle
              key={x}
              cx={x}
              cy={y}
              r="7"
              fill="#fffef8"
              stroke={green}
              strokeWidth="2"
            />
          ))}
        </>
      );
      break;
    case "sketch":
      drawing = (
        <>
          <circle cx="203" cy="174" r="91" fill="#e6e9d6" />
          <path d="M118 240 250 82l30 25-132 157-39 11Z" fill={yellow} />
          <path d="m118 240 30 24-39 11Z" fill="#d2bea0" />
          <path d="m109 275 15-3-12-11Z" fill={green} />
          <path
            d="m250 82 14-16q9-9 17-1l17 15q9 7 0 18l-18 19Z"
            fill={orange}
          />
          <path d="m145 234 118-142" stroke="#f7df99" strokeWidth="5" />
          <path
            d="M62 290q25-31 48-3t39-2q30-35 73-13"
            stroke={green}
            strokeWidth="2"
            fill="none"
          />
        </>
      );
      break;
    case "build":
      drawing = (
        <>
          <ellipse cx="206" cy="281" rx="128" ry="10" fill="#d8ddcb" />
          <rect x="87" y="204" width="95" height="73" rx="4" fill={green} />
          <rect x="184" y="133" width="94" height="144" rx="4" fill={orange} />
          <path d="M131 202v-54a48 48 0 0 1 96 0v54" fill={yellow} />
          <circle cx="274" cy="87" r="40" fill={lime} />
          <path d="M131 202h96" stroke="#e4b351" strokeWidth="2" />
          <path d="M302 202h39v75h-39Z" fill="#8aa4a0" />
        </>
      );
      break;
    case "target":
      drawing = (
        <>
          <circle cx="200" cy="170" r="110" fill="#e8e6d5" />
          <circle cx="200" cy="170" r="82" fill={green} />
          <circle cx="200" cy="170" r="55" fill={lime} />
          <circle cx="200" cy="170" r="28" fill={orange} />
          <path
            d="m202 168 104-107m-25 1h26v26"
            stroke={ink}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M65 274h270" stroke="#bcc7ad" />
        </>
      );
      break;
    case "portfolio":
      drawing = (
        <>
          <g transform="rotate(-9 140 171)">
            <rect x="60" y="65" width="161" height="219" fill="#dce5c7" />
            <circle cx="141" cy="148" r="51" fill={green} />
            <path d="M80 220h104m-104 13h71" stroke="#a1b68d" strokeWidth="3" />
          </g>
          <g transform="rotate(10 256 167)">
            <rect
              x="172"
              y="32"
              width="165"
              height="236"
              fill="#fffdf5"
              stroke="#dedfce"
            />
            <path d="M189 232V132a66 66 0 0 1 132 0v100" fill={yellow} />
            <circle cx="255" cy="142" r="41" fill={orange} />
            <path d="M190 232h131v18H190" fill={green} />
            <text x="192" y="57" fontSize="8" fill={green}>
              PROCESS / POSSIBILITY
            </text>
          </g>
        </>
      );
      break;
    case "map":
      drawing = (
        <>
          <path d="M40 70h320v210H40Z" fill="#e1e8d3" />
          <path
            d="M35 127h330m-330 82h330M128 66v218m120-218v218"
            stroke="#faf9f3"
            strokeWidth="12"
          />
          <path d="m40 279 320-209" stroke="#c3d4b1" strokeWidth="27" />
          <path
            d="M232 131q0-29-29-29t-29 29q0 29 29 65 29-36 29-65"
            fill={orange}
          />
          <circle cx="203" cy="130" r="10" fill="#fff9e6" />
          <text x="277" y="258" fontSize="9" letterSpacing="2" fill={green}>
            PUNE
          </text>
        </>
      );
      break;
    default:
      drawing = (
        <>
          <circle cx="157" cy="153" r="70" fill={orange} />
          <rect
            x="192"
            y="141"
            width="96"
            height="96"
            rx="5"
            fill={green}
            transform="rotate(12 240 190)"
          />
          <circle cx="277" cy="84" r="25" fill={yellow} />
        </>
      );
  }
  const graphic = (
    <svg
      viewBox="0 0 400 330"
      className={`dea-art ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {drawing}
    </svg>
  );
  return interactive ? (
    <button
      className="dea-art-interactive"
      onClick={() => setAngle((a) => (a + 45) % 360)}
      aria-label="Rotate the geometric illustration"
    >
      {graphic}
      <span>
        <Icon name="rotate" size={14} /> A little perspective shift
      </span>
    </button>
  ) : (
    graphic
  );
}

export function HeroCollage() {
  const [active, setActive] = useState("poster");
  const options = [
    ["poster", "See it."],
    ["product", "Shape it."],
    ["space", "Imagine it."],
  ];
  return (
    <div className="dea-hero-collage">
      <span className="dea-collage-side">A DIFFERENT WAY TO SEE THE WORLD</span>
      <div className="dea-collage-back">
        <Art kind="geometry" />
      </div>
      <div className="dea-collage-main">
        <Art kind={active} />
        <div className="dea-collage-caption">
          <b>
            {active === "poster"
              ? "Find your point of view."
              : active === "product"
                ? "Good things start with a question."
                : "Make room for possibility."}
          </b>
          <span>STUDIES IN DESIGN / DEXAM</span>
        </div>
      </div>
      <div className="dea-colour-strip">
        {["#244c3b", "#e7ebcf", "#edc668", "#ef633d"].map((c) => (
          <i key={c} style={{ background: c }} />
        ))}
      </div>
      <div className="dea-collage-note">
        <Icon name="spark" size={25} />
        <span>
          Less theory.
          <br />
          <b>More discovery.</b>
        </span>
      </div>
      <div className="dea-art-tabs">
        {options.map(([id, title]) => (
          <button
            key={id}
            aria-pressed={active === id}
            className={active === id ? "active" : ""}
            onClick={() => setActive(id)}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
}

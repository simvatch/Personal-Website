import { useState } from "react";
import "./Achievements.css";

const categories = {
  coding: [
    { flag: "at", label: "Midnight", date: "Jan 2026", title: "Midnight Hackathon, Vienna", description: "Took part in the Midnight hackathon in Vienna in January 2026." },
    { flag: "gb", label: "Campfire", date: "Feb 2026", title: "Campfire Hackathon, London", description: "Took part in the Campfire hackathon in London in February 2026." },
    { flag: "de", label: "Horizons", date: "Jul 2026", title: "Horizons Europa, Berlin", description: "Took part in Horizons Europa, a hackathon in Berlin, in July 2026." },
    { flag: "gb", label: "Sunbeam", date: "Aug 2026", title: "Sunbeam London Organiser", description: "Organised the Sunbeam London event for the Athena section of Hack Club in August 2026." },
    { flag: "gb", label: "Haven", date: "Nov 2026", title: "Haven Hackathon, London", description: "Came second place at the Haven hackathon in London in November 2026." },
  ],
  rowing: [
    { label: "P'borough", fullLabel: "Peterborough", date: "Jun 2024", title: "Peterborough Regatta", description: "Won my first rowing race at Peterborough Regatta in an octo, rowing at 4 seat." },
    { label: "Kingston", date: "Jul 2024", title: "Kingston Regatta", description: "Won at Kingston Regattaom an octo, rowing at 4 seat." },
    { label: "Star's Head", date: "Nov 2024", title: "Star Club Head of the River", description: "Won both the Women's J14 coxed quads, rowing at 2 seat, and the J14 octos, rowing at 3 seat, on the same day." },
    { label: "H'smith", fullLabel: "Hammersmith", date: "Apr 2026", title: "Hammersmith Amateur Regatta", description: "Won the J15 coxed fours at Hammersmith Amateur Regatta, rowing at 2 seat." },
    { label: "Poplar", date: "May 2026", title: "Poplar Regatta", description: "Finished second in the Women's J15 eights A final, rowing at 4 seat, behind St Paul's." },
    { label: "NSR", date: "May 2026", title: "National Schools' Regatta", description: "Reached the A final of the J15 1st eights. Ended up finishing fifth in A final, rowing at 4 seat." },
    { label: "Bulgaria", date: "Jun 2026", title: "Racing in Bulgaria", description: "Raced for Armeec over four days, winning the J16 single B final and finishing fourth in the J18 double and J18 coxless four finals." },
    { label: "Reading", date: "Oct 2026", title: "Reading Small Boats Head", description: "Won the Women's J16 coxless quads, rowing at 2 seat and making the calls." },
  ],
  other: [
    { pose: "dofe", label: "DofE", date: "Year 9", title: "Bronze Duke of Edinburgh's Award", description: "Completed the Bronze Duke of Edinburgh's Award in Year 9." },
    { pose: "poetry", label: "Poetry", date: "Year 10", title: "Poetry Festival Finalist", description: "Reached the final of the poetry festival in Year 10, entered through school." },
    { pose: "maths", label: "Maths", date: "Year 10", title: "Senior Mathematical Challenge", description: "Silver in the Senior Mathematical Challenge in Year 10." },
    { pose: "physics", label: "Physics", date: "Year 10", title: "Junior Physics Olympiad", description: "Gold in the Junior Physics Olympiad in Year 10." },
    { pose: "guitar", label: "Guitar", title: "Grade 3 Guitar", description: "Passed Grade 3 guitar." },
  ],
};

const tabs = [
  { id: "coding", name: "Coding" },
  { id: "rowing", name: "Rowing" },
  { id: "other", name: "Other" },
];

function Character({ mode, pose }) {
  return (
    <svg className={`ach-guy ${mode} pose-${pose}`} viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <linearGradient id="guyWaterFade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.82" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="guyWaterMask" maskUnits="userSpaceOnUse" x="0" y="0" width="220" height="170">
          <rect x="0" y="0" width="220" height="170" fill="url(#guyWaterFade)" />
        </mask>
        <clipPath id="guyBladeClip">
          <path d="M-13 -3.2 L 11 -6.5 Q 15.5 0 11 6.5 L -13 3.2 Z" />
        </clipPath>
      </defs>

      <g className="guy-water" mask="url(#guyWaterMask)">
        <path d="M-60 152 q 15 -7 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0" />
      </g>

      <g className="guy-desk-group">
        <rect className="guy-desk" x="20" y="134" width="180" height="5" rx="2.5" />
      </g>

      <g className="guy-writing-props">
        <path className="guy-paper" d="M112 129 L 168 129 L 176 134 L 104 134 Z" />
        <path className="guy-paper-line l1" d="M114 130.4 h 22" />
        <path className="guy-paper-line l2" d="M112 132.4 h 30" />
      </g>

      <g className="guy-coding-props">
        <rect className="guy-screen" x="138" y="84" width="58" height="40" rx="4" />
        <rect className="guy-code c1" x="145" y="92" width="26" height="3.5" rx="1.75" />
        <rect className="guy-code c2" x="151" y="100" width="34" height="3.5" rx="1.75" />
        <rect className="guy-code c3" x="151" y="108" width="20" height="3.5" rx="1.75" />
        <rect className="guy-code c4" x="145" y="116" width="30" height="3.5" rx="1.75" />
        <path className="guy-laptop-base" d="M128 128 h76 l-6 6 h-64 z" />
      </g>

      <g className="guy-board-props">
        <path className="guy-board-leg" d="M136 108 L 130 166 M 200 108 L 206 166" />
        <rect className="guy-board" x="124" y="36" width="88" height="72" rx="3" />
        <g className="guy-eq guy-eq-physics">
          <text className="e1" x="134" y="58">F = ma</text>
          <text className="e2" x="134" y="76">E = mc²</text>
          <text className="e3" x="134" y="94">v = u + at</text>
        </g>
        <g className="guy-eq guy-eq-maths">
          <text className="e1" x="134" y="58">a² + b² = c²</text>
          <text className="e2" x="134" y="76">y = mx + c</text>
          <text className="e3" x="134" y="94">∫ 2x dx = x²</text>
        </g>
      </g>

      <g className="guy-ground">
        <path className="ground-base" d="M-20 168 H 240" />
        <path className="ground-tufts" d="M-20 165 H 240" />
      </g>

      <g className="guy-chair">
        <path className="chair-frame" d="M66 92 V 166 M 112 136 V 166 M 66 136 H 112" />
        <rect className="chair-seat" x="62" y="131" width="54" height="6" rx="3" />
        <rect className="chair-back" x="61" y="90" width="8" height="46" rx="4" />
      </g>

      <g className="guy-seat">
        <g className="guy-body">
          <g transform="matrix(-1 0 0 1 176 0)">
            <g className="guy-legs-rowing">
              <path className="guy-leg" d="M82 133 L 64 121 L 46 127" />
              <ellipse className="guy-shoe" cx="43" cy="128" rx="6" ry="3.5" />
            </g>
          </g>

          <g className="guy-backpack">
            <rect className="pack-roll" x="38" y="40" width="44" height="15" rx="7.5" />
            <rect className="pack-main" x="34" y="52" width="46" height="88" rx="12" />
            <rect className="pack-pocket" x="26" y="94" width="16" height="34" rx="5" />
            <path className="pack-flap" d="M37 72 h 40" />
            <path className="pack-flap" d="M37 112 h 40" />
          </g>

          <g className="guy-legs-standing">
            <g className="guy-leg-a">
              <path className="guy-leg" d="M82 130 V 162" />
              <ellipse className="guy-shoe" cx="86" cy="164" rx="6" ry="3.5" />
            </g>
            <g className="guy-leg-b">
              <path className="guy-leg" d="M95 130 V 162" />
              <ellipse className="guy-shoe" cx="99" cy="164" rx="6" ry="3.5" />
            </g>
          </g>

          <g className="guy-legs-seated">
            <path className="guy-leg" d="M84 131 H 112 V 158" />
            <ellipse className="guy-shoe" cx="116" cy="160" rx="6" ry="3.5" />
          </g>

          <path className="guy-torso" d="M71 132 v-21 q0-15 17-15 q17 0 17 15 v21 z" />

          <path className="guy-pack-strap" d="M93 97 q 5 16 1 34" />

          <g className="guy-arms-coding">
            <path className="guy-arm" d="M100 104 q 18 10 32 20" />
            <circle className="guy-hand" cx="133" cy="125" r="4.5" />
          </g>

          <g transform="matrix(-1 0 0 1 176 0)">
            <g className="guy-arms-rowing">
              <path className="guy-arm" d="M76 104 q -12 4 -22 8" />
            </g>
          </g>

          <g className="guy-arms-writing">
            <g className="guy-writing-hand">
              <path className="guy-arm" d="M100 104 q 12 12 24 22" />
              <path className="guy-pen" d="M122 131 L 132 113" />
              <circle className="guy-hand" cx="125" cy="126" r="4.5" />
            </g>
          </g>

          <g className="guy-arms-board">
            <g className="guy-board-hand">
              <path className="guy-arm" d="M100 103 q 14 -6 25 -19" />
              <path className="guy-marker" d="M125 84 l 7 -7" />
              <circle className="guy-hand" cx="126" cy="83" r="4.5" />
            </g>
          </g>

          <g className="guy-arms-hiking">
            <path className="guy-arm" d="M98 103 q -4 13 4 25" />
            <circle className="guy-hand" cx="102" cy="129" r="4.5" />
          </g>

          <g className="guy-guitar">
            <line className="guitar-neck" x1="112" y1="121" x2="170" y2="93" />
            <rect className="guitar-head" x="166" y="86" width="12" height="9" rx="2" transform="rotate(-26 172 90.5)" />
            <ellipse className="guitar-body" cx="98" cy="126" rx="19" ry="15" />
            <ellipse className="guitar-body" cx="116" cy="119" rx="13" ry="11" />
            <circle className="guitar-hole" cx="107" cy="122" r="5" />
            <line className="guitar-strings" x1="96" y1="124.5" x2="169" y2="90.5" />
            <line className="guitar-strings" x1="97" y1="126.2" x2="169.6" y2="92.2" />
            <line className="guitar-strings" x1="98" y1="127.9" x2="170.4" y2="93.9" />
            <line className="guitar-strings" x1="99" y1="129.6" x2="171" y2="95.6" />
          </g>

          <g className="guy-arms-guitar">
            <path className="guy-arm" d="M97 101 q 28 -9 61 -6" />
            <circle className="guy-hand" cx="158" cy="95" r="4.5" />
            <g className="guy-strum">
              <g transform="translate(-9 0) rotate(-45 101 107)">
                <path className="guy-arm" d="M101 107 q -3 14 9 21" />
                <circle className="guy-hand" cx="110" cy="129" r="4.5" />
              </g>
            </g>
          </g>

          <g className="guy-head-wrap">
            <g className="guy-head">
              <path className="guy-hair guy-hair-back" d="M92 49 q -27 -1 -26 25 q 0 24 -8 44 q 16 8 30 -2 q -6 -18 -4 -36 z" />
              <circle className="guy-skin" cx="88" cy="70" r="20" />
              <path className="guy-hair" d="M66 80 C 61 54, 82 44, 97 49 C 106 52, 111 60, 108 67 C 101 60, 93 57, 87 59 C 83 66, 81 77, 79 94 C 72 92, 67 87, 66 80 Z" />
              <circle className="guy-eye" cx="97" cy="69" r="2.4" />
              <circle className="guy-nose" cx="107" cy="73" r="2.4" />
              <path className="guy-mouth" d="M97 81 q 4 3 8 0" />
            </g>
          </g>
        </g>
      </g>

      <g className="guy-rowing-props">
        <path className="guy-boat" d="M12 131 H 208 q -8 12 -36 15 H 48 q -28 -3 -36 -15 z" />
      </g>

      <g className="guy-seat">
        <g className="guy-body">
          <g transform="matrix(-1 0 0 1 176 0)">
          <g className="guy-oar">
            <line x1="52" y1="112" x2="136" y2="152" />
            <g className="guy-blade" transform="translate(136 152) rotate(26) scale(1.45)">
              <g clipPath="url(#guyBladeClip)">
                <rect className="blade-purple" x="-14" y="-8" width="30" height="16" />
                <path className="blade-black" d="M-14 2.2 L 16 -2.5 L 16 8 L -14 8 Z" />
                <path className="blade-stripe" d="M-14 2.2 L 16 -2.5" />
              </g>
            </g>
          </g>
          <g className="guy-arms-rowing">
            <circle className="guy-hand" cx="52" cy="112" r="4.5" />
          </g>
          </g>
        </g>
      </g>
      <g className="guy-notes">
        <text className="n1" x="150" y="78">♪</text>
        <text className="n2" x="170" y="70">♫</text>
        <text className="n3" x="188" y="80">♪</text>
      </g>
    </svg>
  );
}

function Flag({ code }) {
  return (
    <svg className="ach-flag" viewBox="0 0 30 20" aria-hidden="true">
      <defs>
        <filter id="flagRipple" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09 0.03" numOctaves="1" seed="3">
            <animate attributeName="baseFrequency" values="0.09 0.03;0.11 0.045;0.09 0.03" dur="3.2s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <linearGradient id="flagFolds" x1="0" x2="10" y1="0" y2="0" gradientUnits="userSpaceOnUse" spreadMethod="repeat">
          <stop offset="0" stopColor="#000" stopOpacity="0.22" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
          <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="10 0" dur="1.6s" repeatCount="indefinite" />
        </linearGradient>
        <clipPath id="flagClip">
          <rect width="30" height="20" rx="1.5" />
        </clipPath>
      </defs>
      <g filter="url(#flagRipple)">
        <g clipPath="url(#flagClip)">
          {code === "at" ? (
            <>
              <rect width="30" height="20" fill="#c8102e" />
              <rect y="6.67" width="30" height="6.67" fill="#ffffff" />
            </>
          ) : code === "bg" ? (
            <>
              <rect width="30" height="6.67" fill="#ffffff" />
              <rect y="6.67" width="30" height="6.67" fill="#00966e" />
              <rect y="13.33" width="30" height="6.67" fill="#d62612" />
            </>
          ) : code === "de" ? (
            <>
              <rect width="30" height="6.67" fill="#000000" />
              <rect y="6.67" width="30" height="6.67" fill="#dd0000" />
              <rect y="13.33" width="30" height="6.67" fill="#ffce00" />
            </>
          ) : (
            <>
              <rect width="30" height="20" fill="#012169" />
              <path d="M0 0L30 20M30 0L0 20" stroke="#ffffff" strokeWidth="4" />
              <path d="M0 0L30 20M30 0L0 20" stroke="#c8102e" strokeWidth="1.5" />
              <path d="M15 0V20M0 10H30" stroke="#ffffff" strokeWidth="6" />
              <path d="M15 0V20M0 10H30" stroke="#c8102e" strokeWidth="3.5" />
            </>
          )}
          <rect width="30" height="20" fill="url(#flagFolds)" />
        </g>
      </g>
    </svg>
  );
}

const TabIcon = ({ type }) =>
  type === "other" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path className="tab-icon-detail" d="M7 3.5h10v5.5a5 5 0 0 1-10 0z" />
      <path d="M7 5.5H4.5a3 3 0 0 0 3 4.5M17 5.5h2.5a3 3 0 0 1-3 4.5" />
      <path d="M12 14v4M8.5 21h7M9.5 18h5v3h-5z" />
    </svg>
  ) : type === "coding" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="11" rx="2" />
      <path d="M2 19h20" />
      <path className="tab-icon-detail" d="M10 9l-2 1.5 2 1.5M14 9l2 1.5-2 1.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <g className="tab-oars">
        <g transform="rotate(-40 12 8)">
          <path className="tab-oar-shaft" d="M12 1V14.2" />
          <path className="tab-icon-detail" d="M11 14.2l-1.6 2.6v4.6q0 1.6 1.6 1.6h2q1.6 0 1.6-1.6v-4.6l-1.6-2.6z" />
          <path d="M9.4 19.8h5.2" />
        </g>
        <g transform="rotate(40 12 8)">
          <path className="tab-oar-shaft" d="M12 1V14.2" />
          <path className="tab-icon-detail" d="M11 14.2l-1.6 2.6v4.6q0 1.6 1.6 1.6h2q1.6 0 1.6-1.6v-4.6l-1.6-2.6z" />
          <path d="M9.4 19.8h5.2" />
        </g>
      </g>
    </svg>
  );

export default function Achievements() {
  const [mode, setMode] = useState("coding");
  const [selected, setSelected] = useState(0);
  const items = categories[mode];

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
    setSelected(0);
  };

  const a = items[selected];

  return (
    <div className="achievements">
      <h2 className="title">Achievements</h2>

      <div
        className={`ach-tabs ${mode}`}
        role="tablist"
        aria-label="Achievement type"
        style={{ "--tab-index": tabs.findIndex((t) => t.id === mode) }}
      >
        <span className="ach-tab-pill" />
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={mode === t.id}
            className={`ach-tab${mode === t.id ? " active" : ""}`}
            onClick={() => switchMode(t.id)}
          >
            <TabIcon type={t.id} />
            <span>{t.name}</span>
          </button>
        ))}
      </div>

      <div className="ach-stage">
        <div className="ach-row" key={mode}>
          {items.map((item, i) => (
            <button
              key={item.title}
              className={`ach-node ${mode}${i === selected ? " active" : ""}`}
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => setSelected(i)}
              aria-pressed={i === selected}
            >
              <span className="ach-node-label">{item.label}</span>
              {item.date && <span className="ach-node-date">{item.date}</span>}
            </button>
          ))}
        </div>

        <div className="ach-centre">
          <div className="ach-figure">
            <div className={`ach-flag-wrap${a.flag ? " show" : ""}`} key={a.flag || "none"}>
              {a.flag && <Flag code={a.flag} />}
            </div>
            <Character mode={mode} pose={mode === "other" ? a.pose : mode} />
          </div>
          <div className="ach-details" key={`${mode}-${selected}`}>
            <span className="ach-meta">{a.date ? `${a.fullLabel || a.label} · ${a.date}` : a.fullLabel || a.label}</span>
            <h3 className="ach-title">{a.title}</h3>
            <p className="ach-description">{a.description}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

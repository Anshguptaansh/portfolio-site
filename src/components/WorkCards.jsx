import { useState } from 'react';
import { Play, Send } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const subjects = [
  { name: 'Maths',     emoji: 'π',   color: '#c9dcff' },
  { name: 'Physics',   emoji: '⚙️',  color: '#e5d7ff' },
  { name: 'Chemistry', emoji: '🧪',  color: '#ffe0b0' },
  { name: 'Biology',   emoji: '🦋',  color: '#c8e8c9' },
  { name: 'History',   emoji: '🏛️', color: '#dedede' },
  { name: 'Civics',    emoji: '⚖️',  color: '#dcd6cc' },
  { name: 'Geography', emoji: '📍',  color: '#ffe1e1' },
  { name: 'Economics', emoji: '💵',  color: '#d6ecd7' },
];

const VOICE_STATES = ['Idle', 'Listening', 'Thinking', 'Speaking'];

// ─── MockInterviewCard ───────────────────────────────────────────────────────

export const MockInterviewCard = () => {
  const [msg, setMsg] = useState('');

  return (
    <div className="work-card card-mint">
      <div className="mock-panel flex-1 flex overflow-hidden">
        {/* Left: video + chat */}
        <div className="w-[38%] border-r border-black/5 flex flex-col">
          {/* Video placeholder */}
          <div className="bg-[#f3f3f4] aspect-video flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
              <Play size={14} className="text-white ml-0.5" />
            </div>
          </div>

          {/* Chat */}
          <div className="p-3 flex-1 flex flex-col justify-end gap-2">
            <div className="chat-bubble self-end">Hey there!</div>
            <div className="chat-bubble self-end">Welcome to this mock interview</div>
            <div className="flex items-center gap-2 mt-2">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type something..."
                className="flex-1 bg-[#f4f4f5] rounded-full px-3 py-1.5 text-xs outline-none border border-black/5"
              />
              <button
                aria-label="Send"
                className="w-7 h-7 rounded-md bg-[#2f7d3a] text-white flex items-center justify-center"
              >
                <Send size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: code editor */}
        <div className="flex-1 flex flex-col">
          {/* Editor toolbar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-black/5">
            <div className="flex gap-3 text-[11px] text-[#6b6b73]">
              <span className="text-[#111114] font-medium">solution.js</span>
              <span>readme.md</span>
            </div>
            <div className="flex gap-2">
              <button className="text-[11px] px-2 py-1 rounded bg-white border border-black/10">
                Run Tests
              </button>
              <button className="text-[11px] px-2 py-1 rounded bg-[#2f7d3a] text-white">
                Submit
              </button>
            </div>
          </div>

          {/* Fake code body */}
          <div className="flex-1 p-3 overflow-hidden">
            <div className="flex gap-2">
              {/* Line numbers */}
              <div className="flex flex-col gap-[6px] text-[9px] text-[#c9c9cd] pt-1 pr-2 border-r border-black/5">
                {Array.from({ length: 22 }, (_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              {/* Code lines */}
              <div className="flex-1 flex flex-col gap-[6px] pt-1">
                {Array.from({ length: 22 }, (_, i) => (
                  <div
                    key={i}
                    className="code-line"
                    style={{ width: `${30 + (i * 37) % 60}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-title">HackerRank Mock Interviews</div>
    </div>
  );
};

// ─── PuStackCard ─────────────────────────────────────────────────────────────

export const PuStackCard = () => (
  <div className="work-card card-pink">
    <div className="phone-frame w-full max-w-[300px] mx-auto">
      {/* Status bar */}
      <div className="flex items-center justify-between text-[10px] text-[#1a1a20] px-1 mb-3">
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1 opacity-70">
          <span>●●●○</span>
        </div>
      </div>

      <div className="font-serif-title text-[18px] font-semibold text-[#1a1a20] px-1">
        Good afternoon!
      </div>

      <div className="text-[11px] text-[#6b6b73] px-1 mt-3 mb-2">Learn</div>

      <div className="grid grid-cols-4 gap-2">
        {subjects.map((s) => (
          <div key={s.name} className="subject-tile" style={{ background: s.color }}>
            <span className="emoji">{s.emoji}</span>
            <span className="font-medium">{s.name}</span>
          </div>
        ))}
      </div>

      <div className="text-[11px] text-[#6b6b73] px-1 mt-4 mb-2">Continue watching</div>

      <div className="grid grid-cols-2 gap-2">
        <div className="aspect-video rounded-md bg-[#f2f2f4]" />
        <div className="aspect-video rounded-md bg-[#f2f2f4]" />
      </div>
    </div>

    <div className="card-title">PuStack</div>
  </div>
);

// ─── VoiceModeCard ────────────────────────────────────────────────────────────

export const VoiceModeCard = () => {
  const [hovered, setHovered] = useState(false);
  const [stateIdx, setStateIdx] = useState(0);
  const state = VOICE_STATES[stateIdx];

  const cycle = () => setStateIdx((i) => (i + 1) % VOICE_STATES.length);

  return (
    <div
      className="work-card"
      style={{ background: '#eeeeee' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={cycle}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div
          className="orb"
          style={{
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            filter: state === 'Speaking' ? 'blur(0.3px)' : 'none',
          }}
        />
        <div className="text-[15px] font-medium text-[#1a1a20]">{state}</div>
        <div className="text-[12px] text-[#6b6b73]">Hover to demo • Click to change</div>
      </div>

      <div className="card-title">Voice Mode for Mock Interviews</div>
    </div>
  );
};

// ─── QuickApplyCard ───────────────────────────────────────────────────────────

export const QuickApplyCard = () => (
  <div className="work-card card-blue">
    <div className="purple-hero flex-1">
      <h3 className="font-serif-display text-[36px] font-bold leading-tight text-[#1a1a20]">
        Shall we begin?
      </h3>
      <p className="text-[13px] opacity-80 text-[#1a1a20]">
        We can start whenever you're ready :)
      </p>
      <button className="mt-2 px-4 py-2 rounded-md bg-white text-[#1a1a20] text-[13px] font-semibold shadow-sm hover:shadow-md transition-shadow w-fit">
        Let's do this!
      </button>
    </div>

    <div className="card-title">HackerRank QuickApply</div>
  </div>
);

// ─── StockVistaCard ───────────────────────────────────────

export const StockVistaCard = () => (
  <div className="work-card card-slate">
    <div className="proj-body">
      <div>
        <div className="proj-headline">StockVista</div>
        <p className="proj-desc" style={{ marginTop: 8 }}>
          Live market intelligence dashboard for BSE &amp; NSE listed stocks. Search any company
          for real-time prices, key fundamentals — P/E, ROE, EPS, debt-to-equity — shareholding
          patterns, and a curated peer comparison table. Built to feel like a Bloomberg terminal
          without the price tag.
        </p>
      </div>

      {/* Metrics mockup */}
      <div className="sv-metrics">
        {[
          { label: 'CMP',     value: '₹2,847', change: '+1.4%', up: true  },
          { label: 'Mkt Cap', value: '₹6.2T',  change: '+0.8%', up: true  },
          { label: 'P/E',     value: '24.3',   change: '−0.3%', up: false },
          { label: 'EPS',     value: '₹117',   change: '+3.1%', up: true  },
          { label: 'ROE',     value: '18.4%',  change: '+0.6%', up: true  },
          { label: '52W H',   value: '₹3,120', change: '−8.7%', up: false },
        ].map((m) => (
          <div key={m.label} className="sv-metric">
            <span className="sv-metric-label">{m.label}</span>
            <span className="sv-metric-value">{m.value}</span>
            <span className={m.up ? 'sv-change-up' : 'sv-change-down'}>{m.change}</span>
          </div>
        ))}
      </div>

      <div className="proj-stack">
        {['React', 'Vite', 'Tailwind CSS', 'Yahoo Finance API', 'Recharts', 'REST APIs'].map((t) => (
          <span key={t} className="proj-tag">{t}</span>
        ))}
      </div>

      <a
        href="https://stockvista-kappa.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="proj-link"
        style={{ marginBottom: 24 }}
      >
        View project ↗
      </a>
    </div>

    <div className="card-title">StockVista — Live Market Intelligence</div>
  </div>
);

// ─── CryptoVaultCard ──────────────────────────────────────

export const CryptoVaultCard = () => (
  <div className="work-card card-emerald">
    <div className="proj-body">
      <div>
        <div className="proj-headline">CryptoVault</div>
        <p className="proj-desc" style={{ marginTop: 8 }}>
          An interactive encryption lab that makes cryptography tangible. Encrypt messages using
          AES-256-GCM — the same algorithm used by banks and the military — generate private keys,
          and decrypt payloads by supplying the key, ciphertext, and IV. Every step is explained,
          so users learn how it works, not just that it works.
        </p>
      </div>

      {/* Cipher block mockup */}
      <div>
        <div className="cv-label">Encrypted output</div>
        <div className="cv-cipher-block">
          <div>KEY &nbsp;→ a3f8c1d9e2b74a0f6e5c3d8b1a9f2e4c7</div>
          <div>IV &nbsp;&nbsp;→ 9b2e4f1a8c3d7e6b</div>
          <div style={{ marginTop: 4 }}>
            CIPHER → U2FsdGVkX19mK3p4Qx8rNvL2oW7dTb1H<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pYeAcZsXwVuItRqPoNmLkJhGfEdCbA==
          </div>
        </div>
      </div>

      <div className="proj-stack">
        {['HTML / CSS / JS', 'Web Crypto API', 'AES-256-GCM', 'Firebase Hosting'].map((t) => (
          <span key={t} className="proj-tag">{t}</span>
        ))}
      </div>

      <a
        href="https://crypto-vault-lovat.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="proj-link"
        style={{ marginBottom: 24 }}
      >
        View project ↗
      </a>
    </div>

    <div className="card-title">CryptoVault — Interactive Encryption Lab</div>
  </div>
);

// ─── FinanceTrackerCard ───────────────────────────────────

const ledgerEntries = [
  { label: 'Salary deposit',   amount: '+₹85,000', credit: true  },
  { label: 'AWS subscription', amount: '−₹2,340',  credit: false },
  { label: 'Freelance payout', amount: '+₹18,500', credit: true  },
  { label: 'Zomato / Swiggy',  amount: '−₹1,870',  credit: false },
  { label: 'SIP — Nifty 50',   amount: '−₹10,000', credit: false },
];

export const FinanceTrackerCard = () => (
  <div className="work-card card-amber">
    <div className="proj-body">
      <div>
        <div className="proj-headline">Finance Tracker</div>
        <p className="proj-desc" style={{ marginTop: 8 }}>
          A personal financial ledger with secure authentication. Log income and expenses,
          categorise transactions, and track net balance over time — all behind a protected
          login so your data stays yours. Clean, minimal UI designed for daily use without
          the friction.
        </p>
      </div>

      {/* Ledger rows mockup */}
      <div style={{ marginTop: 4 }}>
        {ledgerEntries.map((e) => (
          <div key={e.label} className="ft-row">
            <span className="ft-label">{e.label}</span>
            <span className={e.credit ? 'ft-amount-credit' : 'ft-amount-debit'}>{e.amount}</span>
          </div>
        ))}
      </div>

      <div className="proj-stack">
        {['React', 'Tailwind CSS', 'Firebase Auth', 'Firestore', 'Vercel'].map((t) => (
          <span key={t} className="proj-tag">{t}</span>
        ))}
      </div>

      <a
        href="https://financial-ledger-zeta.vercel.app/login"
        target="_blank"
        rel="noopener noreferrer"
        className="proj-link"
        style={{ marginBottom: 24 }}
      >
        View project ↗
      </a>
    </div>

    <div className="card-title">Finance Tracker — Personal Ledger</div>
  </div>
);

// ─── CardioVisionCard ─────────────────────────────────────

const vitals = [
  { label: 'Heart Rate', value: '72 bpm', fill: 72,  color: '#ef4444' },
  { label: 'SpO₂',       value: '98%',    fill: 98,  color: '#3b82f6' },
  { label: 'BP Sys',     value: '118',    fill: 59,  color: '#8b5cf6' },
  { label: 'Resp Rate',  value: '16 /m',  fill: 53,  color: '#10b981' },
];

export const CardioVisionCard = () => (
  <div className="work-card card-rose">
    <div className="proj-body">
      <div>
        <div className="proj-headline">CardioVision</div>
        <p className="proj-desc" style={{ marginTop: 8 }}>
          A healthcare-focused web app for visualising cardiac and patient vitals in real time.
          Designed with clinical clarity in mind — clean dashboards for heart rate, SpO₂, blood
          pressure, and respiratory rate, with a UI that communicates urgency without overwhelming
          the user. Built and deployed on Firebase.
        </p>
      </div>

      {/* Vitals bar mockup */}
      <div className="cv2-vitals">
        {vitals.map((v) => (
          <div key={v.label} className="cv2-vital-row">
            <span className="cv2-vital-label">{v.label}</span>
            <div className="cv2-vital-bar-track">
              <div
                className="cv2-vital-bar-fill"
                style={{ width: `${v.fill}%`, background: v.color }}
              />
            </div>
            <span className="cv2-vital-val">{v.value}</span>
          </div>
        ))}
      </div>

      <div className="proj-stack" style={{ marginTop: 16 }}>
        {['React', 'Firebase', 'Firestore', 'Tailwind CSS', 'Recharts'].map((t) => (
          <span key={t} className="proj-tag">{t}</span>
        ))}
      </div>

      <a
        href="https://cardiovision-a366d.web.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="proj-link"
        style={{ marginBottom: 24 }}
      >
        View project ↗
      </a>
    </div>

    <div className="card-title">CardioVision — Healthcare Vitals Dashboard</div>
  </div>
);

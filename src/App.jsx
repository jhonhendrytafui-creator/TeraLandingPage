import React, { useState } from 'react';
import {
  MessageSquare,
  ChartColumn,
  ClipboardCheck,
  Gauge,
  ArrowUpRight,
  ArrowRight,
  Lock,
  Menu,
  X,
} from 'lucide-react';
import teraLogo from './assets/tera_logo.png';

const PRODUCTS = [
  {
    id: 'chat',
    title: 'Tera AI Chatbot',
    short: 'Chatbot',
    icon: MessageSquare,
    accent: '#60a5fa',
    punchline: ['Make it.', 'Mark it.', 'Understand it.'],
    subtitle: 'Conversational intelligence',
    description:
      'Tera turns one problem into a full practice set, a photo of an exam into a marking scheme, and a rough idea into a classroom activity. Print-ready, in your language, built around your curriculum.',
    actionText: 'Launch chat',
    actionUrl: 'https://cb.pahoacourse.online',
  },
  {
    id: 'poll',
    title: 'Tera AI Polling',
    short: 'Polling',
    icon: ChartColumn,
    accent: '#34d399',
    punchline: ['Ask it.', 'Gather it.', 'Analyze it.'],
    subtitle: 'Real-time sentiment',
    description:
      'Tera Polling transforms simple questions into real-time insights, raw data into clear consensus, and audience feedback into actionable intelligence. Instant, interactive, built for dynamic engagement.',
    actionText: 'Open dashboard',
    actionUrl: 'https://poll.pahoacourse.online',
  },
  {
    id: 'exam',
    title: 'Tera Exam',
    short: 'Exam',
    icon: ClipboardCheck,
    accent: '#fb7185',
    punchline: ['Test it.', 'Assess it.', 'Measure it.'],
    subtitle: 'AI-powered assessment',
    description:
      'Tera Exam is a digital examination platform powered by AI to perform auto assessment, providing a more objective and effective testing experience.',
    actionText: 'Open exam',
    actionUrl: 'https://exam.pahoacourse.online',
  },
  {
    id: 'eval',
    title: 'Tera Evaluation',
    short: 'Evaluation',
    icon: Gauge,
    accent: '#a78bfa',
    punchline: ['Benchmark LLMs.', 'Deploy with', 'confidence.'],
    subtitle: 'Enterprise benchmarking',
    description:
      'Comprehensive benchmarking and fine-grained evaluation tools for enterprise LLM deployments.',
    actionText: 'Coming soon',
    actionUrl: null,
    disabled: true,
  },
];

/* ---------- Lightweight product previews (pure CSS, no media) ---------- */

const ChatPreview = () => (
  <div className="flex flex-col gap-3 text-sm">
    <div className="self-end max-w-[80%] rounded-2xl rounded-br-md bg-white/10 px-4 py-2.5 text-white/90 fade-up" style={{ animationDelay: '0.1s' }}>
      Make 5 practice questions on quadratic equations
    </div>
    <div className="self-start max-w-[88%] rounded-2xl rounded-bl-md border border-white/10 bg-[var(--accent)]/15 px-4 py-3 fade-up" style={{ animationDelay: '0.5s' }}>
      <p className="mb-2 font-medium text-white">Practice set · Grade 9</p>
      <ol className="list-decimal space-y-1 pl-4 text-white/70">
        <li>Solve x² − 5x + 6 = 0</li>
        <li>Factor 2x² + 7x + 3</li>
        <li>Find the vertex of y = x² − 4x + 1</li>
      </ol>
    </div>
    <div className="self-start flex gap-1.5 rounded-full bg-white/5 px-4 py-3 fade-up" style={{ animationDelay: '0.9s' }}>
      <span className="typing-dot" />
      <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
      <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
    </div>
  </div>
);

const PollPreview = () => {
  const options = [
    { label: 'Very clear', value: 62 },
    { label: 'Somewhat clear', value: 27 },
    { label: 'Need a recap', value: 11 },
  ];
  return (
    <div className="text-sm">
      <div className="mb-1 flex items-center justify-between">
        <p className="font-medium text-white">How clear was today’s lesson?</p>
        <span className="flex items-center gap-1.5 text-xs text-white/50">
          <span className="live-dot" /> Live
        </span>
      </div>
      <p className="mb-5 text-xs text-white/40">128 responses</p>
      <div className="space-y-4">
        {options.map((o, i) => (
          <div key={o.label}>
            <div className="mb-1.5 flex justify-between text-white/70">
              <span>{o.label}</span>
              <span className="tabular-nums text-white">{o.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="grow-bar h-full rounded-full bg-[var(--accent)]"
                style={{ width: `${o.value}%`, animationDelay: `${0.2 + i * 0.15}s`, opacity: 1 - i * 0.25 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExamPreview = () => {
  const rows = [
    { q: 'Q1 · Multiple choice', score: '4 / 4', ok: true },
    { q: 'Q2 · Short answer', score: '3 / 4', ok: true },
    { q: 'Q3 · Essay', score: '7 / 10', ok: true },
    { q: 'Q4 · Working shown', score: 'Reviewing…', ok: false },
  ];
  return (
    <div className="text-sm">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="font-medium text-white">Midterm · Physics</p>
          <p className="text-xs text-white/40">Auto-assessed by Tera</p>
        </div>
        <p className="text-3xl font-semibold tabular-nums text-white">
          82<span className="text-base text-white/40">%</span>
        </p>
      </div>
      <ul className="divide-y divide-white/5">
        {rows.map((r, i) => (
          <li key={r.q} className="flex items-center justify-between py-2.5 fade-up" style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
            <span className="flex items-center gap-2.5 text-white/70">
              <span className={`h-1.5 w-1.5 rounded-full ${r.ok ? 'bg-[var(--accent)]' : 'bg-white/30 animate-pulse'}`} />
              {r.q}
            </span>
            <span className={`tabular-nums ${r.ok ? 'text-white' : 'text-white/40'}`}>{r.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const EvalPreview = () => {
  const bars = [72, 88, 64, 91, 79, 85];
  return (
    <div className="text-sm">
      <p className="font-medium text-white">Model benchmark</p>
      <p className="mb-6 text-xs text-white/40">Accuracy across 6 task suites</p>
      <div className="flex h-36 items-end gap-3">
        {bars.map((b, i) => (
          <div key={i} className="flex-1 rounded-t-md bg-[var(--accent)]/25">
            <div className="rise-bar w-full rounded-t-md bg-[var(--accent)]/70" style={{ height: `${b * 1.44}px`, animationDelay: `${i * 0.08}s` }} />
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs text-white/50">
        <Lock size={12} /> In private development
      </div>
    </div>
  );
};

const PREVIEWS = { chat: ChatPreview, poll: PollPreview, exam: ExamPreview, eval: EvalPreview };

/* ---------------------------------- App ---------------------------------- */

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const active = PRODUCTS[activeIndex];
  const Preview = PREVIEWS[active.id];
  const nextIndex = (() => {
    for (let step = 1; step <= PRODUCTS.length; step++) {
      const i = (activeIndex + step) % PRODUCTS.length;
      if (!PRODUCTS[i].disabled) return i;
    }
    return activeIndex;
  })();

  const select = (i) => {
    setActiveIndex(i);
    setMenuOpen(false);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-[#07070c] text-white"
      style={{ '--accent': active.accent }}
    >
      {/* Ambient background: gradient glows + grid (cheap, GPU-friendly) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="glow glow-a" />
        <div className="glow glow-b" />
        <div className="grid-bg absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07070c]" />
      </div>

      {/* Header */}
      <header className="relative z-40 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <a href="/" className="flex items-center gap-3">
          <img src={teraLogo} alt="" className="h-8 w-8 object-contain" />
          <span className="font-display text-lg font-semibold tracking-[0.18em]">TERA AI</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md lg:flex">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => select(i)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                i === activeIndex ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              {p.title}
            </button>
          ))}
        </nav>

        <a
          href={PRODUCTS[0].actionUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white lg:flex"
        >
          Try Tera <ArrowUpRight size={16} />
        </a>

        <button
          className="rounded-full border border-white/10 p-2 lg:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-[#07070c]/95 px-5 pt-24 backdrop-blur-lg lg:hidden">
          <ul className="space-y-2">
            {PRODUCTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <li key={p.id}>
                  <button
                    onClick={() => select(i)}
                    className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-colors ${
                      i === activeIndex ? 'border-white/20 bg-white/5' : 'border-transparent'
                    }`}
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5" style={{ color: p.accent }}>
                      <Icon size={20} />
                    </span>
                    <span className="flex-1 text-lg">{p.title}</span>
                    {p.disabled && <span className="text-xs text-white/40">Soon</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Hero */}
      <main className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-10 pt-8 md:px-8 lg:min-h-[calc(100vh-180px)] lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-0">
        <section key={active.id} className="fade-up">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            {active.subtitle}
          </p>

          <h1 className="font-display mb-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
            {active.punchline.map((line, i) => (
              <span key={i} className={`block ${i === active.punchline.length - 1 ? 'text-[var(--accent)]' : ''}`}>
                {line}
              </span>
            ))}
          </h1>

          <p className="mb-10 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">{active.description}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {active.disabled ? (
              <span className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-white/5 px-7 py-3.5 text-sm font-medium text-white/40">
                <Lock size={16} /> {active.actionText}
              </span>
            ) : (
              <a
                href={active.actionUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
              >
                {active.actionText}
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
            {nextIndex !== activeIndex && (
              <button
                onClick={() => select(nextIndex)}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm text-white/80 transition-colors hover:border-white/30 hover:text-white"
              >
                Next: {PRODUCTS[nextIndex].short}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            )}
          </div>
        </section>

        {/* Preview card */}
        <section className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-[var(--accent)] opacity-10 blur-3xl transition-colors duration-700" />
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <span className="text-xs text-white/40">{active.title}</span>
            </div>
            <div key={active.id} className="min-h-[240px]">
              <Preview />
            </div>
          </div>
        </section>
      </main>

      {/* Product selector */}
      <footer className="relative z-10 mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => {
            const Icon = p.icon;
            const isActive = i === activeIndex;
            return (
              <button
                key={p.id}
                onClick={() => select(i)}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all sm:p-5 ${
                  isActive ? 'border-white/20 bg-white/[0.06]' : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5" style={{ color: p.accent }}>
                    <Icon size={18} />
                  </span>
                  <span className="text-xs tabular-nums text-white/30">0{i + 1}</span>
                </div>
                <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/70'}`}>{p.title}</p>
                <p className="mt-0.5 text-xs text-white/40">{p.disabled ? 'Coming soon' : p.subtitle}</p>
                <span
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
                  style={{ width: isActive ? '100%' : '0%', background: p.accent }}
                />
              </button>
            );
          })}
        </div>
        <p className="mt-8 text-center text-xs text-white/30">© {new Date().getFullYear()} Tera AI</p>
      </footer>
    </div>
  );
};

export default App;

import React, { useState, useEffect, useRef } from 'react';
import teraLogo from './assets/tera_logo.png';

const CARDS_DATA = [
  {
    id: 0,
    title: "Tera AI Chatbot",
    punchline: "MAKE IT.\nMARK IT.\nUNDERSTAND IT.",
    subtitle: "CONVERSATIONAL INTELLIGENCE",
    description: "Tera turns one problem into a full practice set, a photo of an exam into a marking scheme, and a rough idea into a classroom activity. Print-ready, in your language, built around your curriculum.",
    btnClass: "bg-white text-black hover:bg-gray-200",
    actionText: "LAUNCH CHAT",
    actionUrl: "https://cb.pahoacourse.online",
    videoUrl: "/cb.mp4",
    poster: "bg-blue-900",
    disabled: false
  },
  {
    id: 1,
    title: "Tera AI Polling",
    punchline: "ASK IT.\nGATHER IT.\nANALYZE IT.",
    subtitle: "REAL-TIME SENTIMENT",
    description: "Tera Polling transforms simple questions into real-time insights, raw data into clear consensus, and audience feedback into actionable intelligence. Instant, interactive, built for dynamic engagement.",
    btnClass: "bg-white text-black hover:bg-gray-200",
    actionText: "OPEN DASHBOARD",
    actionUrl: "https://poll.pahoacourse.online",
    videoUrl: "/poll.mp4",
    poster: "bg-emerald-900",
    disabled: false
  },
  {
    id: 2,
    title: "Tera Exam",
    punchline: "INTELLIGENT PROCTORING.\nSECURE TESTING.",
    subtitle: "NEXT-GEN ASSESSMENT",
    description: "Next-generation computer vision tools for real-time environment mapping and object tracking.",
    btnClass: "bg-white/10 text-slate-400 cursor-not-allowed",
    actionText: "PENDING",
    actionUrl: null,
    videoUrl: null,
    poster: "bg-rose-900",
    disabled: true
  },
  {
    id: 3,
    title: "Tera Evaluation",
    punchline: "BENCHMARK LLMS.\nDEPLOY WITH CONFIDENCE.",
    subtitle: "ENTERPRISE BENCHMARKING",
    description: "Comprehensive benchmarking and fine-grained evaluation tools for enterprise LLM deployments.",
    btnClass: "bg-white/10 text-slate-400 cursor-not-allowed",
    actionText: "PENDING",
    actionUrl: null,
    videoUrl: null,
    poster: "bg-violet-900",
    disabled: true
  }
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const videoRefs = useRef({});

  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const vid = videoRefs.current[key];
      if (vid) {
        if (parseInt(key) === currentIndex) {
          vid.play().catch(() => {});
          vid.style.opacity = 1;
          vid.style.zIndex = 10;
        } else {
          vid.style.opacity = 0;
          vid.style.zIndex = 0;
          setTimeout(() => {
            if (parseInt(key) !== currentIndex) {
              vid.pause();
            }
          }, 1000);
        }
      }
    });
  }, [currentIndex]);

  const activeCard = CARDS_DATA[currentIndex];

  return (
    <div className="w-full h-screen overflow-hidden relative text-white bg-black font-sans">
      
      {/* Background Videos/Images */}
      <div className="absolute inset-0 z-0">
        {CARDS_DATA.map((card, index) => (
          card.videoUrl ? (
            <video
              key={card.id}
              ref={(el) => (videoRefs.current[index] = el)}
              src={card.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                currentIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div 
              key={card.id}
              className={`absolute inset-0 w-full h-full ${card.poster} transition-opacity duration-1000 ease-in-out ${
                currentIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )
        ))}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-20"></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 w-full z-50 px-6 md:px-8 py-5 flex justify-between lg:justify-center items-center bg-black/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
        <div className="lg:absolute lg:left-8 flex items-center gap-3">
          <img src={teraLogo} alt="Tera Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-semibold tracking-[0.2em] uppercase hidden sm:block">TERA AI</span>
        </div>
        <nav className="hidden lg:flex gap-8 text-sm font-medium tracking-wide">
          {CARDS_DATA.map((card, index) => (
            <button 
              key={card.id}
              onClick={() => {
                if (!card.disabled) {
                  setCurrentIndex(index);
                }
              }}
              disabled={card.disabled}
              className={`transition-colors flex items-center gap-2 relative ${
                currentIndex === index 
                  ? 'text-white' 
                  : card.disabled 
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-gray-400 hover:text-white'
              }`}
            >
              {card.title}
              {card.disabled && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-500 tracking-wider">PENDING</span>}
              {currentIndex === index && (
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute inset-0 z-40 bg-black/95 pt-24 px-6 lg:hidden flex flex-col gap-6">
          {CARDS_DATA.map((card, index) => (
            <button 
              key={card.id}
              onClick={() => {
                if (!card.disabled) {
                  setCurrentIndex(index);
                  setIsMobileMenuOpen(false);
                }
              }}
              disabled={card.disabled}
              className={`text-left text-xl font-medium tracking-wide transition-colors flex flex-col gap-1 ${
                currentIndex === index 
                  ? 'text-white' 
                  : card.disabled 
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {card.title}
                {card.disabled && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-500 tracking-wider">PENDING</span>}
              </div>
              {currentIndex === index && (
                <div className="w-12 h-0.5 bg-white rounded-full mt-1"></div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-30 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mt-20">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] mb-4 text-gray-300 uppercase">
            -- {activeCard.subtitle}
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1.05] mb-6 sm:mb-8 tracking-tight text-white drop-shadow-lg uppercase whitespace-pre-line">
            {activeCard.punchline}
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 sm:mb-10 max-w-xl leading-relaxed drop-shadow-md">
            {activeCard.description}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button 
              onClick={() => {
                if (!activeCard.disabled && activeCard.actionUrl) {
                  window.open(activeCard.actionUrl, '_blank');
                }
              }}
              disabled={activeCard.disabled}
              className={`px-8 py-4 rounded-full text-sm font-bold tracking-wider transition-colors uppercase ${activeCard.btnClass}`}
            >
              {activeCard.actionText}
            </button>
            <button className="px-8 py-4 rounded-full text-sm font-bold tracking-wider border border-white hover:bg-white/10 transition-colors uppercase">
              LEARN MORE
            </button>
          </div>
        </div>
      </main>

    </div>
  );
};

export default App;

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  BarChart2, 
  ClipboardList, 
  GraduationCap, 
  ArrowRight, 
  ArrowLeft, 
  Lock,
  Sparkles
} from 'lucide-react';
import teraIcon from './assets/tera_icon-bg.png';

const CARDS_DATA = [
  {
    id: 0,
    title: "Tera AI Chatbot",
    subtitle: "Conversational Intelligence",
    description: "Engage with our most advanced conversational AI. Perfect for coding, writing, and complex problem solving.",
    icon: MessageSquare,
    colorTheme: "blue",
    iconBg: "bg-blue-500/20 border-blue-500/30 text-blue-400",
    btnClass: "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_25px_rgba(59,130,246,0.5)]",
    actionText: "Launch Chat",
    actionUrl: "https://cb.pahoacourse.online",
    accentColor: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.5)",
    videoUrl: "/cb.mp4",
    videoAlign: "object-cover object-left-top",
    disabled: false
  },
  {
    id: 1,
    title: "Tera AI Polling",
    subtitle: "Real-time Sentiment & Consensus",
    description: "Create intelligent polls, gather real-time sentiment analysis, and visualize consensus driven by AI insights.",
    icon: BarChart2,
    colorTheme: "emerald",
    iconBg: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
    btnClass: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)]",
    actionText: "Open Dashboard",
    actionUrl: "https://poll.pahoacourse.online",
    accentColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.5)",
    videoUrl: "/poll.mp4",
    videoAlign: "object-cover object-left-top",
    disabled: false
  },
  {
    id: 2,
    title: "Tera Evaluation",
    subtitle: "Enterprise LLM Benchmarking",
    badge: "Available Q4",
    description: "Comprehensive benchmarking and fine-grained evaluation tools for enterprise LLM deployments.",
    icon: ClipboardList,
    colorTheme: "violet",
    iconBg: "bg-violet-500/20 border-violet-500/30 text-violet-400",
    btnClass: "bg-white/10 border border-white/10 text-slate-400 cursor-not-allowed",
    actionText: "Available Q4",
    actionUrl: null,
    accentColor: "#8b5cf6",
    glowColor: "rgba(139, 92, 246, 0.5)",
    videoUrl: null,
    videoAlign: "object-cover object-center",
    disabled: true
  },
  {
    id: 3,
    title: "Tera Exam",
    subtitle: "Intelligent Proctoring & Vision",
    badge: "In Development",
    description: "Next-generation computer vision tools for real-time environment mapping and object tracking.",
    icon: GraduationCap,
    colorTheme: "rose",
    iconBg: "bg-rose-500/20 border-rose-500/30 text-rose-400",
    btnClass: "bg-white/10 border border-white/10 text-slate-400 cursor-not-allowed",
    actionText: "In Development",
    actionUrl: null,
    accentColor: "#f43f5e",
    glowColor: "rgba(244, 63, 94, 0.5)",
    videoUrl: null,
    videoAlign: "object-cover object-center",
    disabled: true
  }
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mountedCards, setMountedCards] = useState([]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 180, y: 230 });
  const [isHovering, setIsHovering] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const videoRefs = useRef({});
  const totalCards = CARDS_DATA.length;

  useEffect(() => {
    const timers = [];
    CARDS_DATA.forEach((_, i) => {
      const timer = setTimeout(() => {
        setMountedCards(prev => [...prev, i]);
      }, 100 + i * 140);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const vid = videoRefs.current[key];
      if (vid) {
        if (parseInt(key) === currentIndex) {
          vid.play().catch(() => {});
        }
      }
    });
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseMove = (e, index) => {
    let offset = (index - currentIndex) % totalCards;
    if (offset < 0) offset += totalCards;
    if (offset !== 0) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -14; 
    const rotateY = ((x - centerX) / centerX) * 14;
    
    setTilt({ x: rotateX, y: rotateY });
    setSpotlightPos({ x, y });
    setIsHovering(true);
  };

  const handleMouseLeave = (index) => {
    let offset = (index - currentIndex) % totalCards;
    if (offset < 0) offset += totalCards;
    if (offset !== 0) return;

    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (touchEndX.current === 0) return;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const getCardStyle = (index) => {
    if (!mountedCards.includes(index)) return {};

    let offset = (index - currentIndex) % totalCards;
    if (offset < 0) offset += totalCards;

    const activeCard = CARDS_DATA[currentIndex];

    if (offset === 0) {
      const baseTransform = 'translateX(0) translateZ(0) scale(1)';
      const dynamicShadow = isHovering
        ? `${-tilt.y * 1.8}px ${tilt.x * 1.8}px 55px ${activeCard.glowColor}, 0 25px 50px -12px rgba(0, 0, 0, 0.8)`
        : `0 0 50px ${activeCard.glowColor}, 0 25px 50px -12px rgba(0, 0, 0, 0.75)`;

      return {
        transform: `${baseTransform} rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovering 
          ? 'transform 0.1s cubic-bezier(0.1, 0.9, 0.2, 1), box-shadow 0.2s ease, border-color 0.4s ease' 
          : 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        boxShadow: dynamicShadow,
        background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 255, 0.12), rgba(15, 23, 42, 0.85))`
      };
    }
    return {};
  };

  const getCardClass = (index) => {
    if (!mountedCards.includes(index)) return "stage-card pos-hidden";

    let offset = (index - currentIndex) % totalCards;
    if (offset < 0) offset += totalCards;

    let baseClass = `stage-card card-theme-${index} `;
    if (CARDS_DATA[index].disabled) baseClass += "card-disabled ";

    if (offset === 0) return baseClass + 'pos-front';
    if (offset === 1) return baseClass + 'pos-right';
    if (offset === 2) return baseClass + 'pos-back';
    if (offset === 3) return baseClass + 'pos-left';
    return baseClass;
  };

  const activeCard = CARDS_DATA[currentIndex];

  return (
    <div className="w-full h-screen overflow-hidden relative flex flex-col justify-between select-none bg-[#050511]">
      
      {/* Fullscreen Clear Background Videos Aligned to Top-Left for Optimal Visibility */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {CARDS_DATA.map((card, index) => {
          if (!card.videoUrl) return null;
          const isActive = currentIndex === index;
          return (
            <video
              key={card.id}
              ref={(el) => (videoRefs.current[index] = el)}
              src={card.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full ${card.videoAlign} transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              style={{ transitionProperty: 'opacity, transform' }}
            />
          );
        })}
      </div>

      {/* Top Navigation Bar */}
      <header className="w-full z-50 pt-6 pb-2 px-8 flex justify-between items-center absolute top-0 animate-fade-in-up">
        <div className="flex items-center gap-3 bg-slate-900/80 border border-white/20 px-5 py-2.5 rounded-2xl backdrop-blur-xl shadow-2xl">
          <div className="p-1.5 bg-violet-500/20 rounded-xl border border-violet-500/30">
            <img src={teraIcon} alt="Tera AI Logo" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
            Tera<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">AI</span> Hub
          </span>
        </div>
      </header>

      {/* Main Split Layout: Left Info Showcase / Right 3D Cards Stage */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 pt-20 pb-6">
        
        {/* Left Side: Active Application Info */}
        <div className="md:col-span-5 flex flex-col justify-center animate-fade-in-up pr-0 md:pr-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/20 text-xs font-bold tracking-widest uppercase text-white backdrop-blur-md shadow-lg w-max mb-4">
            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
            {activeCard.subtitle}
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight drop-shadow-lg">
            {activeCard.title}
          </h1>

          <p className="text-slate-200 text-base leading-relaxed mb-6 bg-slate-900/70 border border-white/10 p-5 rounded-2xl backdrop-blur-xl shadow-xl">
            {activeCard.description}
          </p>
        </div>

        {/* Right Side: Shifted 3D Card Carousel Stage */}
        <div className="md:col-span-7 flex flex-col items-center md:items-end justify-center w-full">
          <div className="w-full max-w-lg relative">
            
            <div 
              className="stage-container w-full" 
              id="cardStage"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {CARDS_DATA.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div 
                    key={card.id}
                    className={getCardClass(index)} 
                    style={getCardStyle(index)}
                    data-index={index} 
                    onClick={() => setCurrentIndex(index)}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    {card.badge && (
                      <div className="absolute top-6 right-6">
                        <span className="coming-soon-badge text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 badge-dot-pulse"></span>
                          {card.badge}
                        </span>
                      </div>
                    )}

                    <div className={`icon-box w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${card.iconBg}`}>
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      {card.subtitle}
                    </span>

                    <h3 className="text-2xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                      {card.title}
                    </h3>

                    <p className="text-slate-300 text-xs mb-6 flex-grow leading-relaxed">
                      {card.description}
                    </p>

                    {card.disabled ? (
                      <button 
                        disabled 
                        className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5 ${card.btnClass}`}
                      >
                        <Lock className="w-4 h-4 text-slate-500" />
                        <span>{card.actionText}</span>
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (card.actionUrl) window.open(card.actionUrl, '_blank');
                        }}
                        className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 group btn-shimmer ${card.btnClass}`}
                      >
                        <span>{card.actionText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Pagination & Navigation Controls */}
            <div className="flex items-center justify-center gap-5 mt-6 w-full">
              <button 
                id="prevBtn" 
                onClick={handlePrev} 
                aria-label="Previous Card"
                className="p-3 rounded-full bg-slate-900/80 border border-white/20 hover:bg-slate-800 text-slate-200 hover:text-white transition-all backdrop-blur-md group z-50 shadow-xl"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/80 border border-white/20 rounded-full backdrop-blur-md z-50 shadow-xl">
                {CARDS_DATA.map((card, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to card ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      currentIndex === i 
                        ? 'w-9 shadow-md' 
                        : 'w-2.5 bg-white/30 hover:bg-white/50'
                    }`}
                    style={{
                      backgroundColor: currentIndex === i ? activeCard.accentColor : undefined,
                      boxShadow: currentIndex === i ? `0 0 14px ${activeCard.accentColor}` : undefined
                    }}
                  />
                ))}
              </div>

              <button 
                id="nextBtn" 
                onClick={handleNext} 
                aria-label="Next Card"
                className="p-3 rounded-full bg-slate-900/80 border border-white/20 hover:bg-slate-800 text-slate-200 hover:text-white transition-all backdrop-blur-md group z-50 shadow-xl"
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

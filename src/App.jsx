import React, { useState, useEffect } from 'react';
import teraIcon from './assets/tera_icon-bg.png';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mountedCards, setMountedCards] = useState([]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const totalCards = 4;

  useEffect(() => {
    // Staggered entrance animation
    const timers = [];
    [0, 1, 2, 3].forEach((i) => {
      const timer = setTimeout(() => {
        setMountedCards(prev => [...prev, i]);
      }, 100 + i * 150);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    // Re-render lucide icons whenever the component mounts or updates
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

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
    if (offset !== 0) return; // Only apply parallax to front card

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max tilt is 12 degrees
    const rotateX = ((y - centerY) / centerY) * -12; 
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setTilt({ x: rotateX, y: rotateY });
    setIsHovering(true);
  };

  const handleMouseLeave = (index) => {
    let offset = (index - currentIndex) % totalCards;
    if (offset < 0) offset += totalCards;
    if (offset !== 0) return;

    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const getCardStyle = (index) => {
    if (!mountedCards.includes(index)) return {};

    let offset = (index - currentIndex) % totalCards;
    if (offset < 0) offset += totalCards;

    if (offset === 0) {
      const baseTransform = 'translateX(0) translateZ(0) scale(1)';
      return {
        transform: `${baseTransform} rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovering ? 'transform 0.1s ease-out, box-shadow 0.1s ease-out' : 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        boxShadow: isHovering 
          ? `${-tilt.y * 1.5}px ${tilt.x * 1.5}px 50px rgba(139, 92, 246, 0.4), 0 25px 50px -12px rgba(0, 0, 0, 0.6)` 
          : '0 0 50px rgba(139, 92, 246, 0.2), 0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      };
    }
    return {};
  };

  const getCardClass = (index) => {
    if (!mountedCards.includes(index)) return "stage-card pos-hidden";

    let offset = (index - currentIndex) % totalCards;
    if (offset < 0) offset += totalCards;

    let baseClass = "stage-card ";
    if (index === 2 || index === 3) baseClass += "card-disabled ";

    if (offset === 0) return baseClass + 'pos-front';
    if (offset === 1) return baseClass + 'pos-right';
    if (offset === 2) return baseClass + 'pos-back';
    if (offset === 3) return baseClass + 'pos-left';
    return baseClass;
  };

  const getOrbColors = () => {
    switch(currentIndex) {
      case 0: return { orb1: 'bg-blue-900/40', orb2: 'bg-indigo-900/30' };
      case 1: return { orb1: 'bg-emerald-900/40', orb2: 'bg-teal-900/30' };
      case 2: return { orb1: 'bg-violet-900/40', orb2: 'bg-purple-900/30' };
      case 3: return { orb1: 'bg-rose-900/40', orb2: 'bg-orange-900/30' };
      default: return { orb1: 'bg-indigo-900/40', orb2: 'bg-fuchsia-900/30' };
    }
  };

  const orbs = getOrbColors();

  return (
    <>
      <div className={`bg-orb w-[40rem] h-[40rem] top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-1000 ${orbs.orb1}`}></div>
      <div className={`bg-orb w-[30rem] h-[30rem] bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 transition-colors duration-1000 ${orbs.orb2}`} style={{ animationDelay: '-5s' }}></div>

      <nav className="w-full z-50 pt-8 pb-4 flex justify-center items-center absolute top-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
            <img src={teraIcon} alt="Tera AI Icon" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Tera<span className="text-violet-400">AI</span> Hub</span>
        </div>
      </nav>

      <main className="flex-grow flex flex-col justify-center items-center w-full h-full relative z-10 pt-16">
        
        <div className="text-center mb-6 opacity-80">
          <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">Select Application</p>
        </div>

        <div className="w-full max-w-6xl mx-auto relative">
          <div className="stage-container w-full" id="cardStage">
            
            <div 
              className={getCardClass(0)} 
              style={getCardStyle(0)}
              data-index="0" 
              onClick={() => setCurrentIndex(0)}
              onMouseMove={(e) => handleMouseMove(e, 0)}
              onMouseLeave={() => handleMouseLeave(0)}
            >
              <div className="icon-box w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-blue-500/10 border-blue-500/20 text-blue-400">
                <i data-lucide="message-square" className="w-8 h-8"></i>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white tracking-tight">Tera AI Chatbot</h3>
              <p className="text-slate-400 text-base mb-8 flex-grow leading-relaxed">
                Engage with our most advanced conversational AI. Perfect for coding, writing, and complex problem solving.
              </p>
              <button 
                onClick={() => window.open('https://cb.pahoacourse.online', '_blank')}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2"
              >
                Launch Chat <i data-lucide="arrow-right" className="w-4 h-4"></i>
              </button>
            </div>

            <div 
              className={getCardClass(1)} 
              style={getCardStyle(1)}
              data-index="1" 
              onClick={() => setCurrentIndex(1)}
              onMouseMove={(e) => handleMouseMove(e, 1)}
              onMouseLeave={() => handleMouseLeave(1)}
            >
              <div className="icon-box w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                <i data-lucide="bar-chart-2" className="w-8 h-8"></i>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white tracking-tight">Tera AI Polling</h3>
              <p className="text-slate-400 text-base mb-8 flex-grow leading-relaxed">
                Create intelligent polls, gather real-time sentiment analysis, and visualize consensus driven by AI insights.
              </p>
              <button 
                onClick={() => window.open('https://poll.pahoacourse.online', '_blank')}
                className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors text-white font-semibold flex items-center justify-center gap-2"
              >
                Open Polling Dashboard <i data-lucide="arrow-right" className="w-4 h-4"></i>
              </button>
            </div>

            <div 
              className={getCardClass(2)} 
              style={getCardStyle(2)}
              data-index="2" 
              onClick={() => setCurrentIndex(2)}
              onMouseMove={(e) => handleMouseMove(e, 2)}
              onMouseLeave={() => handleMouseLeave(2)}
            >
              <div className="absolute top-6 right-6">
                <span className="coming-soon-badge text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Coming Soon</span>
              </div>
              <div className="icon-box w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-slate-400">
                <i data-lucide="clipboard-list" className="w-8 h-8"></i>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-300 tracking-tight">Tera Evaluation</h3>
              <p className="text-slate-500 text-base mb-8 flex-grow leading-relaxed">
                Comprehensive benchmarking and fine-grained evaluation tools for enterprise LLM deployments.
              </p>
              <button className="w-full py-3.5 rounded-xl bg-white/5 border border-white/5 text-slate-500 font-semibold cursor-not-allowed flex items-center justify-center gap-2">
                <i data-lucide="lock" className="w-4 h-4"></i> Available Q4
              </button>
            </div>

            <div 
              className={getCardClass(3)} 
              style={getCardStyle(3)}
              data-index="3" 
              onClick={() => setCurrentIndex(3)}
              onMouseMove={(e) => handleMouseMove(e, 3)}
              onMouseLeave={() => handleMouseLeave(3)}
            >
              <div className="absolute top-6 right-6">
                <span className="coming-soon-badge text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Coming Soon</span>
              </div>
              <div className="icon-box w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-slate-400">
                <i data-lucide="graduation-cap" className="w-8 h-8"></i>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-300 tracking-tight">Tera Exam</h3>
              <p className="text-slate-500 text-base mb-8 flex-grow leading-relaxed">
                Next-generation computer vision tools for real-time environment mapping and object tracking.
              </p>
              <button className="w-full py-3.5 rounded-xl bg-white/5 border border-white/5 text-slate-500 font-semibold cursor-not-allowed flex items-center justify-center gap-2">
                 <i data-lucide="lock" className="w-4 h-4"></i> In Development
              </button>
            </div>

          </div>
          
          <div className="flex items-center justify-center gap-8 mt-12">
            <button id="prevBtn" onClick={handlePrev} className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-slate-400 transition-all backdrop-blur-sm group z-50">
              <i data-lucide="arrow-left" className="w-5 h-5 group-hover:-translate-x-1 transition-transform"></i>
            </button>
            
            <div className="flex gap-3" id="dotsContainer">
              <div className="w-12 h-1 rounded-full bg-violet-500 transition-all duration-300" id="indicator"></div>
            </div>

            <button id="nextBtn" onClick={handleNext} className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-slate-400 transition-all backdrop-blur-sm group z-50">
              <i data-lucide="arrow-right" className="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;

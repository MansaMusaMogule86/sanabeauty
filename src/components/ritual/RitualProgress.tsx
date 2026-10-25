import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Check, ChevronRight, ChevronLeft, Sparkles, Clock, ArrowDown, Compass } from 'lucide-react';

export interface StageInfo {
  id: string;
  stepNumber: string;
  name: string;
  subtitle: string;
  duration: string;
  sectionId: string;
  description?: string;
}

export const RITUAL_STAGES: StageInfo[] = [
  {
    id: 'exfoliate',
    stepNumber: '01',
    name: 'Exfoliate',
    subtitle: 'Le Bon Bon de Bain',
    duration: '3–4 min',
    sectionId: 'ritual-stage-exfoliate',
    description: 'Polish rough edges with micro-fine crystalline sugar pearls.',
  },
  {
    id: 'nourish',
    stepNumber: '02',
    name: 'Nourish',
    subtitle: 'Velvet Elixir',
    duration: '2 min',
    sectionId: 'ritual-stage-nourish',
    description: 'Lock in dewy moisture with cold-pressed botanical dry oils.',
  },
  {
    id: 'soften',
    stepNumber: '03',
    name: 'Soften',
    subtitle: 'Velvet Body Lotion',
    duration: '2 min',
    sectionId: 'ritual-stage-soften',
    description: 'Cushion skin with biomimetic ceramides for cashmere comfort.',
  },
  {
    id: 'finish',
    stepNumber: '04',
    name: 'Finish',
    subtitle: 'Velvet Body Spray',
    duration: '1 min',
    sectionId: 'ritual-stage-finish',
    description: 'Crown pulse points with spun sugar, amber, and cashmeran sillage.',
  },
];

export interface RitualProgressProps {
  /** Optional controlled active index (0 to 3). If omitted, component tracks scroll position automatically. */
  activeStage?: number;
  /** Optional callback when a stage is selected */
  onStageChange?: (index: number) => void;
  /** Optional completed stages indices */
  completedStages?: number[];
  /** Mode: 'docked-bar' (horizontal sticky bar) | 'floating-rail' (desktop side rail) | 'banner' (rich overview card) */
  mode?: 'docked-bar' | 'floating-rail' | 'banner';
  /** Custom CSS classes */
  className?: string;
}

export const RitualProgress: React.FC<RitualProgressProps> = ({
  activeStage: controlledActiveStage,
  onStageChange,
  completedStages = [],
  mode = 'docked-bar',
  className = '',
}) => {
  const [internalActiveStage, setInternalActiveStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeIndex =
    controlledActiveStage !== undefined ? controlledActiveStage : internalActiveStage;

  // Handle stage selection with smooth scrolling
  const scrollToStage = useCallback(
    (index: number) => {
      if (onStageChange) {
        onStageChange(index);
      } else {
        setInternalActiveStage(index);
      }

      isClickScrollingRef.current = true;
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }

      const stage = RITUAL_STAGES[index];
      const el = document.getElementById(stage.sectionId);
      if (el) {
        const offset = 140; // Offset for sticky header + docked progress bar
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: 'smooth',
        });
      }

      clickTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 750);
    },
    [onStageChange]
  );

  // Automatic scroll position listener to update active stage and progress
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      const viewportAnchor = window.innerHeight * 0.38;
      let detectedIndex = -1;

      // Find the currently active section in viewport
      RITUAL_STAGES.forEach((stage, idx) => {
        const el = document.getElementById(stage.sectionId);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportAnchor && rect.bottom > viewportAnchor) {
          detectedIndex = idx;
        }
      });

      // Handle edge boundaries: above first or below last
      if (detectedIndex === -1) {
        const firstEl = document.getElementById(RITUAL_STAGES[0].sectionId);
        const lastEl = document.getElementById(
          RITUAL_STAGES[RITUAL_STAGES.length - 1].sectionId
        );
        if (firstEl && firstEl.getBoundingClientRect().top > viewportAnchor) {
          detectedIndex = 0;
        } else if (lastEl && lastEl.getBoundingClientRect().bottom <= viewportAnchor) {
          detectedIndex = RITUAL_STAGES.length - 1;
        }
      }

      if (detectedIndex !== -1) {
        if (controlledActiveStage === undefined) {
          setInternalActiveStage(detectedIndex);
        } else if (onStageChange && detectedIndex !== controlledActiveStage) {
          onStageChange(detectedIndex);
        }
      }

      // Calculate overall ritual section progress percentage
      const firstSection = document.getElementById(RITUAL_STAGES[0].sectionId);
      const lastSection = document.getElementById(
        RITUAL_STAGES[RITUAL_STAGES.length - 1].sectionId
      );

      if (firstSection && lastSection) {
        const startY = firstSection.offsetTop - 150;
        const totalHeight =
          lastSection.offsetTop + lastSection.offsetHeight - startY - window.innerHeight * 0.5;
        const currentY = window.scrollY - startY;

        if (totalHeight > 0) {
          const rawPercent = Math.min(100, Math.max(0, (currentY / totalHeight) * 100));
          setScrollProgress(Math.round(rawPercent));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [controlledActiveStage, onStageChange]);

  const totalStages = RITUAL_STAGES.length;
  const currentStage = RITUAL_STAGES[activeIndex] || RITUAL_STAGES[0];
  const stepPercent = Math.round(((activeIndex + 1) / totalStages) * 100);

  /* =========================================================================
     MODE: FLOATING SIDE RAIL (Desktop companion)
     ========================================================================= */
  if (mode === 'floating-rail') {
    return (
      <aside
        aria-label="Ritual Progress Guide"
        className={`fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-4 p-4 bg-[#FAF6F0]/95 backdrop-blur-md border border-[#E8D5C4] shadow-lg max-w-[210px] ${className}`}
      >
        <div className="space-y-1 pb-3 border-b border-[#E8D5C4]/60">
          <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] text-[#D4A574] font-semibold">
            <Sparkles className="w-3 h-3 text-[#C9A961]" />
            <span>Ritual Guide</span>
          </div>
          <div className="text-xs font-serif font-semibold text-[#6B2C3E]">
            Stage {activeIndex + 1} of {totalStages}
          </div>
          <div className="text-[10px] text-[#2D1B1A]/70 truncate font-light">
            {currentStage.name} · {currentStage.duration}
          </div>
        </div>

        {/* Vertical Nodes */}
        <div className="relative pl-3 space-y-4">
          {/* Vertical track line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-[#E8D5C4]" />
          <div
            className="absolute left-[7px] top-2 w-[1.5px] bg-[#C9A961] transition-all duration-300"
            style={{
              height: `${(activeIndex / (totalStages - 1)) * 100}%`,
            }}
          />

          {RITUAL_STAGES.map((st, idx) => {
            const isActive = idx === activeIndex;
            const isDone = completedStages.includes(idx) || idx < activeIndex;

            return (
              <button
                key={st.id}
                onClick={() => scrollToStage(idx)}
                className={`relative flex items-center gap-2.5 text-left group cursor-pointer transition-all ${
                  isActive ? 'text-[#6B2C3E]' : 'text-neutral-500 hover:text-[#2D1B1A]'
                }`}
              >
                {/* Node icon */}
                <span
                  className={`w-4 h-4 flex items-center justify-center text-[9px] font-bold border transition-colors shrink-0 ${
                    isActive
                      ? 'bg-[#6B2C3E] border-[#C9A961] text-[#FAF6F0]'
                      : isDone
                      ? 'bg-[#C9A961] border-[#C9A961] text-[#2D1B1A]'
                      : 'bg-[#FAF6F0] border-[#E8D5C4] text-neutral-400'
                  }`}
                >
                  {isDone ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : idx + 1}
                </span>

                <div className="min-w-0">
                  <div
                    className={`text-[10px] uppercase tracking-wider font-semibold truncate ${
                      isActive ? 'text-[#6B2C3E] font-bold' : ''
                    }`}
                  >
                    {st.name}
                  </div>
                  <div className="text-[9px] font-serif italic text-neutral-400 truncate">
                    {st.duration}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>
    );
  }

  /* =========================================================================
     MODE: BANNER (Rich overview component for page hero section)
     ========================================================================= */
  if (mode === 'banner') {
    return (
      <section
        aria-label="Ritual Overview and Progress"
        className={`bg-[#FFFFFF] border border-[#E8D5C4] p-6 sm:p-8 shadow-xs relative ${className}`}
      >
        {/* Top Header / Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8D5C4]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#D4A574] font-semibold">
              <Compass className="w-3.5 h-3.5 text-[#C9A961]" />
              <span>Interactive Progression Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-[#2D1B1A]">
              The Four Sacred Stages
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#6B2C3E]">
                Stage 0{activeIndex + 1} of 0{totalStages} · {currentStage.name}
              </div>
              <div className="text-[11px] font-serif italic text-neutral-500">
                {scrollProgress > 0 ? `${scrollProgress}% of ritual scrolled` : `${stepPercent}% in sequence`}
              </div>
            </div>

            {/* Previous / Next buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => activeIndex > 0 && scrollToStage(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous ritual stage"
                title="Previous stage"
                className="p-2 border border-[#E8D5C4] hover:bg-[#FAF6F0] text-[#2D1B1A] transition-colors cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  activeIndex < totalStages - 1 && scrollToStage(activeIndex + 1)
                }
                disabled={activeIndex === totalStages - 1}
                aria-label="Next ritual stage"
                title="Next stage"
                className="p-2 border border-[#E8D5C4] hover:bg-[#FAF6F0] text-[#2D1B1A] transition-colors cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Global Progress Track Line */}
        <div className="my-6">
          <div className="flex items-center justify-between text-[11px] font-serif text-neutral-500 mb-2">
            <span>Stage 01: Exfoliate</span>
            <span>Stage 04: Finish</span>
          </div>
          <div className="w-full h-1.5 bg-[#FAF6F0] border border-[#E8D5C4] relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D4A574] to-[#C9A961] transition-all duration-300"
              style={{ width: `${scrollProgress > 0 ? scrollProgress : stepPercent}%` }}
            />
          </div>
        </div>

        {/* 4 Interactive Stage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RITUAL_STAGES.map((stage, idx) => {
            const isActive = idx === activeIndex;
            const isDone = completedStages.includes(idx) || idx < activeIndex;

            return (
              <button
                key={stage.id}
                onClick={() => scrollToStage(idx)}
                aria-current={isActive ? 'step' : undefined}
                className={`p-4 text-left border transition-all cursor-pointer relative group flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#FAF6F0] border-[#6B2C3E] shadow-sm ring-1 ring-[#C9A961]'
                    : isDone
                    ? 'bg-[#FFFFFF] border-[#D4A574]/60 hover:border-[#6B2C3E]'
                    : 'bg-[#FFFFFF] border-[#E8D5C4] hover:border-[#2D1B1A]/40'
                }`}
              >
                {/* Active top gold edge */}
                {isActive && (
                  <span className="absolute top-0 left-0 right-0 h-1 bg-[#C9A961]" />
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-serif text-base font-bold ${
                        isActive
                          ? 'text-[#6B2C3E]'
                          : isDone
                          ? 'text-[#C9A961]'
                          : 'text-neutral-400'
                      }`}
                    >
                      {stage.stepNumber}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 border ${
                        isActive
                          ? 'bg-[#6B2C3E] border-[#6B2C3E] text-[#FAF6F0]'
                          : isDone
                          ? 'bg-[#C9A961]/20 border-[#C9A961] text-[#2D1B1A]'
                          : 'bg-[#FAF6F0] border-[#E8D5C4] text-neutral-500'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <Check className="w-2.5 h-2.5" />
                          <span>Done</span>
                        </>
                      ) : isActive ? (
                        <>
                          <Sparkles className="w-2.5 h-2.5 text-[#C9A961]" />
                          <span>Active</span>
                        </>
                      ) : (
                        stage.duration
                      )}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-xs sm:text-sm tracking-wider uppercase text-[#2D1B1A]">
                      {stage.name}
                    </h3>
                    <p className="text-[11px] font-serif italic text-[#6B2C3E]">
                      {stage.subtitle}
                    </p>
                  </div>

                  {stage.description && (
                    <p className="text-xs text-neutral-500 font-light leading-relaxed line-clamp-2">
                      {stage.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-3 border-t border-[#E8D5C4]/60 flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
                  <span
                    className={
                      isActive
                        ? 'text-[#6B2C3E]'
                        : 'text-neutral-400 group-hover:text-[#2D1B1A]'
                    }
                  >
                    {isActive ? 'Current Step' : 'Jump to Stage'}
                  </span>
                  <ArrowDown
                    className={`w-3 h-3 transition-transform ${
                      isActive
                        ? 'text-[#6B2C3E] translate-y-0.5'
                        : 'text-neutral-400 group-hover:translate-y-0.5'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="mt-6 pt-4 border-t border-[#E8D5C4]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#C9A961]" />
            <span>Total ritual curation: ~9–10 minutes of evening sanctuary</span>
          </div>
          <div className="text-[11px] font-serif italic text-[#6B2C3E]">
            Scroll to follow stages naturally as you explore each step
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================================
     MODE: DOCKED BAR (Default sticky bar at top under header)
     ========================================================================= */
  return (
    <nav
      aria-label="Ritual Progress Stepper"
      className={`w-full bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E8D5C4] shadow-xs text-[#2D1B1A] transition-colors ${className}`}
    >
      {/* Precision hairline scroll progress indicator */}
      <div className="w-full h-[2px] bg-[#E8D5C4]/40 relative overflow-hidden">
        <div
          className="h-full bg-[#C9A961] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress > 0 ? scrollProgress : stepPercent}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Left Meta: Current stage descriptor */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <span className="w-1.5 h-1.5 bg-[#C9A961] rotate-45 inline-block" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#D4A574]">
              The Ritual Progress
            </span>
            <span className="text-xs opacity-30">·</span>
            <span className="text-xs font-serif italic text-[#6B2C3E] font-medium">
              Stage 0{activeIndex + 1}: {currentStage.name} ({currentStage.duration})
            </span>
          </div>

          {/* Center: 4 Interactive Stage Nodes */}
          <div className="flex-1 grid grid-cols-4 gap-1.5 sm:gap-2.5 max-w-2xl mx-auto">
            {RITUAL_STAGES.map((stage, idx) => {
              const isActive = idx === activeIndex;
              const isDone = completedStages.includes(idx) || idx < activeIndex;

              return (
                <button
                  key={stage.id}
                  onClick={() => scrollToStage(idx)}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Ritual Stage ${stage.stepNumber}: ${stage.name}`}
                  className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-3 text-left transition-all border cursor-pointer relative ${
                    isActive
                      ? 'bg-[#6B2C3E] border-[#6B2C3E] text-[#FAF6F0] shadow-xs ring-1 ring-[#C9A961]/50'
                      : isDone
                      ? 'bg-[#FFFFFF] border-[#D4A574]/60 text-[#6B2C3E] hover:border-[#6B2C3E]'
                      : 'bg-[#FFFFFF] border-[#E8D5C4] text-[#2D1B1A]/60 hover:border-[#2D1B1A]/40'
                  }`}
                >
                  {/* Active top gold edge */}
                  {isActive && (
                    <span className="absolute -top-[1px] left-0 right-0 h-[2px] bg-[#C9A961]" />
                  )}

                  {/* Step number badge / check */}
                  <div
                    className={`w-4 h-4 text-[10px] flex items-center justify-center font-serif font-bold shrink-0 ${
                      isActive
                        ? 'text-[#C9A961]'
                        : isDone
                        ? 'text-[#D4A574]'
                        : 'opacity-50'
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      stage.stepNumber
                    )}
                  </div>

                  {/* Stage title */}
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase truncate">
                      {stage.name}
                    </div>
                    <div className="hidden lg:block text-[9px] font-serif italic text-neutral-400 truncate">
                      {stage.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Previous / Next buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => activeIndex > 0 && scrollToStage(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous ritual stage"
              title="Previous stage"
              className="p-1.5 border border-[#E8D5C4] hover:bg-[#E8D5C4]/40 text-[#2D1B1A] transition-colors cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                activeIndex < totalStages - 1 && scrollToStage(activeIndex + 1)
              }
              disabled={activeIndex === totalStages - 1}
              aria-label="Next ritual stage"
              title="Next stage"
              className="p-1.5 border border-[#E8D5C4] hover:bg-[#E8D5C4]/40 text-[#2D1B1A] transition-colors cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

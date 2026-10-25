import React from 'react';
import { Check, ChevronLeft, ChevronRight, Sparkles, Clock } from 'lucide-react';

export interface RitualStage {
  id: string;
  stepNumber: string; // '01', '02', '03', '04'
  name: string; // 'EXFOLIATE', 'NOURISH', 'SOFTEN', 'FINISH'
  productName: string; // 'Le Bon Bon de Bain', etc.
  subtitle?: string;
  duration?: string;
  shortDescription?: string;
}

export const DEFAULT_RITUAL_STAGES: RitualStage[] = [
  {
    id: 'exfoliate',
    stepNumber: '01',
    name: 'EXFOLIATE',
    productName: 'Le Bon Bon de Bain',
    subtitle: 'Sugar Soufflé Polish',
    duration: '3–4 min',
    shortDescription: 'Polish away dead cells with micro-fine crystalline sugar pearls.',
  },
  {
    id: 'nourish',
    stepNumber: '02',
    name: 'NOURISH',
    productName: 'Velvet Elixir',
    subtitle: 'Botanical Dry Body Oil',
    duration: '2 min',
    shortDescription: 'Lock in dewy moisture with cold-pressed marula and camellia oils.',
  },
  {
    id: 'soften',
    stepNumber: '03',
    name: 'SOFTEN',
    productName: 'Velvet Body Lotion',
    subtitle: 'Ceramide Hydrating Veil',
    duration: '2 min',
    shortDescription: 'Cushion the skin in biomimetic ceramides for enduring cashmere comfort.',
  },
  {
    id: 'finish',
    stepNumber: '04',
    name: 'FINISH',
    productName: 'Velvet Body Spray',
    subtitle: 'Sensual Fine Fragrance Mist',
    duration: '1 min',
    shortDescription: 'Crown the body with spun sugar, amber, and warm cashmeran sillage.',
  },
];

export interface RitualProgressStepperProps {
  /** 0-indexed current active step (0 to 3) */
  activeStep: number;
  /** Callback triggered when user navigates to a step */
  onSelectStep: (stepIndex: number) => void;
  /** Array of completed step indices (e.g. [0, 1]) */
  completedSteps?: number[];
  /** Optional custom stages list */
  stages?: RitualStage[];
  /** Visual presentation variant */
  variant?: 'full' | 'compact' | 'sticky';
  /** Color theme */
  theme?: 'dark' | 'light';
  /** Show Next / Previous quick controls */
  showControls?: boolean;
  /** Optional class name */
  className?: string;
}

export const RitualProgressStepper: React.FC<RitualProgressStepperProps> = ({
  activeStep,
  onSelectStep,
  completedSteps = [],
  stages = DEFAULT_RITUAL_STAGES,
  variant = 'full',
  theme = 'light',
  showControls = true,
  className = '',
}) => {
  const totalStages = stages.length;
  // Progress calculation: each completed stage advances the percentage
  const progressPercent = Math.min(
    100,
    Math.round(((activeStep + 1) / totalStages) * 100)
  );

  const isDark = theme === 'dark';

  // Quick navigation helpers
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStep > 0) {
      onSelectStep(activeStep - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStep < totalStages - 1) {
      onSelectStep(activeStep + 1);
    }
  };

  // Helper to check if a step is finished
  const isCompleted = (index: number) => {
    return completedSteps.includes(index) || index < activeStep;
  };

  /* =========================================================================
     VARIANT: STICKY FLOATING BAR
     Ultra-refined bar that docks directly under the header during ritual exploration
     ========================================================================= */
  if (variant === 'sticky') {
    return (
      <nav
        aria-label="Ritual Progress Navigation"
        className={`w-full backdrop-blur-md transition-all border-b shadow-sm ${
          isDark
            ? 'bg-[#1F1212]/95 border-[#FAF6F0]/15 text-[#FAF6F0]'
            : 'bg-[#FAF6F0]/95 border-[#E8D5C4] text-[#2D1B1A]'
        } ${className}`}
      >
        {/* Continuous hairline indicator running across the very top */}
        <div className="w-full h-[2px] bg-neutral-200/50 dark:bg-white/10 relative overflow-hidden">
          <div
            className="h-full bg-[#C9A961] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex items-center justify-between gap-3">
            {/* Meta Label on larger screens */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <span className="w-1.5 h-1.5 bg-[#C9A961] rotate-45 inline-block" />
              <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#D4A574]">
                The Ritual
              </span>
              <span className="text-xs opacity-30">|</span>
              <span className="text-xs font-serif italic text-neutral-500">
                Stage {activeStep + 1} of {totalStages}
              </span>
            </div>

            {/* Stepper Stage Tabs: 4 Interactive Nodes */}
            <div className="flex-1 grid grid-cols-4 gap-1.5 sm:gap-2 max-w-3xl mx-auto">
              {stages.map((stage, idx) => {
                const isActive = idx === activeStep;
                const done = isCompleted(idx);

                return (
                  <button
                    key={stage.id}
                    onClick={() => onSelectStep(idx)}
                    aria-current={isActive ? 'step' : undefined}
                    aria-label={`Step ${stage.stepNumber}: ${stage.name}`}
                    className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 py-1.5 sm:py-2 px-2 sm:px-3 text-left transition-all border cursor-pointer relative ${
                      isActive
                        ? isDark
                          ? 'bg-[#6B2C3E] border-[#C9A961] text-[#FAF6F0] shadow-xs'
                          : 'bg-[#6B2C3E] border-[#6B2C3E] text-[#FAF6F0] shadow-xs'
                        : done
                        ? isDark
                          ? 'bg-[#2D1B1A]/90 border-[#C9A961]/40 text-[#D4A574] hover:border-[#C9A961]'
                          : 'bg-[#FAF6F0] border-[#D4A574]/60 text-[#6B2C3E] hover:border-[#6B2C3E]'
                        : isDark
                        ? 'bg-[#180E0E]/60 border-white/10 text-[#FAF6F0]/50 hover:border-white/30'
                        : 'bg-[#FFFFFF] border-[#E8D5C4]/70 text-[#2D1B1A]/60 hover:border-[#2D1B1A]/40'
                    }`}
                  >
                    {/* Active accent edge */}
                    {isActive && (
                      <span className="absolute -top-[1px] left-0 right-0 h-[2px] bg-[#C9A961]" />
                    )}

                    <div
                      className={`w-4 h-4 text-[10px] flex items-center justify-center font-serif font-bold shrink-0 ${
                        isActive
                          ? 'text-[#C9A961]'
                          : done
                          ? 'text-[#D4A574]'
                          : 'opacity-60'
                      }`}
                    >
                      {done ? (
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        stage.stepNumber
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase truncate">
                        {stage.name}
                      </div>
                      <div className="hidden md:block text-[9px] font-serif italic text-neutral-400 truncate">
                        {stage.productName}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Prev / Next Controls */}
            {showControls && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={handlePrev}
                  disabled={activeStep === 0}
                  aria-label="Previous ritual stage"
                  title="Previous stage"
                  className={`p-1.5 border transition-colors cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed ${
                    isDark
                      ? 'border-[#FAF6F0]/20 hover:bg-white/10 text-[#FAF6F0]'
                      : 'border-[#E8D5C4] hover:bg-[#E8D5C4]/40 text-[#2D1B1A]'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeStep === totalStages - 1}
                  aria-label="Next ritual stage"
                  title="Next stage"
                  className={`p-1.5 border transition-colors cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed ${
                    isDark
                      ? 'border-[#FAF6F0]/20 hover:bg-white/10 text-[#FAF6F0]'
                      : 'border-[#E8D5C4] hover:bg-[#E8D5C4]/40 text-[#2D1B1A]'
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }

  /* =========================================================================
     VARIANT: COMPACT PROGRESS STRIP
     Minimal hairline bar with numbered nodes
     ========================================================================= */
  if (variant === 'compact') {
    return (
      <div
        className={`w-full py-4 ${
          isDark ? 'text-[#FAF6F0]' : 'text-[#2D1B1A]'
        } ${className}`}
        aria-label="Ritual Progress"
      >
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4A574] font-semibold">
              Ritual Stage {stages[activeStep]?.stepNumber}
            </span>
            <span className="font-serif italic text-neutral-400">
              — {stages[activeStep]?.name}
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#D4A574]">
            {progressPercent}% COMPLETE
          </span>
        </div>

        {/* Progress bar background line */}
        <div className="relative flex items-center justify-between">
          <div
            className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] ${
              isDark ? 'bg-white/10' : 'bg-[#E8D5C4]'
            }`}
          />
          {/* Active fill line */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#C9A961] transition-all duration-300"
            style={{
              width: `${(activeStep / (totalStages - 1)) * 100}%`,
            }}
          />

          {stages.map((stage, idx) => {
            const isActive = idx === activeStep;
            const done = isCompleted(idx);

            return (
              <button
                key={stage.id}
                onClick={() => onSelectStep(idx)}
                aria-current={isActive ? 'step' : undefined}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-7 h-7 flex items-center justify-center text-xs font-serif font-bold transition-all border ${
                    isActive
                      ? 'bg-[#6B2C3E] border-[#C9A961] text-[#FAF6F0] ring-2 ring-[#C9A961]/40'
                      : done
                      ? 'bg-[#C9A961] border-[#C9A961] text-[#2D1B1A]'
                      : isDark
                      ? 'bg-[#1F1212] border-white/20 text-white/50 group-hover:border-white/50'
                      : 'bg-[#FAF6F0] border-[#E8D5C4] text-[#2D1B1A]/50 group-hover:border-[#2D1B1A]/40'
                  }`}
                >
                  {done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stage.stepNumber}
                </div>
                <span
                  className={`mt-1.5 text-[10px] tracking-wider uppercase font-medium transition-colors ${
                    isActive
                      ? 'text-[#C9A961]'
                      : done
                      ? 'text-[#D4A574]'
                      : 'opacity-50'
                  }`}
                >
                  {stage.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* =========================================================================
     VARIANT: FULL RITUAL PROGRESS STEPPER (Default)
     Editorial, luxury display with connecting progress bar, stage cards,
     rich product hints, time indicators, and interactive step jumping.
     ========================================================================= */
  return (
    <div
      aria-label="Ritual Progress Stepper"
      className={`w-full ${
        isDark ? 'text-[#FAF6F0]' : 'text-[#2D1B1A]'
      } ${className}`}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E8D5C4]/40">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-[#C9A961] rotate-45 inline-block" />
          <span className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#D4A574]">
            Botanical Application Sequence
          </span>
          <span className="text-xs opacity-40">·</span>
          <span className="text-xs font-serif italic text-neutral-400">
            4 Calibrated Stages
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-[#D4A574]">
            <Clock className="w-3.5 h-3.5" />
            <span>Total: 8–9 Minutes</span>
          </div>
          <span className="opacity-30">|</span>
          <div className="font-mono text-[11px] tracking-wider text-[#C9A961]">
            STAGE {activeStep + 1} OF {totalStages} ({progressPercent}%)
          </div>
        </div>
      </div>

      {/* Progress Track Line with Step Node Cards */}
      <div className="relative mb-8">
        {/* Horizontal Connector Line for Desktop */}
        <div
          className={`hidden md:block absolute top-7 left-12 right-12 h-[1.5px] -z-0 ${
            isDark ? 'bg-white/10' : 'bg-[#E8D5C4]'
          }`}
        />
        {/* Gold Active Progress Line */}
        <div
          className="hidden md:block absolute top-7 left-12 h-[2px] bg-[#C9A961] transition-all duration-500 -z-0"
          style={{
            width: `calc(${(activeStep / (totalStages - 1)) * 100}% - ${
              activeStep === totalStages - 1 ? 0 : 24
            }px)`,
          }}
        />

        {/* The 4 Stage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {stages.map((stage, idx) => {
            const isActive = idx === activeStep;
            const done = isCompleted(idx);

            return (
              <button
                key={stage.id}
                onClick={() => onSelectStep(idx)}
                aria-current={isActive ? 'step' : undefined}
                className={`p-4 sm:p-5 text-left border transition-all duration-300 relative group cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-[#6B2C3E] border-[#C9A961] shadow-xl text-[#FAF6F0] ring-1 ring-[#C9A961]'
                      : 'bg-[#6B2C3E] border-[#6B2C3E] shadow-lg text-[#FAF6F0]'
                    : done
                    ? isDark
                      ? 'bg-[#1F1212] border-[#C9A961]/50 text-[#FAF6F0]/90 hover:border-[#C9A961]'
                      : 'bg-[#FAF6F0] border-[#D4A574] text-[#2D1B1A] hover:border-[#6B2C3E]'
                    : isDark
                    ? 'bg-[#180E0E]/80 border-white/10 text-[#FAF6F0]/60 hover:border-white/30'
                    : 'bg-[#FFFFFF] border-[#E8D5C4] text-[#2D1B1A]/70 hover:border-[#2D1B1A]/30'
                }`}
              >
                {/* Active Indicator Top Accent */}
                {isActive && (
                  <div className="absolute -top-[1px] left-0 right-0 h-[3px] bg-[#C9A961]" />
                )}

                {/* Stage Header: Number & Status */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 flex items-center justify-center font-serif text-xs font-bold border ${
                        isActive
                          ? 'border-[#C9A961] text-[#C9A961] bg-[#2D1B1A]/60'
                          : done
                          ? 'border-[#D4A574] bg-[#C9A961] text-[#2D1B1A]'
                          : 'border-current opacity-40'
                      }`}
                    >
                      {done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stage.stepNumber}
                    </span>
                    <span
                      className={`text-[10px] tracking-[0.2em] uppercase font-semibold ${
                        isActive
                          ? 'text-[#C9A961]'
                          : done
                          ? 'text-[#D4A574]'
                          : 'opacity-50'
                      }`}
                    >
                      Step {stage.stepNumber}
                    </span>
                  </div>

                  {stage.duration && (
                    <span
                      className={`text-[10px] flex items-center gap-1 ${
                        isActive
                          ? 'text-[#E8D5C4]'
                          : done
                          ? 'text-[#D4A574]'
                          : 'opacity-50'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{stage.duration}</span>
                    </span>
                  )}
                </div>

                {/* Stage Title */}
                <div className="space-y-1 mb-2">
                  <div className="font-sans text-sm font-bold tracking-widest uppercase">
                    {stage.name}
                  </div>
                  <div
                    className={`font-serif text-xs italic ${
                      isActive
                        ? 'text-[#E8D5C4]'
                        : done
                        ? 'text-[#6B2C3E] dark:text-[#D4A574]'
                        : 'opacity-60'
                    }`}
                  >
                    {stage.productName}
                  </div>
                </div>

                {/* Optional Subtitle / Tip */}
                {stage.subtitle && (
                  <p
                    className={`text-[11px] leading-snug line-clamp-2 ${
                      isActive
                        ? 'text-[#FAF6F0]/90'
                        : done
                        ? 'text-[#2D1B1A]/80 dark:text-[#FAF6F0]/70'
                        : 'opacity-60'
                    }`}
                  >
                    {stage.subtitle}
                  </p>
                )}

                {/* Status Badge in footer */}
                <div className="mt-4 pt-2 border-t border-current/10 flex items-center justify-between text-[10px] uppercase tracking-wider">
                  <span
                    className={
                      isActive
                        ? 'text-[#C9A961] font-semibold flex items-center gap-1'
                        : done
                        ? 'text-[#D4A574] font-medium'
                        : 'opacity-40'
                    }
                  >
                    {isActive ? (
                      <>
                        <Sparkles className="w-2.5 h-2.5 text-[#C9A961]" />
                        Active Stage
                      </>
                    ) : done ? (
                      'Completed'
                    ) : (
                      'Upcoming'
                    )}
                  </span>
                  <span className="opacity-40 font-mono text-[9px]">
                    0{idx + 1}/04
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls: Prev, Next & Stage Indicator */}
      {showControls && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E8D5C4]/40">
          <button
            onClick={handlePrev}
            disabled={activeStep === 0}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs tracking-wider uppercase font-semibold border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
              isDark
                ? 'border-[#FAF6F0]/20 hover:border-[#D4A574] text-[#FAF6F0]'
                : 'border-[#2D1B1A]/30 hover:border-[#6B2C3E] text-[#2D1B1A]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous: {activeStep > 0 ? stages[activeStep - 1].name : 'Start'}</span>
          </button>

          {/* Quick jump step dots */}
          <div className="flex items-center gap-2">
            {stages.map((st, i) => (
              <button
                key={st.id}
                onClick={() => onSelectStep(i)}
                aria-label={`Jump to stage ${st.stepNumber}: ${st.name}`}
                className={`h-1.5 transition-all cursor-pointer ${
                  i === activeStep
                    ? 'w-8 bg-[#C9A961]'
                    : isCompleted(i)
                    ? 'w-3 bg-[#D4A574]'
                    : isDark
                    ? 'w-2 bg-white/20 hover:bg-white/40'
                    : 'w-2 bg-[#2D1B1A]/20 hover:bg-[#2D1B1A]/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={activeStep === totalStages - 1}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
              activeStep === totalStages - 1
                ? 'border border-[#C9A961] text-[#C9A961]'
                : isDark
                ? 'bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] border border-[#6B2C3E]'
                : 'bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0]'
            }`}
          >
            <span>
              {activeStep < totalStages - 1
                ? `Next: ${stages[activeStep + 1].name}`
                : 'Ritual Complete'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

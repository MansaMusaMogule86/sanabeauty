import React, { useState, useEffect } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, AlertCircle, Copy, CheckCheck, Loader2 } from 'lucide-react';

export interface NewsletterSignupProps {
  variant?: 'footer' | 'waitlist' | 'card';
  source?: string;
  buttonText?: string;
  placeholder?: string;
  showNameField?: boolean;
  showConsentCheckbox?: boolean;
  onSuccess?: (email: string) => void;
  className?: string;
}

export interface SubscriberRecord {
  email: string;
  firstName?: string;
  source: string;
  timestamp: string;
  code: string;
}

// RFC 5322-compliant practical email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  variant = 'footer',
  source = 'newsletter',
  buttonText,
  placeholder = 'Enter your email address...',
  showNameField = false,
  showConsentCheckbox = false,
  onSuccess,
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [consent, setConsent] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [isExistingSubscriber, setIsExistingSubscriber] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const WELCOME_CODE = 'VELVET10';

  // Check if current user is already subscribed in this browser session
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sana_newsletter_subscribers');
      if (stored) {
        const list: SubscriberRecord[] = JSON.parse(stored);
        if (Array.isArray(list) && list.length > 0) {
          // Keep note, but let user submit or view
        }
      }
    } catch {
      // storage unavailable or corrupt
    }
  }, []);

  const validate = (): boolean => {
    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please provide an email address to receive your private invitation.');
      return false;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setError('Please enter a valid email format (e.g., name@domain.com).');
      return false;
    }
    if (showConsentCheckbox && !consent) {
      setError('Please confirm your consent to receive private olfactory dispatches.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setError(null);

    // Simulated luxury network dispatch delay for tactile authenticity
    await new Promise((resolve) => setTimeout(resolve, 650));

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = firstName.trim();
    let alreadyKnown = false;

    try {
      const stored = localStorage.getItem('sana_newsletter_subscribers');
      const subscribers: SubscriberRecord[] = stored ? JSON.parse(stored) : [];
      
      const existingIndex = subscribers.findIndex(
        (s) => s.email.toLowerCase() === cleanEmail
      );

      if (existingIndex >= 0) {
        alreadyKnown = true;
        subscribers[existingIndex].timestamp = new Date().toISOString();
        if (cleanName && !subscribers[existingIndex].firstName) {
          subscribers[existingIndex].firstName = cleanName;
        }
      } else {
        subscribers.push({
          email: cleanEmail,
          firstName: cleanName || undefined,
          source,
          timestamp: new Date().toISOString(),
          code: WELCOME_CODE,
        });
      }

      localStorage.setItem('sana_newsletter_subscribers', JSON.stringify(subscribers));

      // Also maintain compatibility with legacy 'sana_waitlist' key if in waitlist mode
      if (variant === 'waitlist' || source === 'waitlist') {
        const legacyWaitlist = JSON.parse(localStorage.getItem('sana_waitlist') || '[]');
        legacyWaitlist.push({
          firstName: cleanName,
          email: cleanEmail,
          consent,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem('sana_waitlist', JSON.stringify(legacyWaitlist));
      }

      // Dispatch custom DOM event for decoupled app listeners
      window.dispatchEvent(
        new CustomEvent('sana:newsletter-subscribed', {
          detail: { email: cleanEmail, name: cleanName, source },
        })
      );
    } catch (err) {
      console.warn('Subscription storage error:', err);
    }

    setSubmittedEmail(cleanEmail);
    setSubmittedName(cleanName);
    setIsExistingSubscriber(alreadyKnown);
    setStatus('success');
    if (onSuccess) {
      onSuccess(cleanEmail);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(WELCOME_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2400);
  };

  const handleReset = () => {
    setEmail('');
    setFirstName('');
    setError(null);
    setStatus('idle');
  };

  // ==========================================
  // FOOTER VARIANT (Dark velvet & antique gold)
  // ==========================================
  if (variant === 'footer') {
    if (status === 'success') {
      return (
        <div
          role="region"
          aria-live="polite"
          className={`bg-[#201216] border border-[#D4A574]/40 p-5 sm:p-6 text-[#FAF6F0] shadow-md transition-all duration-500 ease-out animate-in fade-in zoom-in-95 ${className}`}
        >
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 shrink-0 bg-gradient-to-br from-[#D4A574] to-[#C9A961] text-[#2D1B1A] flex items-center justify-center font-serif text-sm font-bold shadow-inner">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4A574] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#D4A574]" />
                  Atelier Circle Confirmed
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] text-[#FAF6F0]/50 hover:text-[#FAF6F0] underline tracking-wider transition-colors cursor-pointer"
                >
                  Enter another
                </button>
              </div>

              <h4 className="font-serif text-base sm:text-lg text-[#FAF6F0] leading-snug">
                {isExistingSubscriber
                  ? 'Welcome back to the Circle.'
                  : 'Welcome to SANA BEAUTY.'}
              </h4>

              <p className="text-xs text-[#FAF6F0]/75 leading-relaxed font-light">
                Your private allocation privileges have been registered for{' '}
                <strong className="text-[#FAF6F0] font-medium">{submittedEmail}</strong>.
              </p>

              {/* Welcome Code Token */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-[#2D1B1A] border border-[#D4A574]/50 px-3 py-1.5 text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#FAF6F0]/60">Privilege:</span>
                  <span className="font-mono font-semibold tracking-widest text-[#D4A574]">{WELCOME_CODE}</span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="ml-1 text-[#FAF6F0]/70 hover:text-[#D4A574] transition-colors p-0.5 cursor-pointer"
                    title="Copy code"
                    aria-label="Copy promotion code"
                  >
                    {copiedCode ? (
                      <CheckCheck className="w-3.5 h-3.5 text-[#D4A574]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <span className="text-[11px] text-[#D4A574]/80 italic">
                  {copiedCode ? 'Copied to clipboard' : '10% on your inaugural order'}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} noValidate className={`space-y-3 ${className}`}>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder={placeholder}
              aria-label="Email Address for newsletter"
              aria-invalid={!!error}
              aria-describedby={error ? 'footer-newsletter-error' : undefined}
              disabled={status === 'loading'}
              className={`w-full bg-[#1A0E12] border text-[#FAF6F0] placeholder-[#FAF6F0]/40 px-4 py-3 text-xs tracking-wider transition-colors focus:outline-hidden disabled:opacity-60 ${
                error
                  ? 'border-[#C25B6C] focus:border-[#C25B6C]'
                  : 'border-[#6B2C3E]/80 focus:border-[#D4A574]'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-[#6B2C3E] hover:bg-[#85344B] active:bg-[#542130] text-[#FAF6F0] px-6 py-3 text-xs tracking-[0.22em] uppercase font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 border border-[#D4A574]/30 hover:border-[#D4A574]/60 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4A574]" />
                <span>Inviting...</span>
              </>
            ) : (
              <>
                <span>{buttonText || 'Subscribe'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4A574]" />
              </>
            )}
          </button>
        </div>

        {error && (
          <div
            id="footer-newsletter-error"
            role="alert"
            className="flex items-center gap-2 text-[11px] text-[#E08D9A] font-light tracking-wide pt-0.5 animate-in fade-in"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#E08D9A]" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-[10px] text-[#FAF6F0]/50 tracking-wider">
          <span>Complimentary velvet packaging included with membership.</span>
          <span className="hidden sm:inline text-[#D4A574]/60">Unsubscribe anytime</span>
        </div>
      </form>
    );
  }

  // ==========================================
  // WAITLIST / CARD VARIANT (Warm cream & velvet)
  // ==========================================
  if (status === 'success') {
    return (
      <div
        role="region"
        aria-live="polite"
        className={`bg-[#FAF6F0] border border-[#C9A961]/60 p-8 sm:p-10 space-y-5 text-center transition-all duration-500 ease-out animate-in fade-in zoom-in-95 ${className}`}
      >
        <div className="w-12 h-12 bg-[#6B2C3E] text-[#FAF6F0] mx-auto flex items-center justify-center border border-[#D4A574]/50 shadow-md">
          <Check className="w-6 h-6 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
            Allocation Key Reserved
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#2D1B1A]">
            {isExistingSubscriber
              ? `Your invitation is updated, ${submittedName || 'cher ami'}.`
              : `You are registered, ${submittedName || 'cher ami'}.`}
          </h3>
          <p className="text-xs sm:text-sm text-[#2D1B1A]/80 max-w-md mx-auto leading-relaxed font-light">
            Your private atelier pass and guaranteed launch allocation have been secured for{' '}
            <strong className="font-medium text-[#6B2C3E]">{submittedEmail}</strong>.
          </p>
        </div>

        {/* Exclusive privilege token card */}
        <div className="max-w-md mx-auto bg-[#FFFFFF] border border-[#E8D5C4] p-4 text-left space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#2D1B1A]/60 font-medium">
              Private Launch Token
            </span>
            <span className="text-[10px] text-[#C9A961] font-semibold tracking-wider uppercase">
              Priority Tier 1
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-[#E8D5C4]/60 pt-2">
            <div>
              <p className="font-mono text-sm font-semibold tracking-widest text-[#6B2C3E]">
                {WELCOME_CODE}
              </p>
              <p className="text-[10px] text-[#2D1B1A]/60 font-light">
                Guarantees handcrafted presentation box allocation + 10% privilege
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyCode}
              className="bg-[#FAF6F0] hover:bg-[#F2ECE1] border border-[#E8D5C4] px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#2D1B1A] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <CheckCheck className="w-3 h-3 text-[#6B2C3E]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-[#6B2C3E]" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] uppercase tracking-[0.2em] text-[#6B2C3E] hover:text-[#2D1B1A] font-medium underline underline-offset-4 transition-colors cursor-pointer"
          >
            Register an associate or friend
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-4 text-left ${className}`}>
      <div className={`grid gap-4 ${showNameField ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {showNameField && (
          <div>
            <label
              htmlFor="newsletter-firstname"
              className="block text-[11px] uppercase tracking-wider text-[#2D1B1A]/70 mb-1.5 font-medium"
            >
              First Name <span className="text-[#2D1B1A]/40 font-normal">(optional)</span>
            </label>
            <input
              id="newsletter-firstname"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your given name..."
              disabled={status === 'loading'}
              className="w-full bg-[#FAF6F0] border border-[#E8D5C4] px-4 py-3 text-xs tracking-wider text-[#2D1B1A] placeholder-[#2D1B1A]/40 focus:outline-hidden focus:border-[#6B2C3E] transition-colors disabled:opacity-60"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="newsletter-email"
            className="block text-[11px] uppercase tracking-wider text-[#2D1B1A]/70 mb-1.5 font-medium"
          >
            Email Address <span className="text-[#6B2C3E]">*</span>
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder={placeholder}
            required
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? 'waitlist-newsletter-error' : undefined}
            disabled={status === 'loading'}
            className={`w-full bg-[#FAF6F0] border text-xs tracking-wider text-[#2D1B1A] placeholder-[#2D1B1A]/40 px-4 py-3 focus:outline-hidden transition-colors disabled:opacity-60 ${
              error
                ? 'border-[#9B3B4B] focus:border-[#9B3B4B]'
                : 'border-[#E8D5C4] focus:border-[#6B2C3E]'
            }`}
          />
        </div>
      </div>

      {showConsentCheckbox && (
        <div className="flex items-start gap-3 pt-1">
          <input
            type="checkbox"
            id="waitlist-consent"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (error) setError(null);
            }}
            disabled={status === 'loading'}
            className="mt-1 accent-[#6B2C3E] cursor-pointer"
          />
          <label
            htmlFor="waitlist-consent"
            className="text-[11px] text-[#2D1B1A]/70 leading-relaxed cursor-pointer select-none"
          >
            I wish to receive private allocation invitations and olfactory essays from SANA BEAUTY. I may unsubscribe at any time.
          </label>
        </div>
      )}

      {error && (
        <div
          id="waitlist-newsletter-error"
          role="alert"
          className="flex items-center gap-2 p-3 bg-[#FDF2F4] border border-[#E8BAC2] text-[#8A2437] text-xs font-light tracking-wide animate-in fade-in"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-[#8A2437]" />
          <span>{error}</span>
        </div>
      )}

      <div className="pt-2 text-center">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto bg-[#6B2C3E] hover:bg-[#85344B] active:bg-[#542130] text-[#FAF6F0] px-10 py-4 text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 mx-auto"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#D4A574]" />
              <span>Reserving Allocation...</span>
            </>
          ) : (
            <>
              <span>{buttonText || 'Join The Private Launch List'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4A574]" />
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 text-[10px] text-[#2D1B1A]/50 text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-[#D4A574]" />
        <span>Strict confidentiality. Your information is never transferred or shared.</span>
      </div>
    </form>
  );
};

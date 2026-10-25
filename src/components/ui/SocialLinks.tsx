import React from 'react';
import { ExternalLink } from 'lucide-react';

export interface SocialChannel {
  id: string;
  name: string;
  handle: string;
  url: string;
  description: string;
  ariaLabel: string;
}

export const BRAND_SOCIAL_LINKS: SocialChannel[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@sanabeauty.atelier',
    url: 'https://instagram.com',
    description: 'Visual diaries, olfactory essays & backstage at the Paris studio',
    ariaLabel: 'Follow SANA BEAUTY on Instagram',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    handle: '@sanabeauty',
    url: 'https://pinterest.com',
    description: 'Sensory moodboards, velvet palettes & packaging inspirations',
    ariaLabel: 'Explore SANA BEAUTY moodboards on Pinterest',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@sanabeauty',
    url: 'https://tiktok.com',
    description: 'Tactile texture closeups, application rituals & fragrance layering',
    ariaLabel: 'Watch SANA BEAUTY rituals on TikTok',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: 'SANA BEAUTY Haute Parfumerie',
    url: 'https://youtube.com',
    description: 'Documentaries on Grasse botanical harvests & perfumer conversations',
    ariaLabel: 'Watch SANA BEAUTY atelier films on YouTube',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    handle: '@sanabeauty',
    url: 'https://twitter.com',
    description: 'Whispered announcements, release dispatches & press updates',
    ariaLabel: 'Follow SANA BEAUTY on X',
  },
];

// Clean, high-precision SVG icons for branded luxury representation
export const SocialIcon: React.FC<{
  platform: string;
  className?: string;
}> = ({ platform, className = 'w-4 h-4' }) => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.97.026l.047-.026z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.48 2.71 1.37-.09 2.58-.99 3.01-2.29.21-.57.26-1.18.26-1.78.02-4.83.01-9.66.01-14.49.02-.15.02-.29.02-.44z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'x':
    case 'twitter':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return null;
  }
};

export interface SocialLinksProps {
  variant?: 'minimal' | 'detailed' | 'cards';
  theme?: 'dark' | 'light';
  showLabels?: boolean;
  className?: string;
  columns?: 1 | 2 | 3;
  channels?: string[]; // Optional subset of channels, e.g. ['instagram', 'pinterest', 'youtube']
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'minimal',
  theme = 'dark',
  showLabels = false,
  className = '',
  columns = 2,
  channels,
}) => {
  const activeLinks = channels
    ? BRAND_SOCIAL_LINKS.filter((c) => channels.includes(c.id))
    : BRAND_SOCIAL_LINKS;

  // ========================================================
  // MINIMAL VARIANT (Clean, high-fashion icon row with tooltips)
  // ========================================================
  if (variant === 'minimal') {
    const isDark = theme === 'dark';

    return (
      <nav
        aria-label="Social media channels"
        className={`flex items-center flex-wrap gap-2.5 sm:gap-3 ${className}`}
      >
        {activeLinks.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.ariaLabel}
            title={`${social.name} (${social.handle})`}
            className={`group relative flex items-center justify-center p-2.5 transition-all duration-300 border ${
              isDark
                ? 'bg-[#1C0F13]/80 border-[#6B2C3E]/60 text-[#FAF6F0]/80 hover:text-[#D4A574] hover:border-[#D4A574]/60 hover:bg-[#251419]'
                : 'bg-[#FFFFFF] border-[#E8D5C4] text-[#2D1B1A]/80 hover:text-[#6B2C3E] hover:border-[#6B2C3E]/60 hover:bg-[#FAF6F0]'
            }`}
          >
            <SocialIcon platform={social.id} className="w-4 h-4 transition-transform group-hover:scale-110" />
            
            {showLabels && (
              <span className="ml-2 text-[10px] tracking-widest uppercase font-medium">
                {social.name}
              </span>
            )}
          </a>
        ))}
      </nav>
    );
  }

  // ========================================================
  // DETAILED VARIANT (Editorial cards, ideal for Contact Page)
  // ========================================================
  if (variant === 'detailed') {
    const isDark = theme === 'dark';
    const gridCols =
      columns === 1
        ? 'grid-cols-1'
        : columns === 3
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1 sm:grid-cols-2';

    return (
      <div
        role="region"
        aria-label="Official SANA BEAUTY digital channels"
        className={`space-y-3 ${className}`}
      >
        <div className={`grid ${gridCols} gap-3.5`}>
          {activeLinks.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className={`group p-4 border transition-all duration-300 flex items-start gap-3.5 text-left relative overflow-hidden ${
                isDark
                  ? 'bg-[#1F1215] border-[#6B2C3E]/60 hover:border-[#D4A574] text-[#FAF6F0]'
                  : 'bg-[#FFFFFF] border-[#E8D5C4] hover:border-[#6B2C3E] text-[#2D1B1A] shadow-xs hover:shadow-md'
              }`}
            >
              {/* Subtle accent line on hover */}
              <div
                className={`absolute top-0 left-0 w-0.5 h-full transition-all duration-300 ${
                  isDark
                    ? 'bg-[#D4A574] group-hover:w-1'
                    : 'bg-[#6B2C3E] group-hover:w-1'
                }`}
              />

              <div
                className={`w-9 h-9 shrink-0 flex items-center justify-center transition-colors border ${
                  isDark
                    ? 'bg-[#2D1B1A] border-[#6B2C3E] text-[#D4A574] group-hover:bg-[#6B2C3E] group-hover:text-[#FAF6F0]'
                    : 'bg-[#FAF6F0] border-[#E8D5C4] text-[#6B2C3E] group-hover:bg-[#6B2C3E] group-hover:text-[#FAF6F0]'
                }`}
              >
                <SocialIcon platform={social.id} className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-serif text-sm font-semibold tracking-wide flex items-center gap-1.5">
                    {social.name}
                  </h4>
                  <ExternalLink
                    className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isDark ? 'text-[#D4A574]/60' : 'text-[#6B2C3E]/60'
                    }`}
                  />
                </div>
                <p
                  className={`text-[11px] font-mono tracking-wider ${
                    isDark ? 'text-[#D4A574]' : 'text-[#6B2C3E]'
                  }`}
                >
                  {social.handle}
                </p>
                <p
                  className={`text-[11px] leading-relaxed line-clamp-2 pt-0.5 font-light ${
                    isDark ? 'text-[#FAF6F0]/70' : 'text-[#2D1B1A]/70'
                  }`}
                >
                  {social.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // ========================================================
  // CARDS / COMPACT BADGES VARIANT
  // ========================================================
  const isDark = theme === 'dark';
  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      {activeLinks.map((social) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          className={`inline-flex items-center gap-2 px-3 py-2 text-xs border tracking-wider transition-all duration-200 ${
            isDark
              ? 'bg-[#1F1212] border-[#6B2C3E]/70 text-[#FAF6F0] hover:text-[#D4A574] hover:border-[#D4A574]'
              : 'bg-[#FFFFFF] border-[#E8D5C4] text-[#2D1B1A] hover:text-[#6B2C3E] hover:border-[#6B2C3E]'
          }`}
        >
          <SocialIcon platform={social.id} className="w-3.5 h-3.5" />
          <span className="font-medium text-[11px]">{social.name}</span>
          <span className="text-[10px] opacity-60 font-mono hidden sm:inline">{social.handle}</span>
        </a>
      ))}
    </div>
  );
};

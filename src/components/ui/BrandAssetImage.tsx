import React, { useState } from 'react';
import { ASSET_REGISTRY, getAsset } from '@/src/data/assets.ts';

interface BrandAssetImageProps {
  assetId: string;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export const BrandAssetImage: React.FC<BrandAssetImageProps> = ({
  assetId,
  className = '',
  alt,
}) => {
  const asset = getAsset(assetId);
  const [hasError, setHasError] = useState(false);

  // If a real photo is supplied in the registry and hasn't errored
  if (asset.imageSrc && !hasError) {
    return (
      <img
        src={asset.imageSrc}
        alt={alt || asset.alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${className}`}
      />
    );
  }

  // Render authentic luxury vector art render
  return (
    <div
      className={`relative w-full h-full overflow-hidden flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label={alt || asset.alt}
    >
      {renderVisualVector(assetId)}
    </div>
  );
};

function renderVisualVector(id: string) {
  switch (id) {
    case 'hero_campaign':
      return (
        <div className="relative w-full h-full min-h-[520px] bg-gradient-to-br from-[#2D1B1A] via-[#4A1C29] to-[#6B2C3E] flex items-center justify-center overflow-hidden">
          {/* Ambient lighting reflections */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(212,165,116,0.25)_0%,transparent_60%)]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#6B2C3E]/30 blur-3xl pointer-events-none" />
          
          {/* Editorial Campaign Scene Composition */}
          <div className="relative z-10 w-full h-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-12">
            {/* Left Brand Vignette & Scent Glow */}
            <div className="hidden md:flex flex-col space-y-4 max-w-xs text-left">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4A574]/80 font-medium">
                Official Campaign
              </span>
              <p className="text-sm font-serif italic text-[#FAF6F0]/70 leading-relaxed">
                "The touch of velvet against warm skin. A ritual of unhurried indulgence."
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="h-[1px] w-8 bg-[#C9A961]/40" />
                <span className="text-[10px] tracking-widest uppercase text-[#C9A961]/90">SANA BEAUTY Flagship</span>
              </div>
            </div>

            {/* Center: Silhouette of Model in Burgundy Velvet Holding Velvet Elixir */}
            <div className="relative flex flex-col items-center">
              <svg
                viewBox="0 0 400 480"
                className="w-72 sm:w-84 md:w-96 max-h-[460px] drop-shadow-2xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="dressVelvet" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8C3A52" />
                    <stop offset="40%" stopColor="#6B2C3E" />
                    <stop offset="85%" stopColor="#3F1722" />
                    <stop offset="100%" stopColor="#250E14" />
                  </linearGradient>
                  <linearGradient id="skinGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ECCDB9" />
                    <stop offset="100%" stopColor="#DFB69D" />
                  </linearGradient>
                  <linearGradient id="goldCap" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#C9A961" />
                    <stop offset="50%" stopColor="#F5E8C7" />
                    <stop offset="100%" stopColor="#A88B46" />
                  </linearGradient>
                  <linearGradient id="oilAmber" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E29D4B" />
                    <stop offset="70%" stopColor="#C87A28" />
                    <stop offset="100%" stopColor="#7E4211" />
                  </linearGradient>
                </defs>

                {/* Soft ambient back glow */}
                <ellipse cx="200" cy="240" rx="160" ry="190" fill="url(#dressVelvet)" opacity="0.3" filter="blur(20px)" />

                {/* Model silhouette profile - graceful shoulders & neckline */}
                <path
                  d="M165 140 C175 140, 185 145, 190 155 C195 165, 195 175, 190 185 C185 192, 175 198, 168 200 L172 225 C174 235, 182 245, 200 248 C218 245, 226 235, 228 225 L232 200 C225 198, 215 192, 210 185 C205 175, 205 165, 210 155 C215 145, 225 140, 235 140 C250 140, 260 155, 260 170 C260 185, 250 195, 240 202 L248 240 C270 252, 290 270, 310 300 C325 325, 330 360, 335 410 L65 410 C70 360, 75 325, 90 300 C110 270, 130 252, 152 240 L160 202 C150 195, 140 185, 140 170 C140 155, 150 140, 165 140 Z"
                  fill="url(#skinGlow)"
                  opacity="0.88"
                />

                {/* Velvet gown drapery with sculptural folds */}
                <path
                  d="M140 255 C160 250, 200 254, 260 255 C285 275, 315 315, 325 410 L75 410 C85 315, 115 275, 140 255 Z"
                  fill="url(#dressVelvet)"
                />
                {/* Velvet fold shadows & highlights */}
                <path d="M180 255 Q195 330 190 410" stroke="#3F1722" strokeWidth="6" opacity="0.6" strokeLinecap="round" />
                <path d="M220 255 Q210 330 215 410" stroke="#8C3A52" strokeWidth="4" opacity="0.4" strokeLinecap="round" />
                <path d="M140 290 Q160 350 150 410" stroke="#250E14" strokeWidth="5" opacity="0.7" strokeLinecap="round" />
                <path d="M260 290 Q240 350 250 410" stroke="#8C3A52" strokeWidth="5" opacity="0.4" strokeLinecap="round" />

                {/* Hand cradling the Velvet Elixir bottle */}
                {/* Bottle body */}
                <rect x="180" y="275" width="40" height="75" rx="10" fill="url(#oilAmber)" stroke="#C9A961" strokeWidth="1.5" />
                {/* Oil liquid surface highlight */}
                <path d="M185 285 L185 342 Q200 345 215 342 L215 285 Z" fill="#F4B860" opacity="0.25" />
                {/* Gold collar */}
                <rect x="190" y="267" width="20" height="8" rx="2" fill="url(#goldCap)" />
                {/* Dropper bulb */}
                <path d="M195 267 C195 260, 205 260, 205 267 Z" fill="#2D1B1A" />
                {/* Label on bottle */}
                <rect x="186" y="295" width="28" height="35" rx="2" fill="#FAF6F0" opacity="0.95" />
                <text x="200" y="307" fontSize="4.5" fontFamily="serif" textAnchor="middle" fill="#6B2C3E" fontWeight="bold">SANA</text>
                <text x="200" y="315" fontSize="3.5" fontFamily="sans-serif" textAnchor="middle" fill="#2D1B1A" letterSpacing="0.5">VELVET</text>
                <text x="200" y="321" fontSize="3" fontFamily="sans-serif" textAnchor="middle" fill="#2D1B1A" letterSpacing="0.5">ELIXIR</text>
                <line x1="192" y1="324" x2="208" y2="324" stroke="#C9A961" strokeWidth="0.5" />

                {/* Gentle hand silhouette holding bottle */}
                <path
                  d="M172 320 C170 305, 178 300, 184 300 C186 312, 185 328, 180 338 C176 338, 173 330, 172 320 Z"
                  fill="url(#skinGlow)"
                  opacity="0.95"
                />

                {/* Surrounding collection subtle silhouettes (Scrub jar & Spray) */}
                <rect x="105" y="360" width="48" height="40" rx="6" fill="#F4ECE3" opacity="0.7" stroke="#C9A961" strokeWidth="1" />
                <rect x="103" y="352" width="52" height="9" rx="3" fill="#6B2C3E" />
                <rect x="250" y="340" width="30" height="68" rx="6" fill="#E8D5C4" opacity="0.65" stroke="#C9A961" strokeWidth="1" />
                <rect x="257" y="328" width="16" height="12" rx="2" fill="url(#goldCap)" />
              </svg>

              <div className="mt-2 text-center">
                <span className="text-[11px] tracking-widest uppercase font-serif text-[#FAF6F0]/80">
                  SANA BEAUTY · Velvet Lollipop Collection
                </span>
              </div>
            </div>

            {/* Right: Ritual Scent Signature */}
            <div className="hidden md:flex flex-col items-end space-y-4 max-w-xs text-right">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#C9A961] font-medium">
                The 4-Piece Suite
              </span>
              <p className="text-sm text-[#FAF6F0]/70 font-light">
                Le Bon Bon de Bain · Velvet Elixir · Body Lotion · Body Spray
              </p>
              <span className="text-[11px] text-[#D4A574] italic font-serif">
                Available in the Signature Gift Box
              </span>
            </div>
          </div>
        </div>
      );

    case 'product_scrub':
      return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-b from-[#FAF6F0] to-[#EFE7DE] flex items-center justify-center p-6">
          <svg viewBox="0 0 320 280" className="w-full max-w-[260px] h-auto drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="scrubLid" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#87354C" />
                <stop offset="50%" stopColor="#6B2C3E" />
                <stop offset="100%" stopColor="#431824" />
              </linearGradient>
              <linearGradient id="scrubGlass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#F5ECE2" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#E4D3C2" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="scrubGold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#B8974D" />
                <stop offset="50%" stopColor="#F5E8C7" />
                <stop offset="100%" stopColor="#C9A961" />
              </linearGradient>
            </defs>

            {/* Soft shadow */}
            <ellipse cx="160" cy="245" rx="100" ry="16" fill="#2D1B1A" opacity="0.12" filter="blur(8px)" />

            {/* Jar body */}
            <rect x="75" y="115" width="170" height="115" rx="18" fill="url(#scrubGlass)" stroke="#D4A574" strokeWidth="1.5" />
            
            {/* Whipped sugar granules texture inside jar */}
            <ellipse cx="160" cy="130" rx="72" ry="15" fill="#E8D5C4" opacity="0.6" />
            <circle cx="110" cy="155" r="2" fill="#D4A574" opacity="0.5" />
            <circle cx="130" cy="180" r="1.5" fill="#D4A574" opacity="0.4" />
            <circle cx="170" cy="165" r="2.5" fill="#D4A574" opacity="0.4" />
            <circle cx="210" cy="185" r="2" fill="#D4A574" opacity="0.5" />
            <circle cx="150" cy="205" r="1.5" fill="#D4A574" opacity="0.3" />

            {/* Label */}
            <rect x="95" y="145" width="130" height="65" rx="6" fill="#FAF6F0" stroke="#C9A961" strokeWidth="0.8" />
            <text x="160" y="165" fontSize="8" fontFamily="serif" textAnchor="middle" fill="#6B2C3E" fontWeight="bold" letterSpacing="1">SANA BEAUTY</text>
            <text x="160" y="180" fontSize="9" fontFamily="serif" textAnchor="middle" fill="#2D1B1A" fontStyle="italic">Le Bon Bon de Bain</text>
            <text x="160" y="195" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle" fill="#6B2C3E" letterSpacing="1">BODY SCRUB · STEP 01</text>
            <text x="160" y="204" fontSize="5" fontFamily="sans-serif" textAnchor="middle" fill="#D4A574">200 ML / 6.7 FL. OZ.</text>

            {/* Jar Lid (Velvet Burgundy) */}
            <rect x="68" y="85" width="184" height="34" rx="10" fill="url(#scrubLid)" stroke="#C9A961" strokeWidth="1.5" />
            <line x1="72" y1="102" x2="248" y2="102" stroke="#C9A961" strokeWidth="0.8" opacity="0.7" />

            {/* Cosmetic gold spoon with dollop of whipped scrub on side */}
            <path d="M225 210 Q265 215 285 240" stroke="url(#scrubGold)" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="288" cy="242" rx="14" ry="9" fill="url(#scrubGold)" />
            {/* Texture dollop */}
            <ellipse cx="288" cy="239" rx="10" ry="6" fill="#F4ECE3" stroke="#D4A574" strokeWidth="0.8" />
          </svg>
        </div>
      );

    case 'product_oil':
      return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-b from-[#FAF6F0] to-[#EFE7DE] flex items-center justify-center p-6">
          <svg viewBox="0 0 320 320" className="w-full max-w-[260px] h-auto drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="amberGlass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#DF9B4C" />
                <stop offset="50%" stopColor="#BA7125" />
                <stop offset="100%" stopColor="#6E370E" />
              </linearGradient>
              <linearGradient id="goldCollar" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C9A961" />
                <stop offset="50%" stopColor="#F5E8C7" />
                <stop offset="100%" stopColor="#A88B46" />
              </linearGradient>
            </defs>

            {/* Shadow */}
            <ellipse cx="160" cy="290" rx="60" ry="12" fill="#2D1B1A" opacity="0.14" filter="blur(6px)" />

            {/* Bottle body */}
            <rect x="105" y="110" width="110" height="165" rx="24" fill="url(#amberGlass)" stroke="#C9A961" strokeWidth="1.5" />
            
            {/* Luminous oil highlight */}
            <path d="M115 125 L115 260 Q160 268 205 260 L205 125 Z" fill="#F6BE67" opacity="0.28" />

            {/* Label */}
            <rect x="120" y="145" width="80" height="95" rx="6" fill="#FAF6F0" stroke="#C9A961" strokeWidth="0.8" />
            <text x="160" y="168" fontSize="8" fontFamily="serif" textAnchor="middle" fill="#6B2C3E" fontWeight="bold" letterSpacing="1">SANA BEAUTY</text>
            <text x="160" y="186" fontSize="10" fontFamily="serif" textAnchor="middle" fill="#2D1B1A" fontStyle="italic">Velvet Elixir</text>
            <text x="160" y="202" fontSize="6.5" fontFamily="sans-serif" textAnchor="middle" fill="#6B2C3E" letterSpacing="1">BODY OIL · STEP 02</text>
            <line x1="135" y1="210" x2="185" y2="210" stroke="#D4A574" strokeWidth="0.6" />
            <text x="160" y="222" fontSize="5.5" fontFamily="sans-serif" textAnchor="middle" fill="#2D1B1A">100 ML / 3.4 FL. OZ.</text>

            {/* Bottle shoulder & neck */}
            <path d="M125 110 Q145 95 145 80 L175 80 Q175 95 195 110 Z" fill="url(#amberGlass)" />
            
            {/* Gold collar */}
            <rect x="142" y="65" width="36" height="18" rx="3" fill="url(#goldCollar)" />
            <line x1="144" y1="74" x2="176" y2="74" stroke="#6B2C3E" strokeWidth="0.5" />

            {/* Dropper bulb */}
            <path d="M148 65 C148 45, 172 45, 172 65 Z" fill="#2D1B1A" />
          </svg>
        </div>
      );

    case 'product_lotion':
      return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-b from-[#FAF6F0] to-[#EFE7DE] flex items-center justify-center p-6">
          <svg viewBox="0 0 320 320" className="w-full max-w-[260px] h-auto drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lotionBody" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F5EBE1" />
                <stop offset="100%" stopColor="#E6D7C8" />
              </linearGradient>
              <linearGradient id="pumpGold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C9A961" />
                <stop offset="50%" stopColor="#F5E8C7" />
                <stop offset="100%" stopColor="#A88B46" />
              </linearGradient>
            </defs>

            <ellipse cx="160" cy="292" rx="55" ry="12" fill="#2D1B1A" opacity="0.14" filter="blur(6px)" />

            {/* Bottle body */}
            <rect x="110" y="110" width="100" height="170" rx="20" fill="url(#lotionBody)" stroke="#D4A574" strokeWidth="1.5" />

            {/* Soft pink/peach highlight gradient */}
            <path d="M120 120 L120 270 Q160 275 200 270 L200 120 Z" fill="#F4E5D8" opacity="0.4" />

            {/* Label */}
            <rect x="122" y="150" width="76" height="90" rx="6" fill="#FAF6F0" stroke="#C9A961" strokeWidth="0.8" />
            <text x="160" y="172" fontSize="7.5" fontFamily="serif" textAnchor="middle" fill="#6B2C3E" fontWeight="bold" letterSpacing="1">SANA BEAUTY</text>
            <text x="160" y="190" fontSize="9" fontFamily="serif" textAnchor="middle" fill="#2D1B1A" fontStyle="italic">Velvet Lotion</text>
            <text x="160" y="206" fontSize="6" fontFamily="sans-serif" textAnchor="middle" fill="#6B2C3E" letterSpacing="1">BODY LOTION · STEP 03</text>
            <line x1="135" y1="214" x2="185" y2="214" stroke="#D4A574" strokeWidth="0.6" />
            <text x="160" y="226" fontSize="5" fontFamily="sans-serif" textAnchor="middle" fill="#2D1B1A">250 ML / 8.5 FL. OZ.</text>

            {/* Pump dispenser neck & spout */}
            <rect x="144" y="86" width="32" height="24" rx="2" fill="url(#pumpGold)" />
            {/* Actuator head */}
            <path d="M136 68 L178 68 C182 68, 185 71, 185 75 L185 86 L140 86 C136 86, 134 82, 134 78 Z" fill="url(#pumpGold)" />
            {/* Spout nozzle */}
            <path d="M136 74 L118 78 L118 82 L136 80 Z" fill="url(#pumpGold)" />
          </svg>
        </div>
      );

    case 'product_spray':
      return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-b from-[#FAF6F0] to-[#EFE7DE] flex items-center justify-center p-6">
          <svg viewBox="0 0 320 340" className="w-full max-w-[260px] h-auto drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sprayGlass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#F8EDE3" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#E9D6C4" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="mistGold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C9A961" />
                <stop offset="50%" stopColor="#F5E8C7" />
                <stop offset="100%" stopColor="#A88B46" />
              </linearGradient>
            </defs>

            <ellipse cx="160" cy="315" rx="45" ry="10" fill="#2D1B1A" opacity="0.14" filter="blur(6px)" />

            {/* Slender Flacon */}
            <rect x="122" y="105" width="76" height="200" rx="16" fill="url(#sprayGlass)" stroke="#C9A961" strokeWidth="1.2" />

            {/* Fine fragrance mist dip tube visible inside */}
            <line x1="160" y1="90" x2="160" y2="295" stroke="#D4A574" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Label */}
            <rect x="128" y="155" width="64" height="95" rx="4" fill="#FAF6F0" stroke="#C9A961" strokeWidth="0.8" />
            <text x="160" y="178" fontSize="7" fontFamily="serif" textAnchor="middle" fill="#6B2C3E" fontWeight="bold" letterSpacing="1">SANA BEAUTY</text>
            <text x="160" y="196" fontSize="8.5" fontFamily="serif" textAnchor="middle" fill="#2D1B1A" fontStyle="italic">Velvet Mist</text>
            <text x="160" y="212" fontSize="5.5" fontFamily="sans-serif" textAnchor="middle" fill="#6B2C3E" letterSpacing="0.8">BODY SPRAY · STEP 04</text>
            <line x1="138" y1="220" x2="182" y2="220" stroke="#D4A574" strokeWidth="0.6" />
            <text x="160" y="232" fontSize="5" fontFamily="sans-serif" textAnchor="middle" fill="#2D1B1A">150 ML / 5.1 FL. OZ.</text>

            {/* Atomizer Collar & Cap */}
            <rect x="138" y="70" width="44" height="35" rx="3" fill="url(#mistGold)" stroke="#A88B46" strokeWidth="0.8" />
            <line x1="140" y1="88" x2="180" y2="88" stroke="#6B2C3E" strokeWidth="0.5" />
            
            {/* Delicate mist cloud visualization */}
            <circle cx="115" cy="55" r="3" fill="#D4A574" opacity="0.5" />
            <circle cx="100" cy="45" r="2" fill="#D4A574" opacity="0.4" />
            <circle cx="90" cy="58" r="1.5" fill="#C9A961" opacity="0.3" />
            <circle cx="108" cy="35" r="2.5" fill="#D4A574" opacity="0.3" />
          </svg>
        </div>
      );

    case 'packaging_gift_box_closed':
      return (
        <div className="relative w-full h-full min-h-[320px] bg-gradient-to-br from-[#2D1B1A] to-[#431824] flex items-center justify-center p-6">
          <svg viewBox="0 0 360 300" className="w-full max-w-[320px] h-auto drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="boxVelvet" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8C3A52" />
                <stop offset="50%" stopColor="#6B2C3E" />
                <stop offset="100%" stopColor="#3A141F" />
              </linearGradient>
              <linearGradient id="goldRibbon" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#DFCA91" />
                <stop offset="50%" stopColor="#F5E8C7" />
                <stop offset="100%" stopColor="#B8974D" />
              </linearGradient>
            </defs>

            {/* Shadow */}
            <ellipse cx="180" cy="275" rx="140" ry="18" fill="#000000" opacity="0.4" filter="blur(8px)" />

            {/* Rigid Box Lid */}
            <rect x="40" y="55" width="280" height="200" rx="12" fill="url(#boxVelvet)" stroke="#C9A961" strokeWidth="1.5" />
            <rect x="44" y="59" width="272" height="192" rx="10" fill="none" stroke="#C9A961" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />

            {/* Hot-stamped gold foil logo */}
            <text x="180" y="110" fontSize="16" fontFamily="serif" textAnchor="middle" fill="url(#goldRibbon)" fontWeight="bold" letterSpacing="4">
              SANA BEAUTY
            </text>
            <text x="180" y="132" fontSize="11" fontFamily="serif" textAnchor="middle" fill="#FAF6F0" fontStyle="italic" letterSpacing="1">
              The Velvet Lollipop Collection
            </text>

            {/* Vertical Velvet Ribbon */}
            <rect x="165" y="55" width="30" height="200" fill="#4A1C29" stroke="#C9A961" strokeWidth="0.8" />
            {/* Horizontal Velvet Ribbon */}
            <rect x="40" y="145" width="280" height="30" fill="#4A1C29" stroke="#C9A961" strokeWidth="0.8" />

            {/* Center Hand-Tied Ribbon Bow */}
            <circle cx="180" cy="160" r="14" fill="#6B2C3E" stroke="#C9A961" strokeWidth="1" />
            {/* Bow loops */}
            <path d="M180 160 C155 130, 130 160, 170 160 Z" fill="#8C3A52" stroke="#C9A961" strokeWidth="0.8" />
            <path d="M180 160 C205 130, 230 160, 190 160 Z" fill="#8C3A52" stroke="#C9A961" strokeWidth="0.8" />
            <path d="M175 165 Q160 195 150 205" stroke="#8C3A52" strokeWidth="8" strokeLinecap="round" />
            <path d="M185 165 Q200 195 210 205" stroke="#8C3A52" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'packaging_gift_box_open':
      return (
        <div className="relative w-full h-full min-h-[320px] bg-gradient-to-br from-[#2D1B1A] to-[#431824] flex items-center justify-center p-6">
          <svg viewBox="0 0 380 320" className="w-full max-w-[340px] h-auto drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="openBoxInner" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F9ECE0" />
                <stop offset="50%" stopColor="#ECD7C5" />
                <stop offset="100%" stopColor="#DFBFA7" />
              </linearGradient>
            </defs>

            {/* Shadow */}
            <ellipse cx="190" cy="295" rx="160" ry="18" fill="#000000" opacity="0.45" filter="blur(8px)" />

            {/* Box Outer Rim */}
            <rect x="25" y="45" width="330" height="235" rx="14" fill="#6B2C3E" stroke="#C9A961" strokeWidth="2" />
            {/* Peach Satin Velvet Molded Tray */}
            <rect x="35" y="55" width="310" height="215" rx="10" fill="url(#openBoxInner)" />

            {/* Product Cavities & 4 bottles nestled */}
            {/* 1. Body Scrub Cavity */}
            <rect x="52" y="75" width="62" height="75" rx="8" fill="#D4A574" opacity="0.4" />
            <rect x="56" y="85" width="54" height="55" rx="6" fill="#FAF6F0" stroke="#6B2C3E" strokeWidth="1" />
            <rect x="53" y="78" width="60" height="12" rx="3" fill="#6B2C3E" />
            <text x="83" y="115" fontSize="5" fontFamily="serif" textAnchor="middle" fill="#6B2C3E" fontWeight="bold">SCRUB</text>

            {/* 2. Body Oil Cavity */}
            <rect x="124" y="70" width="55" height="110" rx="8" fill="#D4A574" opacity="0.4" />
            <rect x="130" y="90" width="43" height="80" rx="10" fill="#DF9B4C" stroke="#C9A961" strokeWidth="1" />
            <rect x="144" y="78" width="15" height="12" rx="2" fill="#C9A961" />
            <text x="151" y="132" fontSize="5" fontFamily="serif" textAnchor="middle" fill="#FAF6F0" fontWeight="bold">ELIXIR</text>

            {/* 3. Body Lotion Cavity */}
            <rect x="190" y="70" width="60" height="115" rx="8" fill="#D4A574" opacity="0.4" />
            <rect x="196" y="92" width="48" height="88" rx="8" fill="#FAF6F0" stroke="#D4A574" strokeWidth="1" />
            <rect x="212" y="78" width="16" height="14" rx="2" fill="#C9A961" />
            <text x="220" y="136" fontSize="5" fontFamily="serif" textAnchor="middle" fill="#6B2C3E" fontWeight="bold">LOTION</text>

            {/* 4. Body Spray Cavity */}
            <rect x="260" y="65" width="55" height="125" rx="8" fill="#D4A574" opacity="0.4" />
            <rect x="268" y="88" width="39" height="98" rx="8" fill="#FAF6F0" stroke="#C9A961" strokeWidth="1" />
            <rect x="278" y="74" width="19" height="14" rx="2" fill="#C9A961" />
            <text x="287" y="138" fontSize="5" fontFamily="serif" textAnchor="middle" fill="#6B2C3E" fontWeight="bold">SPRAY</text>

            {/* Embossed Gold Inscription at bottom of tray */}
            <text x="190" y="240" fontSize="9" fontFamily="serif" textAnchor="middle" fill="#6B2C3E" letterSpacing="3" fontWeight="bold">
              SANA BEAUTY
            </text>
            <text x="190" y="255" fontSize="7" fontFamily="sans-serif" textAnchor="middle" fill="#8C3A52" letterSpacing="1">
              THE VELVET LOLLIPOP RITUAL
            </text>
          </svg>
        </div>
      );

    case 'fragrance_marshmallow':
    case 'fragrance_amber':
    case 'fragrance_velvet_silk':
    default:
      return (
        <div className="relative w-full h-full min-h-[220px] bg-gradient-to-br from-[#FAF6F0] via-[#E8D5C4] to-[#D4A574] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#6B2C3E]/10 border border-[#C9A961]/40 flex items-center justify-center mb-3">
            <span className="font-serif italic text-lg text-[#6B2C3E]">S</span>
          </div>
          <span className="text-xs uppercase tracking-widest font-serif text-[#2D1B1A] font-semibold">
            {getAsset(id).name}
          </span>
          <span className="text-[11px] text-[#6B2C3E] italic mt-1 max-w-[200px]">
            {getAsset(id).description}
          </span>
        </div>
      );
  }
}

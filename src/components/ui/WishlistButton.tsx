import React, { useState } from 'react';
import { useWishlist } from '@/src/context/WishlistContext.tsx';
import { Heart } from 'lucide-react';

interface WishlistButtonProps {
  productId: string;
  productName?: string;
  variant?: 'card' | 'detail' | 'icon';
  className?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  productName = 'Product',
  variant = 'card',
  className = '',
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const active = isInWishlist(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleWishlist(productId);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (variant === 'detail') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`px-5 py-4 border transition-all duration-300 flex items-center justify-center gap-2.5 text-xs uppercase tracking-[0.18em] font-medium cursor-pointer ${
          active
            ? 'bg-[#FAF6F0] border-[#6B2C3E] text-[#6B2C3E]'
            : 'bg-[#FFFFFF] hover:bg-[#FAF6F0] border-[#E8D5C4] hover:border-[#6B2C3E] text-[#2D1B1A]'
        } ${className}`}
        aria-label={active ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
        title={active ? 'Preserved in Wishlist' : 'Save to Wishlist'}
      >
        <Heart
          className={`w-4 h-4 transition-transform duration-300 ${
            active ? 'fill-[#6B2C3E] text-[#6B2C3E]' : 'text-[#2D1B1A]/80'
          } ${isAnimating ? 'scale-125' : 'scale-100'}`}
        />
        <span>{active ? 'Preserved in Wishlist' : 'Save to Wishlist'}</span>
      </button>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`p-2 transition-colors cursor-pointer rounded-full ${
          active ? 'text-[#6B2C3E]' : 'text-[#2D1B1A]/60 hover:text-[#6B2C3E]'
        } ${className}`}
        aria-label={active ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
        title={active ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart
          className={`w-4 h-4 transition-transform duration-300 ${
            active ? 'fill-[#6B2C3E] text-[#6B2C3E]' : ''
          } ${isAnimating ? 'scale-125' : 'scale-100'}`}
        />
      </button>
    );
  }

  // Default 'card' floating circular button
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
        active
          ? 'bg-[#FAF6F0] text-[#6B2C3E] border border-[#6B2C3E]/60 ring-1 ring-[#6B2C3E]/20'
          : 'bg-[#FAF6F0]/90 backdrop-blur-xs text-[#2D1B1A]/60 hover:text-[#6B2C3E] hover:bg-[#FAF6F0] border border-[#E8D5C4]/80'
      } ${className}`}
      aria-label={active ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      title={active ? 'Remove from Wishlist' : 'Save to Wishlist'}
    >
      <Heart
        className={`w-4 h-4 stroke-[1.75] transition-transform duration-300 ${
          active ? 'fill-[#6B2C3E] text-[#6B2C3E]' : ''
        } ${isAnimating ? 'scale-125' : 'scale-100'}`}
      />
    </button>
  );
};

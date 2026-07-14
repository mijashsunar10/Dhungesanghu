import React, { useState } from 'react';
import { Image, User, School } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'user' | 'school' | 'gallery';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackType = 'gallery',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    const placeholderClass = `flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-950/20 dark:to-purple-900/10 text-purple-400 dark:text-purple-600 border border-purple-100 dark:border-purple-900/30 min-h-[120px] ${className || ''}`;

    const renderIcon = () => {
      switch (fallbackType) {
        case 'user':
          return <User className="w-10 h-10 stroke-[1.5]" />;
        case 'school':
          return <School className="w-10 h-10 stroke-[1.5]" />;
        case 'gallery':
        default:
          return <Image className="w-10 h-10 stroke-[1.5]" />;
      }
    };

    return (
      <div className={placeholderClass} title={alt || 'Image failed to load'}>
        {renderIcon()}
        {alt && (
          <span className="text-[10px] mt-2 px-3 text-center opacity-70 truncate max-w-[80%] font-light">
            {alt}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};

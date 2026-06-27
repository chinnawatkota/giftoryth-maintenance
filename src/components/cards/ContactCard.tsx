'use client';

import { useState } from 'react';
import { cn } from '@/utils';

const ContactCard = ({
  id,
  icon,
  title,
  detail,
  className,
  type,
  value,
  onClick,
}: Contact.ContactCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getActionText = () => {
    switch (type) {
      case 'email':
        return `Mail to '${value || detail}'`;
      case 'phone':
        return `Call to '${value || detail}'`;
      case 'line':
        return `Message to '${value || detail}'`;
      case 'location':
        return `Open in Maps`;
      default:
        return detail;
    }
  };

  const handleAction = () => {
    switch (type) {
      case 'email':
        window.open(`mailto:${value || detail}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:${value || detail.replace(/[^0-9+]/g, '')}`, '_blank');
        break;
      case 'line':
        // For LINE, you can open LINE app or web version
        window.open(`https://line.me/R/ti/p/${encodeURIComponent(value || detail)}`, '_blank');
        break;
      case 'location': {
        // Open in Google Maps with the address
        const address = encodeURIComponent(value || detail);
        // Try to detect if it's iOS to use Apple Maps, otherwise use Google Maps
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
          window.open(`maps://maps.apple.com/?q=${address}`, '_blank');
        } else {
          window.open(`https://maps.google.com/?q=${address}`, '_blank');
        }
        break;
      }
      default:
        if (onClick) onClick();
        break;
    }
  };

  return (
    <div
      key={id}
      className="group relative flex cursor-pointer items-center space-x-6 py-2 transition-all duration-300 hover:shadow-lg md:px-4 md:py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleAction}
    >
      <div
        className={cn(
          'flex size-8 flex-shrink-0 items-center justify-center rounded-full sm:size-10 md:size-12',
          className
        )}
      >
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="mb-1 text-base font-extralight text-main md:text-lg xl:text-xl">{title}</h3>
        <div className="text-sm font-extralight text-gray-600 md:text-base xl:text-lg">
          {detail}
        </div>
      </div>

      {/* Hover tooltip */}
      <div
        className={cn(
          'absolute right-4 top-1/2 z-10 -translate-y-1/2 transform whitespace-nowrap rounded-lg bg-main-red px-4 py-2 text-white shadow-lg transition-all duration-300',
          isHovered ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-4 opacity-0'
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-light">{getActionText()}</span>
        </div>
        {/* Arrow pointing left */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 transform">
          <div className="h-2 w-2 rotate-45 bg-main-red"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

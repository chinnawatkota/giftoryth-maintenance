'use client';

import { useState } from 'react';

const CopyUrlButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="border border-shadow-black/20 px-3 py-2 text-sm font-light"
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
    >
      {copied ? 'Copied' : 'Copy URL'}
    </button>
  );
};

export default CopyUrlButton;

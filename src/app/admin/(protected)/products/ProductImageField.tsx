'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type ProductImageFieldProps = {
  defaultImage?: string | null;
  inputClass: string;
  labelClass: string;
};

const ProductImageField = ({ defaultImage, inputClass, labelClass }: ProductImageFieldProps) => {
  const [imageUrl, setImageUrl] = useState(defaultImage || '');
  const [previewUrl, setPreviewUrl] = useState(defaultImage || '');

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
      <div className="grid gap-2">
        <span className={labelClass}>Image Preview</span>
        <div className="relative aspect-square w-full overflow-hidden border border-shadow-black/10 bg-main-white">
          {previewUrl ? (
            <Image src={previewUrl} alt="Product preview" fill sizes="220px" className="object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center px-4 text-center text-sm font-light text-shadow-black/40">
              No image
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className={labelClass}>Image URL</span>
          <input
            name="image"
            value={imageUrl}
            onChange={event => {
              setImageUrl(event.target.value);
              setPreviewUrl(event.target.value);
            }}
            className={inputClass}
          />
        </label>

        <label className="grid gap-2">
          <span className={labelClass}>Upload Image Optional</span>
          <input
            name="imageFile"
            type="file"
            accept="image/webp,image/jpeg,image/png"
            onChange={event => {
              const file = event.target.files?.[0];

              if (!file) {
                setPreviewUrl(imageUrl);
                return;
              }

              const objectUrl = URL.createObjectURL(file);
              setPreviewUrl(objectUrl);
            }}
            className="w-full border border-dashed border-shadow-black/20 px-3 py-3 text-sm file:mr-4 file:border-0 file:bg-maroon file:px-4 file:py-2 file:text-main-white"
          />
          <span className="text-xs font-light text-shadow-black/50">
            WEBP, JPG, or PNG. Max 5MB. Uploaded image replaces the Image URL on save.
          </span>
        </label>
      </div>
    </div>
  );
};

export default ProductImageField;

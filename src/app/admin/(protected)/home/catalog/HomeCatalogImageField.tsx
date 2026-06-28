'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type HomeCatalogImageFieldProps = {
  image: string;
  title: string;
  inputClass: string;
  labelClass: string;
};

const HomeCatalogImageField = ({ image, title, inputClass, labelClass }: HomeCatalogImageFieldProps) => {
  const [imageUrl, setImageUrl] = useState(image);
  const [previewUrl, setPreviewUrl] = useState(image);
  const [hasUploadFile, setHasUploadFile] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="grid gap-4 md:grid-cols-[260px_1fr]">
      <div className="grid gap-2">
        <span className={labelClass}>Image Preview</span>
        <div className="relative aspect-square overflow-hidden border border-shadow-black/10 bg-main-white">
          {previewUrl ? (
            <Image src={previewUrl} alt={title || 'Home catalog preview'} fill sizes="260px" className="object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center text-sm font-light text-shadow-black/40">
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
            required={!hasUploadFile}
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
                setHasUploadFile(false);
                setPreviewUrl(imageUrl);
                return;
              }

              setHasUploadFile(true);
              setPreviewUrl(URL.createObjectURL(file));
            }}
            className="w-full border border-dashed border-shadow-black/20 px-3 py-3 text-sm file:mr-4 file:border-0 file:bg-maroon file:px-4 file:py-2 file:text-main-white"
          />
          <span className="text-xs font-light text-shadow-black/50">
            WEBP, JPG, or PNG. Max 10MB. Saved as WEBP up to 1920px wide.
          </span>
        </label>
      </div>
    </div>
  );
};

export default HomeCatalogImageField;

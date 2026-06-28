'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type HomeCoverImageFieldProps = {
  defaultImage: string;
  inputClass: string;
  labelClass: string;
};

const HomeCoverImageField = ({ defaultImage, inputClass, labelClass }: HomeCoverImageFieldProps) => {
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [previewUrl, setPreviewUrl] = useState(defaultImage);
  const [hasUploadFile, setHasUploadFile] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="grid gap-4 md:grid-cols-[320px_1fr]">
      <div className="grid gap-2">
        <span className={labelClass}>Cover Preview</span>
        <div className="relative aspect-[16/9] overflow-hidden border border-shadow-black/10 bg-main-white">
          {previewUrl ? (
            <Image src={previewUrl} alt="Home cover preview" fill sizes="320px" className="object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center px-4 text-center text-sm font-light text-shadow-black/40">
              No image
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className={labelClass}>Cover Image URL</span>
          <input
            name="coverImage"
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
          <span className={labelClass}>Upload Cover Image Optional</span>
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
          <Link href="/admin/media" target="_blank" className="text-xs font-light text-maroon underline-offset-4 hover:underline">
            Open media library
          </Link>
        </label>
      </div>
    </div>
  );
};

export default HomeCoverImageField;

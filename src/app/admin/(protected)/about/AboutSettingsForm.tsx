'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { getAboutSettings } from '@/lib/siteSettings';

type AboutSettings = Awaited<ReturnType<typeof getAboutSettings>>;

type AboutSettingsFormProps = {
  action: (formData: FormData) => Promise<void>;
  settings: AboutSettings;
  inputClass: string;
  labelClass: string;
};

type ImageFieldProps = {
  label: string;
  urlName: string;
  fileName: string;
  altName: string;
  image: string;
  alt: string;
  inputClass: string;
  labelClass: string;
};

const ImageField = ({ label, urlName, fileName, altName, image, alt, inputClass, labelClass }: ImageFieldProps) => {
  const [imageUrl, setImageUrl] = useState(image);
  const [previewUrl, setPreviewUrl] = useState(image);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="grid gap-4">
      <span className={labelClass}>{label}</span>
      <div className="relative aspect-[4/3] overflow-hidden border border-shadow-black/10 bg-main-white">
        {previewUrl ? (
          <Image src={previewUrl} alt={alt || label} fill sizes="520px" className="object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center text-sm font-light text-shadow-black/40">
            No image
          </div>
        )}
      </div>

      <label className="grid gap-2">
        <span className={labelClass}>Image URL</span>
        <input
          name={urlName}
          value={imageUrl}
          required
          onChange={event => {
            setImageUrl(event.target.value);
            setPreviewUrl(event.target.value);
          }}
          className={inputClass}
        />
      </label>

      <label className="grid gap-2">
        <span className={labelClass}>Alt Text</span>
        <input name={altName} defaultValue={alt} className={inputClass} />
      </label>

      <label className="grid gap-2">
        <span className={labelClass}>Upload Image Optional</span>
        <input
          name={fileName}
          type="file"
          accept="image/webp,image/jpeg,image/png"
          onChange={event => {
            const file = event.target.files?.[0];

            if (!file) {
              setPreviewUrl(imageUrl);
              return;
            }

            setPreviewUrl(URL.createObjectURL(file));
          }}
          className="w-full border border-dashed border-shadow-black/20 px-3 py-3 text-sm file:mr-4 file:border-0 file:bg-maroon file:px-4 file:py-2 file:text-main-white"
        />
        <span className="text-xs font-light text-shadow-black/50">
          WEBP, JPG, or PNG. Max 10MB. Saved as WEBP up to 1920px wide.
        </span>
      </label>
    </div>
  );
};

const AboutSettingsForm = ({ action, settings, inputClass, labelClass }: AboutSettingsFormProps) => (
  <form action={action} className="mt-8 grid gap-5 border border-shadow-black/10 bg-white p-5">
    <div className="grid gap-5 lg:grid-cols-2">
      <ImageField
        label="First Image"
        urlName="firstImage"
        fileName="firstImageFile"
        altName="firstAlt"
        image={settings.firstImage}
        alt={settings.firstAlt}
        inputClass={inputClass}
        labelClass={labelClass}
      />
      <ImageField
        label="Second Image"
        urlName="secondImage"
        fileName="secondImageFile"
        altName="secondAlt"
        image={settings.secondImage}
        alt={settings.secondAlt}
        inputClass={inputClass}
        labelClass={labelClass}
      />
    </div>

    <div>
      <button type="submit" className="bg-maroon px-4 py-2 text-sm font-light text-main-white">
        Save About Page
      </button>
    </div>
  </form>
);

export default AboutSettingsForm;


'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { getCustomGiftSettings } from '@/lib/siteSettings';

type CustomGiftSettings = Awaited<ReturnType<typeof getCustomGiftSettings>>;

type CustomGiftSettingsFormProps = {
  action: (formData: FormData) => Promise<void>;
  settings: CustomGiftSettings;
  inputClass: string;
  labelClass: string;
};

type ImageInputProps = {
  label: string;
  urlName: string;
  fileName: string;
  altName: string;
  defaultImage: string;
  defaultAlt: string;
  inputClass: string;
  labelClass: string;
  previewClassName?: string;
};

const ImageInput = ({
  label,
  urlName,
  fileName,
  altName,
  defaultImage,
  defaultAlt,
  inputClass,
  labelClass,
  previewClassName = 'aspect-video',
}: ImageInputProps) => {
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [previewUrl, setPreviewUrl] = useState(defaultImage);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="grid gap-3">
      <span className={labelClass}>{label}</span>
      <div className={`relative overflow-hidden border border-shadow-black/10 bg-main-white ${previewClassName}`}>
        {previewUrl ? (
          <Image src={previewUrl} alt={defaultAlt || label} fill sizes="360px" className="object-cover" />
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
        <input name={altName} defaultValue={defaultAlt} className={inputClass} />
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
      </label>
    </div>
  );
};

const CustomGiftSettingsForm = ({ action, settings, inputClass, labelClass }: CustomGiftSettingsFormProps) => (
  <form action={action} className="mt-8 grid gap-5 border border-shadow-black/10 bg-white p-5">
    <div>
      <h2 className="text-xl font-light">Custom Gift</h2>
      <p className="mt-1 text-sm font-light text-shadow-black/60">
        Manage the title and images for the home page Custom Gift block.
      </p>
    </div>

    <label className="grid gap-2">
      <span className={labelClass}>Section Title</span>
      <input name="customGiftTitle" defaultValue={settings.title} required className={inputClass} />
    </label>

    <div className="grid gap-5 lg:grid-cols-3">
      <ImageInput
        label="Left Image"
        urlName="leftImage"
        fileName="leftImageFile"
        altName="leftAlt"
        defaultImage={settings.leftImage}
        defaultAlt={settings.leftAlt}
        inputClass={inputClass}
        labelClass={labelClass}
      />
      <ImageInput
        label="Right Image 1"
        urlName="rightImage1"
        fileName="rightImage1File"
        altName="rightAlt1"
        defaultImage={settings.rightImage1}
        defaultAlt={settings.rightAlt1}
        inputClass={inputClass}
        labelClass={labelClass}
        previewClassName="aspect-square"
      />
      <ImageInput
        label="Right Image 2"
        urlName="rightImage2"
        fileName="rightImage2File"
        altName="rightAlt2"
        defaultImage={settings.rightImage2}
        defaultAlt={settings.rightAlt2}
        inputClass={inputClass}
        labelClass={labelClass}
        previewClassName="aspect-square"
      />
    </div>

    <div>
      <button type="submit" className="bg-maroon px-4 py-2 text-sm font-light text-main-white">
        Save Custom Gift
      </button>
    </div>
  </form>
);

export default CustomGiftSettingsForm;


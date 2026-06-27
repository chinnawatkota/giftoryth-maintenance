'use client';

import { useState } from 'react';

type ConfirmSubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  message: string;
  title?: string;
};

const ConfirmSubmitButton = ({
  message,
  title = 'Confirm Delete',
  children,
  onClick,
  ...props
}: ConfirmSubmitButtonProps) => {
  const [form, setForm] = useState<HTMLFormElement | null>(null);

  return (
    <>
      <button
        {...props}
        type="button"
        onClick={event => {
          setForm(event.currentTarget.form);
          onClick?.(event);
        }}
      >
        {children}
      </button>

      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-shadow-black/40 px-4">
          <div className="w-full max-w-sm border border-shadow-black/10 bg-white p-5 shadow-lg">
            <h2 className="text-lg font-light text-shadow-black">{title}</h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-shadow-black/70">{message}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="border border-shadow-black/20 px-4 py-2 text-sm font-light"
                onClick={() => setForm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-main-red px-4 py-2 text-sm font-light text-main-white"
                onClick={() => {
                  form.requestSubmit();
                  setForm(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmSubmitButton;

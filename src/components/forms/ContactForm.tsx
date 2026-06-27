'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { cn } from '@/utils';
import { EmailAddress } from '@/constants/contact';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onDownloadCatalog = () => {
    const link = document.createElement('a');
    link.href = 'https://images.giftoryth.com/giftoryth-public/catalogs/GIFTORY_NY_BASKET.pdf';
    link.download = 'GIFTORY NY BASKET.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly.', {
        duration: 4000,
        className: 'font-light text-sm',
        icon: '⚠️',
      });
      return;
    }

    setIsSubmitting(true);

    toast.loading('📤 Thank you for interest in our catalog....', {
      duration: 5000,
      className: 'font-light text-sm',
    });

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        toast.error('Email service is not configured.', {
          duration: 4000,
          className: 'font-light text-sm',
        });
        return;
      }

      const templateParams = {
        from_name: `${formData.name}`,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        email: EmailAddress,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
      });
    } catch (_error) {
      console.log('EmailJS error:', _error);
    } finally {
      setIsSubmitting(false);
      onDownloadCatalog();
    }
  };

  return (
    <div className="shadow-card-light bg-white p-4 md:p-8">
      <div className="mb-8 text-center">
        <h3 className="mb-2 text-lg font-light text-main md:text-xl xl:text-2xl">
          Thank you for interest in our catalog.
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className={cn(
              'w-full border bg-white px-4 py-3 text-sm transition-colors focus:border-main-red focus:outline-none',
              errors.name ? 'border-red-300' : 'border-gray-200'
            )}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className={cn(
              'w-full border bg-white px-4 py-3 text-sm transition-colors focus:border-main-red focus:outline-none',
              errors.email ? 'border-red-300' : 'border-gray-200'
            )}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className={cn(
              'w-full border bg-white px-4 py-3 text-sm transition-colors focus:border-main-red focus:outline-none',
              errors.phone ? 'border-red-300' : 'border-gray-200'
            )}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>
        <div>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Your Company"
            className={cn(
              'w-full border bg-white px-4 py-3 text-sm transition-colors focus:border-main-red focus:outline-none',
              errors.company ? 'border-red-300' : 'border-gray-200'
            )}
          />
          {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'w-full px-6 py-3 font-light text-white transition-all duration-300',
            isSubmitting
              ? 'cursor-not-allowed bg-gray-400'
              : 'cursor-pointer bg-main-red hover:bg-maroon hover:shadow-lg'
          )}
        >
          {isSubmitting ? 'Opening...' : 'Open Catalog'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

import { LineIcon } from '@/components/icons';

export const LineLink = 'https://line.me/R/ti/p/@giftory.th';
export const EmailAddress = 'sales@giftoryth.com';

export const contactInfo = [
  {
    id: 'phone',
    icon: (
      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
    ),
    title: 'Phone',
    detail: '0-2060-2828',
    className: 'bg-main-red',
    type: 'phone' as const,
    value: '020602828',
  },
  {
    id: 'hotline',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6 text-white"
      >
        <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
        <path
          fillRule="evenodd"
          d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: 'Hotline',
    detail: '09-5939-3979',
    className: 'bg-main-red',
    type: 'phone' as const,
    value: '0959393979',
  },
  {
    id: 'line',
    icon: <LineIcon className="size-6 fill-white text-white" />,
    title: 'Line',
    detail: '@giftory.th',
    className: 'bg-main-red',
    type: 'line' as const,
    value: '@giftory.th',
  },
  {
    id: 'email',
    icon: (
      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    ),
    title: 'Email',
    detail: EmailAddress,
    className: 'bg-main-red',
    type: 'email' as const,
    value: EmailAddress,
  },
  {
    id: 'location',
    icon: (
      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: 'Location',
    detail: '46/14 Rim Khlong Bang Kho Road, Bang Kho, Chom Thong, Bangkok 10150',
    className: 'bg-main-red',
    type: 'location' as const,
    value: 'ถนน ริมคลองบางค้อ',
  },
];

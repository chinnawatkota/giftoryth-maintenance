import { Toaster } from 'react-hot-toast';

const CustomToast = () => {
  return (
    <Toaster
      position="top-right"
      gutter={8}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        duration: 5000,
        className: 'font-light text-sm',
        style: {
          background: 'white',
          color: '#374151',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          padding: '16px 20px',
          fontSize: '14px',
          fontWeight: '400',
          maxWidth: '400px',
        },
        success: {
          duration: 5000,
          className: 'font-light text-sm',
          style: {
            background: '#f0fdf4',
            color: '#166534',
            border: '1px solid #bbf7d0',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            padding: '16px 20px',
            fontSize: '14px',
            fontWeight: '400',
            maxWidth: '400px',
          },
          iconTheme: {
            primary: '#16a34a',
            secondary: '#f0fdf4',
          },
        },
        error: {
          duration: 5000,
          className: 'font-light text-sm',
          style: {
            background: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            padding: '16px 20px',
            fontSize: '14px',
            fontWeight: '400',
            maxWidth: '400px',
          },
          iconTheme: {
            primary: '#dc2626',
            secondary: '#fef2f2',
          },
        },
        loading: {
          className: 'font-light text-sm',
          style: {
            background: '#eff6ff',
            color: '#1d4ed8',
            border: '1px solid #bfdbfe',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            padding: '16px 20px',
            fontSize: '14px',
            fontWeight: '400',
            maxWidth: '400px',
          },
          iconTheme: {
            primary: '#1d4ed8',
            secondary: '#eff6ff',
          },
        },
      }}
    />
  );
};

export default CustomToast;

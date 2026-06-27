'use server';

import { clearAdminSession, isAdminPassword, setAdminSession } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';

export const loginAdmin = async (formData: FormData) => {
  const password = String(formData.get('password') || '');

  if (!isAdminPassword(password)) {
    redirect('/admin/login?error=1');
  }

  await setAdminSession();
  redirect('/admin/products');
};

export const logoutAdmin = async () => {
  await clearAdminSession();
  redirect('/admin/login');
};

import { createHash } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_COOKIE = 'giftoryth-admin';
const MAX_AGE = 60 * 60 * 24 * 7;

const getAdminPassword = () => process.env.ADMIN_PASSWORD || '';

const createAdminToken = () =>
  createHash('sha256').update(`giftoryth-admin:${getAdminPassword()}`).digest('hex');

export const isAdminPassword = (password: string) => {
  const adminPassword = getAdminPassword();
  return Boolean(adminPassword) && password === adminPassword;
};

export const setAdminSession = async () => {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, createAdminToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: MAX_AGE,
  });
};

export const clearAdminSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
};

export const requireAdmin = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!getAdminPassword() || token !== createAdminToken()) {
    redirect('/admin/login');
  }
};

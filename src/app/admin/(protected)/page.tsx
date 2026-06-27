import { redirect } from 'next/navigation';

const AdminPage = () => {
  redirect('/admin/products');
};

export default AdminPage;

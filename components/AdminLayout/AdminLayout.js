import Link from 'next/link';

import { Button } from 'components';

export const AdminLayout = ({ children }) => {
  return (
    <>
      <header className="h-20 bg-primary-600 flex items-center justify-between px-4">
        <h2 className="text-white font-bold text-2xl">Ivantique admin</h2>

        <Button variant="primary-btn-contained">Вийти</Button>
      </header>

      <div className="grid grid-cols-[1fr_80%] min-h-[calc(100vh-80px)]">
        <aside className="bg-primary-400 px-4 py-6">
          <nav className="text-white space-y-4">
            <Link href="/admin/my-furniture">Мої меблі</Link>
            <Link href="/admin/add-furniture">Додати мебель</Link>
            <Link href="/admin/add-options">Додати опції</Link>
            <Link href="/admin/edit-slider">Редагувати слайдер</Link>
            <Link href="/admin/edit-categories">Редагувати категорії</Link>
          </nav>
        </aside>

        <section className="px-4 py-6 bg-grey-300">{children}</section>
      </div>
    </>
  );
};

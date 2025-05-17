import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../auth/AuthProvider';

export default function Navbar() {
  const { t } = useTranslation();
  const { logout, user } = useAuth();

  return (
    <header className="bg-white shadow px-8 py-4 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <p className="text-base font-medium text-gray-500">{t('dashboard.description')}</p>
        </div>
        {user && (
          <button
            onClick={logout}
            className="ml-4 px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-red-100 hover:text-red-600 transition font-semibold"
          >
            Logout
          </button>
        )}
      </div>
      <p className="text-sm text-gray-400">{t('navbar.welcome')}</p>
    </header>
  );
}
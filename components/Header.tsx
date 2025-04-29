'use client';
import React from 'react';

interface HeaderProps {
  onRefresh: () => void;
  disabled: boolean;
  loading: boolean;
}
export const Header: React.FC<HeaderProps> = ({ onRefresh, disabled, loading }) => (
    <header className="header">
      <h1>Карточки</h1>
      <button onClick={onRefresh} disabled={disabled}>
        {loading ? 'Загрузка..' : 'Обновить'}
      </button>
    </header>
);

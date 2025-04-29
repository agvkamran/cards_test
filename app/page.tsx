'use client';
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="home-container">
      <Link href="/cards">
        <button>Перейти к карточкам</button>
      </Link>
    </div>
  );
}
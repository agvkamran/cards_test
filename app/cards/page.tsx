'use client';
import React from 'react';
import { useCardsPage } from '../../hooks/useCardsPage';
import { Card as CardComponent } from '../../components/Card';
import { SkeletonCard } from '../../components/SkeletonCard';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function CardsPage() {
  const {
    displayCards,
    isLoading,
    isError,
    isRefreshing,
    buttonDisabled,
    refresh,
  } = useCardsPage();

  return (
    <>
      <Header
        onRefresh={refresh}
        disabled={buttonDisabled || isRefreshing}
        loading={isRefreshing}
      />

      {isError ? (
        <div className="error-container">
          <p>Ошибка при загрузке карточек</p>
          <button onClick={refresh}>Повторить</button>
        </div>
      ) : isLoading || isRefreshing ? (
        <div className="cards-container">
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="cards-container">
          {displayCards.map((card, i) =>
            card.title ? (
              <CardComponent key={i} card={card} />
            ) : (
              <div key={i} className="card empty" />
            )
          )}
        </div>
      )}

      <Footer />
    </>
  );
}
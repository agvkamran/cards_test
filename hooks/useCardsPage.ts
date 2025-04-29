import { useEffect, useRef, useState } from 'react';
import { useCards } from './useCards';
import { Card } from '../types/card';

export function useCardsPage() {
  const { cards, isLoading, isError, isRefreshing, retry } = useCards();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const refresh = async () => {
    if (buttonDisabled) return;
    setButtonDisabled(true);
    retry();
    setTimeout(() => setButtonDisabled(false), 3000);
  };

  const getDisplayCards = (): Card[] => {
    const sorted = cards.slice().sort((a, b) => {
      const aEmpty = !a.title;
      const bEmpty = !b.title;
      if (aEmpty && !bEmpty) return 1;
      if (bEmpty && !aEmpty) return -1;
      const cmp = a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
      return cmp !== 0 ? cmp : a.text.length - b.text.length;
    });
    const top = sorted.slice(0, 7);
    if (top.length < 7) {
      return [...top, ...Array.from({ length: 7 - top.length }).map(() => ({ title: '', text: '' }))];
    }
    return top;
  };

  const displayCards = getDisplayCards();

  return {
    displayCards,
    isLoading,
    isError,
    isRefreshing,
    buttonDisabled,
    refresh,
  };
}
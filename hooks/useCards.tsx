import useSWR from 'swr';
import { Card } from '../types/card';

const API_URL = 'https://node-test-server-production.up.railway.app/api/cards';

interface CardsResponse { cards: Card[] };

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error('Ошибка загрузки');
    return res.json() as Promise<CardsResponse>;
  });

export function useCards() {
  const { data, error, isValidating, mutate } = useSWR<CardsResponse>(
    API_URL,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );

  return {
    cards: data?.cards || [],
    isLoading: !error && !data,
    isError: Boolean(error),
    isRefreshing: isValidating,
    retry: () => mutate(),
  };
}
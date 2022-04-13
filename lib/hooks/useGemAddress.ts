import useSWR from 'swr';
import { getGemAddress } from 'lib/api';

async function fetchGemAddress(ilk?: string) {
  const response = await getGemAddress(ilk);
  return response;
}

export function useGemAddress(ilk?: string) {
  const { data, error } = useSWR(ilk ? `/ilks/${ilk}/gem-address` : null, () => fetchGemAddress(ilk));

  return {
    data,
    loading: !error && !data,
    error
  };
}

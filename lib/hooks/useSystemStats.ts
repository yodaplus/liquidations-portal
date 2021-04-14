import { useAuctions, useUnsafeVaults, useTotalDai } from 'lib/hooks';

export function useSystemStats(): any {
  const { data: auctions, error: auctionsError } = useAuctions();
  const { data: unsafeVaults, error: unsafeVaultsError } = useUnsafeVaults();
  const { data: totalDai, error: totalDaiError } = useTotalDai();

  // return data needed for each field in fieldMap and let format function do the rest
  // ['Active Auctions', 'Inactive Auctions', 'Vaults requiring kick', 'Dai required for Auctions', 'Global max available']
  const data =
    auctions && unsafeVaults && totalDai ? [auctions, auctions, unsafeVaults, auctions, totalDai] : null;
  const error = auctionsError || unsafeVaultsError || totalDaiError;

  return {
    data,
    loading: !error && !data,
    error: error
  };
}

export function useSystemStatsSidebar(ilk: string): any {
  // TODO: pass ilk
  const { data: auctions, error: auctionsError } = useAuctions();
  const { data: unsafeVaults, error: unsafeVaultsError } = useUnsafeVaults();
  const { data: totalDai, error: totalDaiError } = useTotalDai();

  // return data needed for each field in fieldMap and let format function do the rest
  // ['Undercollateralized Vaults', 'Active Auctions', 'Inactive Auctions', 'Dai required for Auctions', 'Limit per collateral available']
  const data =
    auctions && unsafeVaults && totalDai ? [unsafeVaults, auctions, auctions, auctions, 'todo'] : null;
  const error = auctionsError || unsafeVaultsError || totalDaiError;

  return {
    data,
    loading: !error && !data,
    error: error
  };
}

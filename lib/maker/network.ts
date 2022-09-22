import { SupportedNetworks } from '../constants';

export function networkToRpc(network: SupportedNetworks, nodeProvider?: 'infura' | 'alchemy'): string {
  switch (network) {
    case SupportedNetworks.TESTNET:
      return 'http://localhost:2000';
    case SupportedNetworks.APOTHEM:
      return 'https://rpc-apothem.xinfin.yodaplus.net';
    case SupportedNetworks.XINFIN_MAINNET:
      return 'https://rpc.xinfin.yodaplus.net';
    default:
      return 'https://rpc.xinfin.yodaplus.net';
  }
}

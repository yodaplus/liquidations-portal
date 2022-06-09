import { SupportedNetworks } from '../constants';

export function networkToRpc(network: SupportedNetworks, nodeProvider?: 'infura' | 'alchemy'): string {
  switch (network) {
    case SupportedNetworks.MAINNET:
      if (nodeProvider === 'alchemy') {
        return `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`;
      }
      return `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
    case SupportedNetworks.GOERLI:
      return `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`;
    case SupportedNetworks.KOVAN:
      if (nodeProvider === 'alchemy') {
        return `https://eth-kovan.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`;
      }
      return `https://kovan.infura.io/v3/${process.env.INFURA_KEY}`;
    case SupportedNetworks.TESTNET:
      return 'http://localhost:2000';
    case SupportedNetworks.APOTHEM:
      return 'https://rpc-apothem.xinfin.yodaplus.net';
    case SupportedNetworks.XINFIN_MAINNET:
      return 'https://rpc.xinfin.yodaplus.net';
    default:
      if (nodeProvider === 'alchemy') {
        return `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`;
      }
      return `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
  }
}

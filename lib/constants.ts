import BigNumber from 'bignumber.js';

export enum SupportedNetworks {
  TESTNET = 'testnet',
  APOTHEM = 'apothem',
  XINFIN_MAINNET = 'xinfin-mainnet'
}

export const DEFAULT_NETWORK = SupportedNetworks.XINFIN_MAINNET;

export const ETHERSCAN_PREFIXES = {
  [SupportedNetworks.XINFIN_MAINNET]: 'xdc.',
  [SupportedNetworks.APOTHEM]: 'apothem.'
};

type CollateralInfo = {
  name: string;
  ilk: string;
  symbol: string;
  bigNumFormatter: (val: BigNumber) => string;
  cardTexturePng: string;
  bannerPng: string;
  iconSvg: string;
  colorIconName: string;
  decimals: number;
  lpToken?: boolean;
  protocol?: string;
  protocolSvg?: string;
  pool?: string;
  poolSvg?: string;
};

export const COLLATERAL_MAP: Record<string, CollateralInfo> = {
  // 'ETH-A': {
  //   name: 'Ether',
  //   ilk: 'ETH-A',
  //   symbol: 'ETH',
  //   bigNumFormatter: (val: BigNumber): string => val.toFormat(6),
  //   cardTexturePng: '/assets/eth-card-texture.png',
  //   bannerPng: '/assets/eth-banner-texture.png',
  //   iconSvg: '/assets/eth-icon.svg',
  //   colorIconName: 'ethCircleColor',
  //   decimals: 18
  // },
  'XDC-A': {
    name: 'XDC',
    ilk: 'XDC-A',
    symbol: 'XDC',
    bigNumFormatter: (val: BigNumber): string => val.toFormat(6),
    cardTexturePng: '/assets/eth-card-texture.png',
    bannerPng: '/assets/eth-banner-texture.png',
    iconSvg: '/assets/eth-icon.svg',
    colorIconName: 'xdc',
    decimals: 18
  },
  'XDC-B': {
    name: 'XDC',
    ilk: 'XDC-B',
    symbol: 'XDC',
    bigNumFormatter: (val: BigNumber): string => val.toFormat(6),
    cardTexturePng: '/assets/eth-card-texture.png',
    bannerPng: '/assets/eth-banner-texture.png',
    iconSvg: '/assets/eth-icon.svg',
    colorIconName: 'xdc',
    decimals: 18
  },
  'XDC-C': {
    name: 'XDC',
    ilk: 'XDC-C',
    symbol: 'XDC',
    bigNumFormatter: (val: BigNumber): string => val.toFormat(6),
    cardTexturePng: '/assets/eth-card-texture.png',
    bannerPng: '/assets/eth-banner-texture.png',
    iconSvg: '/assets/eth-icon.svg',
    colorIconName: 'xdc',
    decimals: 18
  }
};

export const COLLATERAL_ARRAY = Object.keys(COLLATERAL_MAP).map(currency => ({
  ...COLLATERAL_MAP[currency],
  key: currency
}));

export const TOOLTIP_DICT = {
  ACTIVE_AUCTIONS: 'The number of active auctions in which you can place a bid.',
  INACTIVE_AUCTIONS: 'The number of auctions that ended in which you can no longer place a bid.',
  UNDERCOLLATERALIZED_VAULTS: 'The number of undercollateralized vaults that need to be initiated.',
  DAI_REQUIRED: 'The amount of USXD required to purchase available auction collateral',
  MAX_AVAILABLE: 'Max amount of USXD that can be auctioned.',
  DAI_IN_VAT:
    'The VAT contract is the core vault engine of the Maker Protocol and manages USXD accounting. Depositing USXD into this contract and approving permissions is necessary in order to participate in auctions.',
  DUST_LIMIT: 'Minimum vault debt.',
  AUCTION_PRICE: 'The maximum acceptable price.'
};

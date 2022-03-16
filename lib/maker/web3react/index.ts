// TODO move everything under web3react/ to its own module

import ProviderSubprovider from 'web3-provider-engine/dist/es5/subproviders/provider';
import { InjectedConnector } from 'lib/InjectedConnector';
import { AbstractConnector } from '@web3-react/abstract-connector';

export const Web3ReactPlugin = maker => {
  maker.service('accounts', true).addAccountType('web3-react', ({ library, address }) => {
    const { provider, connector } = library;
    const subprovider = new ProviderSubprovider(provider);
    return { subprovider, address, connector };
  });
};

export const getLibrary = (provider, connector) => ({ provider, connector });

export type ConnectorName = 'XDCPay' | 'WalletConnect' | 'WalletLink' | 'Trezor' | 'Ledger';

export const injectedConnector = new InjectedConnector({
  provider: typeof window !== 'undefined' ? (window as any).ethereum : null
});

export const connectors: Array<[ConnectorName, AbstractConnector]> = [['XDCPay', injectedConnector]];

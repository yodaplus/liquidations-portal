import getMaker from 'lib/maker';
import BigNumber from 'bignumber.js';
import { COLLATERAL_MAP } from 'lib/constants';
import { ethers } from 'ethers';
import wrappedTokenAbi from '@yodaplus/dai/dist/abis/WETH9.json';

//as the number of ilks grows, this calculation will require a lot of calls.
//should think about how to deal with that.
export async function getGlobalMax(): Promise<any> {
  const maker = await getMaker();

  const vals = await Promise.all([
    maker
      .service('liquidation')
      .getHoleAndDirt()
      .then(x => x.diff),
    ...Object.keys(COLLATERAL_MAP).map(c => getHoleAndDirtForIlk(c).then(x => x.diff))
  ]);
  const global = vals[0];
  const ilks = vals.slice(1);
  const ilkSum = ilks.reduce((a, b) => a.plus(b), new BigNumber(0));
  return BigNumber.minimum(global, ilkSum);
}

export async function getUnsafeVaults(ilk: string): Promise<any> {
  const maker = await getMaker();

  const ilkArray = ilk === 'all' ? Object.keys(COLLATERAL_MAP) : [ilk];
  return maker.service('liquidation').getUnsafeVaults(ilkArray);
}

export async function getAllClips(ilk: string): Promise<any> {
  const maker = await getMaker();

  return maker.service('liquidation').getAllClips(ilk);
}

export async function getVatGemBalance(ilk?: string, address?: string): Promise<any> {
  if (!ilk || !address) return;

  const maker = await getMaker();

  return maker
    .service('smartContract')
    .getContract('MCD_VAT')
    .gem(ethers.utils.formatBytes32String(ilk), address);
}

export async function getGemAddress(
  ilk?: string
): Promise<{ address?: string; symbol?: string; decimals?: number }> {
  if (!ilk) return {};

  const suffix = ilk.replace('-', '_');

  const maker = await getMaker();

  const address = await maker.service('smartContract').getContractByName(`MCD_JOIN_${suffix}`).gem();
  const contract = maker
    .service('smartContract')
    .getContractByAddressAndAbi(address, wrappedTokenAbi, { name: 'WrappedToken' });
  const [symbol, decimals] = await Promise.all([contract.symbol(), contract.decimals()]);

  return { address, symbol, decimals };
}

export async function getAccountVatBalance(address?: string): Promise<any> {
  const maker = await getMaker();

  return maker.service('smartContract').getContract('MCD_VAT').dai(address);
}

export async function getAccountTokenBalance(token: string, address?: string): Promise<any> {
  const maker = await getMaker();

  return maker.getToken(token).balanceOf(address);
}

export async function getHoleAndDirtForIlk(ilk: string): Promise<any> {
  const maker = await getMaker();

  return maker.service('liquidation').getHoleAndDirtForIlk(ilk);
}

export async function getAuctionStatus(ilk: string, id: string): Promise<any> {
  const maker = await getMaker();

  return maker.service('liquidation').getStatus(ilk, id);
}

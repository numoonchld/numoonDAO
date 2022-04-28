import { AddressZero } from '@ethersproject/constants';
import sdk from './1-initialize-sdk.js';

(async() => {
  try{
    const tokenAddress = await sdk.deployer.deployToken({
      name: "numoonDAO Governance Token",
      symbol: 'NUMOON',
      primary_sale_recipient: AddressZero,
    })

    console.log('Deployed token module! Module Address: ', tokenAddress)
  }
  catch(error) {
    console.error('Failed to deploy token contract', error)
  }
}) ();
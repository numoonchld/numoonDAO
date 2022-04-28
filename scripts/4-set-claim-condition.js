import sdk from './1-initialize-sdk.js';
import { MaxUint256 } from '@ethersproject/constants';

const editionDrop = sdk.getEditionDrop("0x67e2f1328b7f0e3Ede8f3ea19719C18dE4741Ef1");

(async () => {
  try{
    const claimConditions = [{
      startTime: new Date(),
      maxQuantity: 10_000,
      price: 0,
      quantityLimitPerTransaction: 1,
      waitInSeconds: MaxUint256,
    }]

    await editionDrop.claimConditions.set('0', claimConditions);
    console.log('Successfully set claim condition!')
  }
  catch(error){
    console.error('Failed to set claim condition', error)
  }
})();
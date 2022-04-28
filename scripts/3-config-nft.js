import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const editionDrop = sdk.getEditionDrop("0x67e2f1328b7f0e3Ede8f3ea19719C18dE4741Ef1");

(async () => {
  try {
    await editionDrop.createBatch([{
      name: "Savitr Album Art",
      description: 'This NFT will give you acccess to numoonDAO',
      image: readFileSync('scripts/assets/Savitr.png'),
    }])
    console.log("Created new NFT in the drop!")
  }
  catch (error) {
    console.error('Failed to create new NFT:', error)
  }
})();
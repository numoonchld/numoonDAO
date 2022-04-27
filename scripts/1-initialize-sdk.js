import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import ethers from 'ethers';

// dotenv
import dotenv from 'dotenv';
dotenv.config();

// env variable checks
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
  console.log('Private key not found!');
}
if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === "") {
  console.log('Private key not found!');
}
if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
  console.log('Private key not found!');
}

// instantiate a new ThirdwebSDK entity
const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.PRIVATE_KEY,
    ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
  )
);

(async () => {
  try {
    const address = await sdk.getSigner().getAddress();
    console.log("SDK initalized by address:", address);
  }
  catch (error) {
    console.error("Failed to get apps from the SDK", error);
    process.exit(1);
  }
})();

export default sdk;
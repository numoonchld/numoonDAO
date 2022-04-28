import sdk from "./1-initialize-sdk.js"

// This is our governance contract.
const vote = sdk.getVote("0xe5A824b52F23Ee9C752D73316A61305719d80a67");

// This is our ERC-20 contract.
const token = sdk.getToken("0x8a78Da55C230dB16e392C5486873Cd87E62bCcA1");

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Vote contract can act on token contract"
    );
  } catch (error) {
    console.error(
      "Failed to grant vote contract token contract permissions",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = Math.floor(Number(ownedAmount) / 100 * 90);

    // Transfer 90% of the supply to our voting contract.
    await token.transfer(
      vote.getAddress(),
      percent90
    ); 

    console.log("Transferred " + percent90 + " tokens to vote contract");
  } catch (error) {
    console.error("Failed to transfer tokens to vote contract", error);
  }
})();

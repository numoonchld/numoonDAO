import sdk from "./1-initialize-sdk.js"

const token = sdk.getToken('0x8a78Da55C230dB16e392C5486873Cd87E62bCcA1');

(async() => {
  try{
    const amount = 1_000_000;

    await token.mint(amount)
    const totalSupply = await token.totalSupply()

    console.log('There is now: ', totalSupply.displayValue, '$NUMOON')
  }
  catch (error) {
    console.error('Failed to print tokens!', error)
  }
})();
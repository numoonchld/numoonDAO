import sdk from "./1-initialize-sdk.js"

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({

      name: "numoonDAO Governance Contract",

      voting_token_address: "0x8a78Da55C230dB16e392C5486873Cd87E62bCcA1",

      voting_delay_in_blocks: 0,

      voting_period_in_blocks: 6570,

      voting_quorum_fraction: 0,

      proposal_token_threshold: 0,
    });

    console.log(
      "Deployed vote contract, address:",
      voteContractAddress,
    );
  } catch (error) {
    console.error("Failed to deploy vote contract", error);
  }
})();
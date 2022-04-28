import sdk from "./1-initialize-sdk.js"
import { readFileSync } from 'fs'

(async ()=>{
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      name: 'numoonDAO Membership',
      description: "A DAO for fans of numoonchld",
      image: readFileSync("scripts/assets/spectrumSupport.png"),
      primary_sale_recipient: '0x82cc182794d38cb326C08DD494555C0c2eF1C0d1',
    })

    const editionDrop = sdk.getEditionDrop(editionDropAddress)

    const metadata = await editionDrop.metadata.get()

    console.log("Deployed editionDrop contract to address:", editionDropAddress)
    console.log("editionDrop Metadata: ", metadata)
  }
  catch(error) {
    console.log("Failed to deplo editionDrop contract", error)
  }
})()
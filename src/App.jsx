import { useAddress, useMetamask } from '@thirdweb-dev/react'

const App = () => {

  // thirdweb react hooks for metamask
  const address = useAddress()
  const connectWithMetaMask = useMetamask()
  console.log(address)

  // check for wallet connection
  if (!address) {
    return <div className="landing"> 
      <h1>numoonDAO</h1>
      <button onClick={connectWithMetaMask}> connect your wallet </button>
    </div>
  }
  
  
  return (
    <div className="landing">
      					<a
						href="https://open.spotify.com/artist/3pmjwXacGPNkhiROvf9K9V?si=FgDX8pSRRlCY0WCdXyaKuw"
						target="_blank"
					>
						<img
							className="logo"
							src="https://raw.githubusercontent.com/numoonchld/numoonchld.github.io/master/media/spectrum-support-cropped.png"
							alt="numoonchld"
						/>
					</a>
      <h1>wallet connected!</h1>
    </div>
  );
};

export default App;

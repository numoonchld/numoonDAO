import { useAddress, useMetamask, useEditionDrop, useToken } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';

const App = () => {
	// thirdweb react hooks for metamask
	const address = useAddress();
	const connectWithMetaMask = useMetamask();
	console.log('Address:', address);

	const editionDrop = useEditionDrop(
		'0x67e2f1328b7f0e3Ede8f3ea19719C18dE4741Ef1'
	);
  const token = useToken("0x8a78Da55C230dB16e392C5486873Cd87E62bCcA1")

	const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [memberAddresses, setMemberAddresses] = useState([]);
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);


  useEffect( () => {
    if (!hasClaimedNFT) {return}
    
    const getAllAddresses = async () => {
      try {
        const memberAddresses = await editionDrop.history.getAllClaimerAddresses(0)
        setMemberAddresses(memberAddresses)
        console.log('Member Addresses:', memberAddresses)
      
      } catch (error) {
        console.error('Failed to get member addresses!', error)
      }
    }
      
    getAllAddresses()
    }, [hasClaimedNFT, editionDrop.history])
  
  useEffect( () => {
    if (!hasClaimedNFT) {return}
    const getAllBalances = async () => {
      try {
        const amounts = await token.history.getAllHolderBalances()
        setMemberTokenAmounts(amounts)
        console.log('Member amounts', amounts)
      } catch(error) {
        console.error('Failed to get member balances!', error)
      }
    }

    getAllBalances()
  }, [hasClaimedNFT, token.history])

	useEffect(
		() => {
			if (!address) {
				return;
			}

			const checkBalance = async () => {
				try {
					const balance = await editionDrop.balanceOf(address, 0);
					if (balance.gt(0)) {
						setHasClaimedNFT(true);
						console.log('User has membership NFT');
					} else {
						setHasClaimedNFT(false);
						console.log("User doesn't have membership NFT");
					}
				} catch (error) {
					setHasClaimedNFT(false);
					console.error('Failed to get balance!', error);
				}
			};
			checkBalance();
		},
		[address, editionDrop]
	);

  const memberList = useMemo(()=>{
    return memberAddresses.map((address) => {
      const member = memberTokenAmounts?.find(({holder}) => holder === address)
      console.log(member)
      return {address, tokenAmount: member?.balance.displayValue || '0'}
    })
  },[memberAddresses, memberTokenAmounts])

  
  const mintNFT = async () => {
    try {
      setIsClaiming(true)
      await editionDrop.claim("0", 1)
      console.log(`Membership NFT minted! LinK: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`)
      setHasClaimedNFT(true)
    }
    catch(error) {
      setHasClaimedNFT(false)
      console.error('Minting membership NFT failed!', error)
    }
    finally {
      setIsClaiming(false)
    }
  }

  

  
	// check for wallet connection
	if (!address) {
		return (
			<div className="landing">
				<h1>numoonDAO</h1>
				<button onClick={connectWithMetaMask}> connect your wallet </button>
			</div>
		);
	}

  // check if user has already minted membership NFT
  if (hasClaimedNFT) {
    return <>
      <div className='member-page'>
        <h1>numoonDAO</h1>
        <hr style={{border: '2px solid black', width: '100%'}}/> 
        <h2>Member List</h2>
        <table className='card'>
          <thead>
            <tr>
              <th>Address</th>
              <th>Token Amount</th>
            </tr>
          </thead>
          <tbody>
            {memberList.map((member) => <tr key={member.address}> <td>{member.address}</td><td>{member.tokenAmount}</td></tr>)}
          </tbody>
        </table>
      </div>
    </>
  }

	return (
		<>
			<div className="landing logoHolder">
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
				<h2>Mint your numoonDAO Membership NFT!</h2>
        <button disabled={isClaiming} onClick={mintNFT}>{isClaiming ? <div className='mintingSpinner'/> : `Mint FREE NFT!`}</button>
			</div>
		</>
	);
};

export default App;

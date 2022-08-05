import React, { useEffect, useState } from 'react';
import * as web3 from '@solana/web3.js';
import './App.css';

// Constants
const OWNER_WALLET = 'HkzXgcuUVQXLsKGKnwAzFbsedzn8VmE6hL4MK423LwQR';

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  const [solValue, setSolValue] = useState(0);
  const [buyTransaction, setBuyTransaction] = useState(false);

  // Actions
  const buyTicket = async () => {
    console.log(`Buying ticket... of ${solValue} SOL to ${walletAddress}...`);
    transferSol(walletAddress, OWNER_WALLET, solValue);
  };

  const transferSol = async (from, to, value) => {
    setBuyTransaction(true);
    const connection = new web3.Connection('https://api.mainnet-beta.solana.com', 
                                          { commitment: 'confirmed', 
                                          confirmTransactionInitialTimeout: 60000 });

    const fromPubkey = new web3.PublicKey(from);
    const toPubkey = new web3.PublicKey(to);

    const totalSolPrice = 0.0001;
    const transaction = new web3.Transaction();

    transaction.add(
      web3.SystemProgram.transfer({
        fromPubkey: fromPubkey,
        toPubkey: toPubkey,
        lamports: totalSolPrice * web3.LAMPORTS_PER_SOL,
      }),
    );

    transaction.feePayer = fromPubkey;
    let blockhashObj = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;

    let signature = (await window.solana.signAndSendTransaction(transaction)).signature

    let doWait;
    let confirmation;

    try{
      confirmation = await connection.confirmTransaction(signature);
      
      if (confirmation) {
        console.log("Transaction confirmed!");
      }
      else {
        console.log("Transaction failed!");
      }

      setBuyTransaction(false);
    }
    catch (err){
      console.log(err, signature);
      if(!signature){
        setBuyTransaction(false);
      }
      else{
        console.log(confirmation);
        while(!confirmation){
          console.log(1);
          confirmation = await connection.confirmTransaction(signature);
          doWait = setInterval(async () => {
            console.log(2);
          }, 5000);
        }
      }
    }
  };

  const connectPhantom = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect();
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } 
      else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } 
    catch (error) {
      console.error(error);
    }
  };

  const disconnectPhantom = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          window.solana.disconnect();
          console.log('Disconnected from Phantom');
          setWalletAddress('');
        }
      } 
      else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } 
    catch (error) {
      console.error(error);
    }
  };

  const onSolValueChange = (event) => {
    const { value } = event.target;
    setSolValue(value);
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectPhantom}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          buyTicket();
        }}
      >
        <input
          type="text"
          placeholder="Enter sol amount"
          value={solValue}
          onChange={onSolValueChange}
        />
        <button type="submit" className="cta-button submit-gif-button">
          Buy ticket
        </button>
      </form>
      <div>
        <button
          className="cta-button connect-wallet-button"
          onClick={disconnectPhantom}
        >
          Disconnect
        </button>
      </div>
    </div>
  );

  /*
  // UseEffects
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  */

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 Suscribe lottery!</p>
          <p className="sub-text">
          Welcome to Solana’s first bet-to-win ecosystem✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {/* We just need to add the inverse here! */}
          {walletAddress && renderConnectedContainer()}
        </div>
      </div>
    </div>
  );
};

/*
async buySpins(amount){
			const connection = new web3.Connection(
				process.env.VUE_APP_SOLANA_RPC,
				{
					commitment: 'confirmed',
					confirmTransactionInitialTimeout: 60000
				}
			);

			const fromPubkey = new web3.PublicKey(this.walletId);
			const toPubkey = new web3.PublicKey(process.env.VUE_APP_DUCKS_QUACKPOT_PUBLIC_KEY);

			const totalSolPrice = amount * this.spinPrice;
			const transaction = new web3.Transaction();

			transaction.add(
				web3.SystemProgram.transfer({
					fromPubkey: fromPubkey,
					toPubkey: toPubkey,
					lamports: (totalSolPrice - 0.001) * web3.LAMPORTS_PER_SOL,
				}),
			);

			transaction.add(
				web3.SystemProgram.transfer({
					fromPubkey: fromPubkey,
					toPubkey: toPubkey,
					lamports: 0.001 * web3.LAMPORTS_PER_SOL,
				}),
			);

			transaction.feePayer = fromPubkey;
			let blockhashObj = await connection.getRecentBlockhash();
			transaction.recentBlockhash = blockhashObj.blockhash;

			let signature = await this.signAndSendTransaction(connection, transaction);
			this.buyTransaction = true;

			let doWait;

			let buySpinsFunc = async () => {
				let resp = await this.$options.API.data().Quackpot.buySpins(this.walletId, signature);
				let body = await resp.json();
				if(body.status == "completed") {
					clearInterval(doWait);
					doWait = false;
					this.getWalletInfo();
					this.showToast(`Successful purchase!`);
					this.togglePopup("buySpinsPopup");
					this.buyTransaction = false;
				}
				else if(body.status == "error") {
					clearInterval(doWait);
					doWait = false;
					this.getWalletInfo();
					this.showToast(`Transaction error!`, "error");
					this.togglePopup("buySpinsPopup");
					this.buyTransaction = false;
				}
			}

			let confirmation;

			try{
				confirmation = await connection.confirmTransaction(signature);

				buySpinsFunc();

				doWait = setInterval(async () => {
					buySpinsFunc();
				}, 5000);
			}
			catch (err){
				console.log(err, signature);
				if(!signature){
					this.buyTransaction = false;
					this.showToast(err.message, "error", 0);
				}
				else{
					console.log(confirmation);
					while(!confirmation){
						console.log(1);
						confirmation = await connection.confirmTransaction(signature);

						buySpinsFunc();

						doWait = setInterval(async () => {
							console.log(2);
							buySpinsFunc();
						}, 5000);
					}
				}
			}
		}

*/

export default App;
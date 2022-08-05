import web3 from '@solana/web3.js';

// To generate keypair from secret phrase (mnemonic): 
// solana-keygen recover 'prompt:?key=0/0' -o phantom_wallet.json

class Web3Service {
    static getSecretKey = () => {
        return Uint8Array.from([227,136,109,255,195,17,22,160,244,117,183,42,50,73,48,143,191,109,238,7,176,12,218,159,16,61,58,58,183,202,208,98,249,0,3,141,176,15,90,248,204,131,148,99,78,199,92,102,75,14,139,103,108,39,136,2,141,217,174,214,145,214,57,94]);
      };

    static async test() {
        return;
        console.log('web 3 test...');
        let keypair = web3.Keypair.fromSecretKey(Web3Service.getSecretKey());
        console.log(keypair);
        Web3Service.transferSol(keypair, '5x3BRA2bL64ntMoMQbVeJ7G2rxRDCnuM5Z1y18kD81dW', 0);
    }

    static transferSol = async (from, to, value) => {
        
        console.log(from.publicKey.toString());
        console.log(to);

        const connection = new web3.Connection('https://api.mainnet-beta.solana.com', 
                                              { commitment: 'confirmed', 
                                              confirmTransactionInitialTimeout: 60000 });
        const totalSolPrice = 0.0001;
        const transaction = new web3.Transaction();
    
        transaction.add(
          web3.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: new web3.PublicKey(to),
            lamports: totalSolPrice * web3.LAMPORTS_PER_SOL,
          }),
        );
    
        transaction.feePayer = from.publicKey;
        let blockhashObj = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhashObj.blockhash;
        
        let confirmation;
    
        try{
            let signature = await web3.sendAndConfirmTransaction(
                connection,
                transaction,
                [from],
            );

            console.log('SIGNATURE', signature);
        }
        catch (err){
            console.log(err, signature);
        }       
    }
}

export default Web3Service;
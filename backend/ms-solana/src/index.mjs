import RedisClient from './databases/redis/client.mjs';
import WalletService from './services/wallet.mjs';

try {
    await RedisClient.connect()

    await RedisClient.subscribe('ms-solana', (message) => {
        console.log(message); // 'message'
      });
    
    console.log("Subscribed to ms-solana channel");
}
catch (error) {
    console.log(error);
}

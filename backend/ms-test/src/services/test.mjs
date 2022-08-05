import RedisClient from '../databases/redis/client.mjs';

await RedisClient.connect();

class TestService {
    static async SendToWallet(message){
        await RedisClient.publish('ms-solana', message);
    }
}

export default TestService;
import { createClient } from 'redis';
import CONFIG from '../../config.mjs'; 

const client = createClient({
    url: CONFIG.REDIS.CONNECTIONSTRING
});

client.on('error', (err) => console.log('Redis Client Error', err));

export default client;
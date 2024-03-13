import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  /* creates a redisclient instance */
  constructor() {
    this.client = createClient();
    this.client
      .on('connect', () => {
        console.log('Redis client connected to the server');
        this.connected = true;
      })
      .on('error', (error) => {
        console.log(`Redis client not connected to the server: ${error}`);
        this.connected = false;
      });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    const val = await getAsync(key);
    return val;
  }

  async set(key, val, dur) {
    const setAsync = promisify(this.client.set).bind(this.client);
    await setAsync(key, val, 'EX', dur);
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    await delAsync(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;

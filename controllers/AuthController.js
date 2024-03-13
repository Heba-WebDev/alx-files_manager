const { v4: uuidv4 } = require('uuid');
const sha1 = require('sha1');
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

export default class AuthController {
  // Get the connection
  static async getConnect(req, res) {
    // Get the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Extract the base64 credentials
    const encodedCredentials = authHeader.split(' ')[1];
    // Decode the base64 credentials
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
    const [email, password] = decodedCredentials.split(':');

    // Check if the user exists
    try {
      // Get the users collection
      const usersCollection = await dbClient.usersCollection();
      // Find the user by email and password
      const user = await usersCollection.findOne({ email, password: sha1(password) });

      // If the user does not exist, return an error
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Generate a new token
      const token = uuidv4();
      // Store the token in Redis
      const key = `auth_${token}`;
      // Set the token with a 24-hour expiration
      await redisClient.set(key, user._id.toString(), 86400);

      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error getConnect' });
    }
  }

  // Get the disconnection
  static async getDisconnect(req, res) {
    // Get the token from the header
    const token = req.headers['x-token'];

    // If the token does not exist, return an error
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get the redis key
    const key = `auth_${token}`;
    // Get the user ID from Redis
    const userId = await redisClient.get(key);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Delete the token from Redis
    await redisClient.del(key);
    return res.status(204).end();
  }
}

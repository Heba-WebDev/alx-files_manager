import { ObjectId } from 'mongodb';
import sha1 from 'sha1';
import redisClient from '../utils/redis';

const dbClient = require('../utils/db');

export default class UsersController {
  static async postNew(req, res) {
    // Get the user input
    const { email } = req.body;
    const { password } = req.body;

    // Check for missing fields
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if the user already exists
    const usersCollection = await dbClient.usersCollection();
    try {
      const user = await usersCollection.findOne({ email });
      if (user) {
        return res.status(400).json({ error: 'Already exist' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Create the user
    try {
      const result = await usersCollection.insertOne({
        email,
        password: sha1(password),
      });
      // Return the new user
      return res.status(201).json({ id: result.insertedId.toString(), email });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getMe(req, res) {
    const token = req.headers['x-token'];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const usersCollection = await dbClient.usersCollection();
      const user = await usersCollection.findOne({ _id: ObjectId(userId) });
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      return res.status(200).json({ id: user._id, email: user.email });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

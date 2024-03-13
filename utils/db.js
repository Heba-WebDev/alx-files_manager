const { MongoClient } = require('mongodb');

class DBClient {
  /**
    * Creates an instance of DBClient.
    * @constructor
    */
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(`mongodb://${this.host}:${this.port}`, { useNewUrlParser: true, useUnifiedTopology: true });
    this.connected = false;
  }

  /**
    * Connects to MongoDB using the provided connection string.
    * @returns {Promise<void>}
    */
  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
      this.connected = true;
    } catch (error) {
      console.log('Error connecting to MongoDB: ', error);
    }
  }

  /**
    * Returns true when the connection to Redis is a success otherwise, false
    * @returns {boolean}
    */
  isAlive() {
    return this.connected;
  }

  /**
    * Retrieves the number of documents in the "users" collection.
    * @returns {Promise<number>} The number of documents in the "users" collection.
    */
  async nbUsers() {
    try {
      const db = this.client.db(this.database);
      const usersCollection = db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting users:', error);
      return -1;
    }
  }

  /**
    * Retrieves the number of documents in the "files" collection.
    * @returns {Promise<number>} The number of documents in the "files" collection.
    */
  async nbFiles() {
    try {
      const db = this.client.db(this.database);
      const filesCollection = db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting files:', error);
      return -1;
    }
  }

  /**
   * Returns the users collection
   * @returns {Promise<Collection>} The users collection
   */
  async usersCollection() {
    const db = this.client.db(this.database);
    return db.collection('users');
  }

  /**
   * Returns the files collection
   * @returns {Promise<Collection>} The files collection
   */
  async filesCollection() {
    const db = this.client.db(this.database);
    return db.collection('files');
  }
}

const dbClient = new DBClient();
dbClient.connect(); // Connect to MongoDB client

module.exports = dbClient;

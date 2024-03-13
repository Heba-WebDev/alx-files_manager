import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';
import path from 'path';
import fs from 'fs';
import redisClient from '../utils/redis';

require('dotenv').config();

const dbClient = require('../utils/db');

const FOLDER_PATH = process.env.FOLDER_PATH || '/tmp/files_manager';

export default class FilesController {
  static async postUpload(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const {
      name, type, parentId, isPublic, data,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Missing name' });
    }

    if (!type || !['folder', 'file', 'image'].includes(type)) {
      return res.status(400).json({ error: 'Missing type' });
    }

    if (type !== 'folder' && !data) {
      return res.status(400).json({ error: 'Missing data' });
    }

    if (parentId) {
      const parentFile = await dbClient.filesCollection.findOne({ _id: ObjectId(parentId) });
      if (!parentFile) {
        return res.status(400).json({ error: 'Parent not found' });
      }

      if (parentFile.type !== 'folder') {
        return res.status(400).json({ error: 'Parent is not a folder' });
      }
    }

    try {
      const fileDoc = {
        userId,
        name,
        type,
        isPublic: isPublic || false,
        parentId: parentId || '0',
      };

      if (type === 'folder') {
        const newFolder = await dbClient.createFolder(fileDoc);
        return res.status(201).json(newFolder);
      }

      const fileData = Buffer.from(data, 'base64');
      const fileId = uuidv4();
      const filePath = path.join(FOLDER_PATH, fileId);
      fs.writeFileSync(filePath, fileData);

      fileDoc.localPath = filePath;

      const newFile = await dbClient.createFile(fileDoc);
      return res.status(201).json(newFile);
    } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

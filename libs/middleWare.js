import express from 'express';

/**
 * Add middleware to the app
 * @param {Object} app - The express app
 */
const middleWare = (app) => {
  app.use(express.json());
};

export default middleWare;

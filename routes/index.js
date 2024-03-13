import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const router = (app) => {
  // Check for the status of the API database and Redis
  app.get('/status', AppController.getStatus);
  app.get('/stats', AppController.getStats);

  // Create a new user
  app.post('/users', UsersController.postNew);

  // Authenticate a user
  app.get('/connect', AuthController.getConnect);
  app.get('/disconnect', AuthController.getDisconnect);
  app.get('/users/me', UsersController.getMe);

  // Create new files
  app.post('/files', FilesController.postUpload);
};

export default router;

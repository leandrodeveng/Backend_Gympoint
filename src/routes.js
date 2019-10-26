import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddlewares from './app/middlewares/auth';
import StudentController from './app/controllers/StudentController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

export default routes;

import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddlewares from './app/middlewares/auth';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddlewares); // Middleware de Autenticação
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
routes.post('/plans', PlanController.create);

export default routes;

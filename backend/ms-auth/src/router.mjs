import { Router } from 'express';
import AuthController from './controllers/auth.mjs';

const routes = Router()

routes
    .route('/user/signin')
    .post(AuthController.SignIn);

routes.route('/user/signup')
    .post(AuthController.SignUp);

export default routes;
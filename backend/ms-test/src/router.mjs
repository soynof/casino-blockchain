import { Router } from 'express';
import TestController from './controllers/test.mjs';
import AuthMiddlware from '../../common/middlewares/auth.mjs';

const routes = Router()

routes
    .route('/test')
    .get(TestController.Get);

routes
.route('/testprotected')
.get(AuthMiddlware.JWTFromCookie, TestController.Get);
export default routes;
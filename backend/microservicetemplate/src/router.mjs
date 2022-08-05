import { Router } from 'express';
import AnyController from './controllers/anycontroller.mjs';
import AuthMiddlware from '../../common/middlewares/auth.mjs';

const routes = Router()

routes
    .route('/anyservice')
    .get(AnyController.Get);

routes
.route('/anyserviceprotected')
.get(AuthMiddlware.JWTFromCookie, AnyController.Get);
export default routes;
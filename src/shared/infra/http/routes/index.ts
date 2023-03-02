import { Router } from 'express';

import userRoutes from '@modules/user/infra/http/routes';

const routes = Router();

routes.use(userRoutes);

export default routes;

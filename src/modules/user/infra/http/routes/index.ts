import { Router } from 'express';

import movieRouter from './movie.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/movie', movieRouter);

export default routes;

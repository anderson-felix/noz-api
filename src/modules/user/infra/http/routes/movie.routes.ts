import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { getPagingHandler } from '@shared/infra/http/middlewares/getPagingHandler';
import MovieController from '../controllers/MovieController';
import auth from '../middlewares/auth';

const movieRouter = Router();

movieRouter.post(
  '/create',
  auth.admin,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().trim().required(),
      director: Joi.string().trim().required(),
      genres: Joi.array().items(Joi.string().required()).required(),
      actors: Joi.array().items(Joi.string().required()).required(),
    },
  }),
  MovieController.create,
);

movieRouter.post(
  '/rating/:movie_id',
  auth.user,
  celebrate({
    [Segments.PARAMS]: {
      movie_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      rating: Joi.number().required(),
    },
  }),
  MovieController.rating,
);

movieRouter.get('/list', auth, getPagingHandler(), MovieController.list);

movieRouter.patch(
  '/update/:movie_id',
  auth.admin,
  celebrate({
    [Segments.PARAMS]: {
      movie_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().trim(),
      director: Joi.string().trim(),
      genres: Joi.array().items(Joi.string().required()),
      actors: Joi.array().items(Joi.string().required()),
    },
  }),
  MovieController.update,
);

movieRouter.delete(
  '/delete/:movie_id',
  auth.admin,
  celebrate({
    [Segments.PARAMS]: {
      movie_id: Joi.string().uuid().required(),
    },
  }),
  MovieController.delete,
);

export default movieRouter;

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMovieService from '@modules/user/services/movie/CreateMovieService';
import ListMoviesService from '@modules/user/services/movie/ListMoviesService';
import DeleteMovieService from '@modules/user/services/movie/DeleteMovieService';
import UpdateMovieService from '@modules/user/services/movie/UpdateMovieService';
import RatingMovieService from '@modules/user/services/movie/RatingMovieService';

export default class MovieController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const createMovie = container.resolve(CreateMovieService);

    const user = await createMovie.execute({ user: req.user, ...req.body });

    return res.json(user);
  }

  public static async rating(req: Request, res: Response): Promise<Response> {
    const ratingMovie = container.resolve(RatingMovieService);

    const user = await ratingMovie.execute({
      movie_id: req.params.movie_id,
      user: req.user,
      ...req.body,
    });

    return res.json(user);
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const updateMovie = container.resolve(UpdateMovieService);

    const user = await updateMovie.execute({
      user: req.user,
      movie_id: req.params.movie_id,
      ...req.body,
    });

    return res.json(user);
  }

  public static async list(req: Request, res: Response): Promise<Response> {
    const listMovies = container.resolve(ListMoviesService);

    const user = await listMovies.execute(req.paging);

    return res.json(user);
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const deleteMovie = container.resolve(DeleteMovieService);

    await deleteMovie.execute(req.user, req.params.movie_id);

    return res.sendStatus(204);
  }
}

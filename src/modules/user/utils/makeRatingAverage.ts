import Movie from '@modules/movie/infra/typeorm/entities/Movie';

type FuncType = (movie: Movie) => number;

export const makeRatingAverage: FuncType = movie => {
  const { rating: ratingSum } = movie.user_relations.reduce(
    (acc, value) => ({
      ...acc,
      rating: acc.rating + value.rating,
    }),
    {} as any,
  );

  const allRating = movie.user_relations.length;

  return Math.round(ratingSum / allRating || 1);
};

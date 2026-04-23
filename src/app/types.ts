export type Genres = {
  id: number;
  name: string;
};

export type SearchMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // could also be Date if parsed
  softcore: boolean;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

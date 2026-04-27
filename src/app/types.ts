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

export type TrailerResult = {
  iso_639_1: string; // хэл (e.g. "en")
  iso_3166_1: string; // улс (e.g. "US")
  name: string; // video гарчиг
  key: string; // YouTube video ID
  site: string; // "YouTube"
  size: number; // 720, 1080 гэх мэт
  type: string; // "Trailer", "Teaser" гэх мэт
  official: boolean; // албан ёсны эсэх
  published_at: string; // ISO date string
  id: string; // video ID
};

export type MovieVideosResponse = {
  id: number; // movie ID (e.g. 550)
  results: TrailerResult[];
};
export type SimilarMovie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string; // could be refined to Date if parsed
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
export type CastMember = {
  adult: boolean;
  gender: number; // 0 = unknown, 1 = female, 2 = male (TMDB convention)
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  job: string;
};

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string | null;

  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;

  budget: number;

  genres: {
    id: number;
    name: string;
  }[];

  homepage: string | null;
  id: number;
  imdb_id: string | null;

  origin_country: string[];

  original_language: string;
  original_title: string;
  overview: string;

  popularity: number;

  poster_path: string | null;

  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];

  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];

  release_date: string; // can be converted to Date if needed

  revenue: number;
  runtime: number | null;

  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];

  status: string; // e.g. "Released"
  tagline: string | null;

  title: string;
  video: boolean;

  vote_average: number;
  vote_count: number;
};

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

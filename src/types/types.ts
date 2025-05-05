export type TypeRecentEpisodes = {
  currentPage: number;
  hasNextPage: boolean;
  results: [];
  totalPages: number;
};

export type TypeScheduleAnime = {
  id: string;
  title: string;
  japaneseTitle: string;
  url: string;
  airingEpisode: string;
  airingTime: string;
};

export type SpotLight = {
  id: string
  title: string
  japaneseTitle: string
  banner: string
  rank: number
  url: string
  type: string
  duration: string
  releaseDate: string
  quality: string
  sub: number
  dub: number
  episodes: number
  description: string
}

export type Anime = {
  id: string;
  title: string;
  image: string;
  description: string;
  type: string;
  url: string;
  hasSub: boolean;
  hasDub: boolean;
  genres: string[];
  status: string;
  season: string;
  totalEpisodes: number;
  episodes: Episodes[];
  recentEpisode: string;
  relatedAnime: RelatedAnime[];
  recommendations: Recommendation[];
};

export type Recommendation = {
  id: string;
  title: string;
  image: string;
  duration: string;
  japaneseTitle: string;
  type: string;
  nsfw: boolean;
  sub: number;
  dub: number;
  episodes: number;
};

export type RelatedAnime = {
  id: string;
  title: string;
  image: string;
  japaneseTitle: string;
  type: string;
  sub: number;
  dub: number;
  episodes: number;
};

export type Episodes = {
  id: string;
  number: number;
  title: string;
  isFiller: boolean;
  isSubbed: boolean;
  isDubbed: boolean;
  url: string;
};

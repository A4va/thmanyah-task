export type iTunesSearchResponse<T = iTunesMediaResult> = {
  resultCount: number;
  results: T[];
};

export type iTunesMediaResult = {
  wrapperType?: string;
  kind?: string;
  artistId?: number;
  collectionId?: number;
  trackId?: number;
  artistName?: string;
  collectionName?: string;
  trackName?: string;
  collectionCensoredName?: string;
  trackCensoredName?: string;
  artistViewUrl?: string;
  collectionViewUrl?: string;
  trackViewUrl?: string;
  previewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  collectionPrice?: number;
  trackPrice?: number;
  releaseDate?: string;
  collectionExplicitness?: string;
  trackExplicitness?: string;
  discCount?: number;
  discNumber?: number;
  trackCount?: number;
  trackNumber?: number;
  trackTimeMillis?: number;
  country?: string;
  currency?: string;
  primaryGenreName?: string;
  isStreamable?: boolean;
  description?: string;
  bundleId?: string;
  version?: string;
  minimumOsVersion?: string;
  trackContentRating?: string;
  longDescription?: string;
  feedUrl?: string;
};

export type MediaType =
  | 'movie'
  | 'podcast'
  | 'music'
  | 'musicVideo'
  | 'audiobook'
  | 'shortFilm'
  | 'tvShow'
  | 'software'
  | 'ebook'
  | 'all';

export type EntityByMedia = {
  movie: 'movieArtist' | 'movie';
  podcast: 'podcastAuthor' | 'podcast';
  music: 'musicArtist' | 'musicTrack' | 'album' | 'musicVideo' | 'mix' | 'song';
  musicVideo: 'musicArtist' | 'musicVideo';
  audiobook: 'audiobookAuthor' | 'audiobook';
  shortFilm: 'shortFilmArtist' | 'shortFilm';
  tvShow: 'tvEpisode' | 'tvSeason';
  software: 'software' | 'iPadSoftware' | 'macSoftware';
  ebook: 'ebook';
  all: string;
};

export type AttributeByMedia = {
  movie:
    | 'actorTerm'
    | 'genreIndex'
    | 'descriptionTerm'
    | 'directorTerm'
    | 'releaseYearTerm'
    | 'ratingTerm'
    | 'shortFilmTerm'
    | 'producerTerm';
  podcast:
    | 'titleTerm'
    | 'languageTerm'
    | 'authorTerm'
    | 'genreIndex'
    | 'descriptionTerm';
  music:
    | 'mixTerm'
    | 'genreIndex'
    | 'artistTerm'
    | 'composerTerm'
    | 'albumTerm'
    | 'ratingIndex'
    | 'songTerm';
  musicVideo:
    | 'artistTerm'
    | 'genreIndex'
    | 'albumTerm'
    | 'ratingIndex'
    | 'songTerm';
  audiobook: 'titleTerm' | 'authorTerm' | 'genreIndex';
  shortFilm:
    | 'shortFilmTerm'
    | 'genreIndex'
    | 'descriptionTerm'
    | 'actorTerm'
    | 'directorTerm'
    | 'producerTerm';
  tvShow:
    | 'tvEpisodeTerm'
    | 'genreIndex'
    | 'descriptionTerm'
    | 'tvSeasonTerm';
  software: 'softwareDeveloper';
  ebook:
    | 'titleTerm'
    | 'authorTerm'
    | 'genreIndex'
    | 'descriptionTerm';
  all: string;
};

type EntityFor<M extends MediaType> = EntityByMedia[M];
type AttributeFor<M extends MediaType> = AttributeByMedia[M];

export type iTunesSearchParams<M extends MediaType = 'all'> = {
  term: string;
  country?: string;
  media?: M;
  entity?: EntityFor<M>;
  attribute?: AttributeFor<M>;
  limit?: number;
  lang?: 'en_us' | 'ja_jp';
  version?: 1 | 2;
  explicit?: 'Yes' | 'No';
  callback?: string;
};
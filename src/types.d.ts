export interface ISeriesList {
  id: number;
  title: string;
  genre: IGenre;
  possible_age: string;
  poster_url: string;
  is_interested: boolean;
}

export interface ISeriesDetail {
  id: number;
  title: string;
  genre: IGenre;
  possible_age: string;
  director: IDirector[];
  actor: IActor[];
  poster_url: string;
  video: IVideo[];
  summary: string;
}

export interface IReview {
  user: IUser;
  text: string;
  rating: number;
}

export interface IUser {
  pk: number;
  name: string;
  avator: string;
  username: string;
  is_adult: boolean;
  coupon: ICoupon;
}

export interface IActor {
  actor_name: string;
  photo_url: string;
}

export interface IVideo {
  pk: number;
  sub_title: string;
  episode: string;
  runtime: number;
  video_url: string;
  thumbnail_url: string;
}

export interface IDirector {
  director_name: string;
  photo_url: string;
}

export interface IGenre {
  genre_name: string;
}

export interface IWishlist {
  id: number;
  user: number;
  series: [];
}

export interface ICoupon {
  pk: number;
  kind_name: string;
  price: string;
  HDR: boolean;
  quality: boolean;
  mobile: boolean;
}

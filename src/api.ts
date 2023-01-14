import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

/** 모든 시리즈 불러오기 */
export const getSeries = () =>
  axiosInstance.get("series/").then((response) => response.data);

/** 드라마장르 시리즈 불러오기 */
export const getGenreDramaSeries = () =>
  axiosInstance.get("series/drama").then((response) => response.data);

/** 특정 시리즈 디테일 불러오기 */
export const getSeriesDetail = ({ queryKey }: QueryFunctionContext) => {
  const [, seriesPk] = queryKey;
  return axiosInstance
    .get(`series/${seriesPk}`)
    .then((response) => response.data);
};

/** 특정 시리즈 리뷰 불러오기 */
export const getSeriesReviews = ({ queryKey }: QueryFunctionContext) => {
  const [, seriesPk] = queryKey;
  return axiosInstance
    .get(`series/${seriesPk}/reviews`)
    .then((response) => response.data);
};

/** 로그인한 유저의 정보 */
export const getMe = () =>
  axiosInstance.get(`users/me`).then((response) => response.data);

interface INameVariables {
  name: string;
}
/** 유저 name 변경 */
export const updateName = ({ name }: INameVariables) =>
  axiosInstance
    .put(
      `users/me`,
      { name },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface IUserCreateVariables {
  username: string;
  password: string;
  name: string;
}

/** 유저 Sign Up */
export const createUser = (variables: IUserCreateVariables) =>
  axiosInstance
    .post(`users/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

/** 유저 로그아웃 */
export const logOut = () =>
  axiosInstance
    .post("users/log-out", null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}

/** 유저 로그인 */
export const usernameLogIn = (
  { username, password }: IUsernameLoginVariables // mutation함수는 single argument가 아닌 objects를 가져온다. ({})
) =>
  axiosInstance
    .post(
      `users/log-in`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface IPlusVariables {
  userPk: number;
  seriesPk: number;
}

/** 시리즈 보고싶어요 토글 */
export const plusToggle = ({ userPk, seriesPk }: IPlusVariables) =>
  axiosInstance
    .put(
      `wishlists/${userPk}/series/${seriesPk}`,
      { userPk, seriesPk },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

/** 시리즈 보고싶어요 보관함 불러오기 */
export const getWishlist = () =>
  axiosInstance.get(`wishlists/`).then((response) => response.data);

/** 보고싶어요 보관함 생성 */
export const createWishlist = () =>
  axiosInstance
    .post(`wishlists/`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IVideoPk {
  videoPk?: number;
}

/** 재생 횟수 증가 */
export const countPlayCount = ({ videoPk }: IVideoPk) =>
  axiosInstance
    .put(`videos/${videoPk}`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

interface IReviewData {
  seriesPkVariable: string;
  text: string;
  rating: number;
}

/** 리뷰 쓰기 */
export const reviewPost = ({ seriesPkVariable, text, rating }: IReviewData) =>
  axiosInstance
    .post(
      `series/${seriesPkVariable}/reviews`,
      { text, rating },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

interface IAdultVariable {
  is_adult: boolean;
}

/** 성인 인증 */
export const adultPost = ({ is_adult }: IAdultVariable) =>
  axiosInstance
    .put(
      `users/me`,
      { is_adult },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

/** 쿠폰 사용 여부 */
export const couponGet = () =>
  axiosInstance.get("users/coupon").then((response) => response.data);

interface IUserVariables {
  user: number;
}

/** 쿠폰 결제 */
export const couponPost = ({ user }: IUserVariables) =>
  axiosInstance
    .post(
      `users/coupon`,
      { user },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

/** github 로그인 */
export const githubLogIn = (code: string) =>
  axiosInstance
    .post(
      `/users/github`, // users/github url에 code를 post
      { code }, // code 넣어둠 backend에서 request.data를 통해 접근 가능
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const getUploadURL = () =>
  axiosInstance
    .post(`/users/cf-get-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUploadImageVarialbes {
  file: FileList;
  uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVarialbes) => {
  const form = new FormData();
  form.append("file", file[0]);
  return axios
    .post(uploadURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export interface ICreatePhotoVariables {
  avator: string;
}

export const createPhoto = ({ avator }: ICreatePhotoVariables) =>
  axiosInstance
    .put(
      `users/me`,
      { avator },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

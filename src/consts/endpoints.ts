export const BASE_URL = "http://localhost:3000";

export const Endpoints = {
  GET_POSTS: `${BASE_URL}/forum`,
  CREATE_POST: `${BASE_URL}/forum`,
  DELETE_POST: `${BASE_URL}/forum`,
  CREATE_POST_REPLY: `${BASE_URL}/forum/{}/add-reply`,
  GET_USER_INFO: `${BASE_URL}/users/info`,
  POST_CREATE_USER: `${BASE_URL}/signup`,
  POST_LOGIN_USER: `${BASE_URL}/login`,
  POST_LOGOUT_USER: `${BASE_URL}/logout`,
};

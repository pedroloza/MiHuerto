import axios from "axios";
import { handleError } from "../utils/utils";

export const postFetcher = (
  url: string,
  data: any,
  token?: string,
  hideError?: boolean,
  stopRedirect?: boolean,
) => {
  return axios
    .post(`${process.env.API_URL}${url}`, data, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((res) => res?.data)
    .catch((e) => {
      return handleError(e, hideError, stopRedirect);
    });
};

export const patchFetcher = (url: string, data: any, token?: string) => {
  return axios
    .patch(`${process.env.API_URL}${url}`, data, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((e) => {
      return handleError(e);
    });
};

export const getFetcher = (
  url: string,
  addLevel?: boolean,
  token?: string,
  stopRedirect?: boolean,
) => {
  return axios
    .get(`${process.env.API_URL}${url}`, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((res) => (addLevel ? res.data?.data : res.data))
    .catch((e) => {
      return handleError(e, true, stopRedirect);
    });
};

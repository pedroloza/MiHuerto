import { getFetcher, patchFetcher, postFetcher } from "../api";
import { getToken } from "../../utils/utils";
import { IProtection } from "../../Types/IProtection";

export const getAllPlague = (page: number = 1, rowPerPage: number = 10) => {
  return getFetcher(
    `/plague/getAllPlague?page=${page}&limit=${rowPerPage}`,
    false,
    getToken(),
  );
};

export const getOnePlague = (id: string) => {
  return getFetcher(`/plague/getOnePlague?id=${id}`, false, getToken());
};

export const createPlague = (data: IProtection) => {
  delete data._id;
  return postFetcher(`/plague/createPlague`, data, getToken());
};

export const updatePlague = (id: string, data: IProtection) => {
  return patchFetcher(`/plague/editPlague?id=${id}`, data, getToken());
};

export const removePlague = (id: string) => {
  return postFetcher(`/plague/removePlague/${id}`, {}, getToken());
};

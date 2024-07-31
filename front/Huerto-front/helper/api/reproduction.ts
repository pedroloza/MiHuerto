import { getFetcher, patchFetcher, postFetcher } from "../api";
import { getToken } from "../../utils/utils";
import { IProtection } from "../../Types/IProtection";

export const getAllReproductions = (
  page: number = 1,
  rowPerPage: number = 10,
) => {
  return getFetcher(
    `/reproduction/getAllReproductions?page=${page}&limit=${rowPerPage}`,
    false,
    getToken(),
  );
};

export const getOneReproduction = (id: string) => {
  return getFetcher(
    `/reproduction/getOneReproduction?id=${id}`,
    false,
    getToken(),
  );
};

export const createReproduction = (data: IProtection) => {
  delete data._id;
  return postFetcher(`/reproduction/createReproduction`, data, getToken());
};

export const editReproduction = (id: string, data: IProtection) => {
  return patchFetcher(
    `/reproduction/editReproduction?id=${id}`,
    data,
    getToken(),
  );
};

export const removeReproduction = (id: string) => {
  return postFetcher(`/reproduction/removeReproduction/${id}`, {}, getToken());
};

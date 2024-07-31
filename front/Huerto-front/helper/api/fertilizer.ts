import { getFetcher, patchFetcher, postFetcher } from "../api";
import { getToken } from "../../utils/utils";
import { IProtection } from "../../Types/IProtection";

export const getAllFertiliser = (page: number = 1, rowPerPage: number = 10) => {
  return getFetcher(
    `/fertiliser/getAllFertiliser?page=${page}&limit=${rowPerPage}`,
    false,
    getToken(),
  );
};

export const getAllFertiliserWithoutPagination = () => {
  return getFetcher(
    `/fertiliser/getAllFertiliserWithoutPagination`,
    false,
    getToken(),
  );
};

export const getOneFertiliser = (id: string) => {
  return getFetcher(`/fertiliser/getOneFertiliser?id=${id}`, false, getToken());
};

export const createFertiliser = (data: IProtection) => {
  delete data._id;
  return postFetcher(`/fertiliser/createFertiliser`, data, getToken());
};

export const updateFertiliser = (id: string, data: IProtection) => {
  return patchFetcher(`/fertiliser/editFertiliser?id=${id}`, data, getToken());
};

export const removeFertilizer = (id: string) => {
  return postFetcher(`/fertiliser/removeFertiliser/${id}`, {}, getToken());
};

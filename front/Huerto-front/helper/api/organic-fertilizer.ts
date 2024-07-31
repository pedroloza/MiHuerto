import { getFetcher, patchFetcher, postFetcher } from "../api";
import { getToken } from "../../utils/utils";
import { IProtection } from "../../Types/IProtection";

export const getAllOrganicFertiliser = (
  page: number = 1,
  rowPerPage: number = 10,
) => {
  return getFetcher(
    `/fertiliser/getAllOrganicFertiliser?page=${page}&limit=${rowPerPage}`,
    false,
    getToken(),
  );
};

export const getAllOrganicFertiliserWithoutPagination = () => {
  return getFetcher(
    `/fertiliser/getAllOrganicFertiliserWithoutPagination`,
    false,
    getToken(),
  );
};

export const getOneOrganicFertiliser = (id: string) => {
  return getFetcher(
    `/fertiliser/getOneOrganicFertiliser?id=${id}`,
    false,
    getToken(),
  );
};

export const createOrganicFertiliser = (data: IProtection) => {
  delete data._id;
  return postFetcher(`/fertiliser/createOrganicFertiliser`, data, getToken());
};

export const editOrganicFertiliser = (id: string, data: IProtection) => {
  return patchFetcher(
    `/fertiliser/editOrganicFertiliser?id=${id}`,
    data,
    getToken(),
  );
};

export const removeOrganicFertiliser = (id: string) => {
  return postFetcher(
    `/fertiliser/removeOrganicFertiliser/${id}`,
    {},
    getToken(),
  );
};

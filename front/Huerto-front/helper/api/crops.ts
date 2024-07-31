import { getFetcher, patchFetcher, postFetcher } from "../api";
import { getToken } from "../../utils/utils";
import { ICrop } from "../../Types/ICrop";
export const getAllCultivation = (
  page: number = 1,
  rowPerPage: number = 10,
) => {
  return getFetcher(
    `/cultivation/getAllCultivation?page=${page}&limit=${rowPerPage}`,
    false,
    getToken(),
  );
};

export const getAllCultivationActive = () => {
  return getFetcher(`/cultivation/getAllCultivationActive`, false, getToken());
};

export const getOneCultivation = (id: string) => {
  return getFetcher(
    `/cultivation/getOneCultivation?id=${id}`,
    false,
    getToken(),
  );
};

export const getOneCrop = (id: string) => {
  return getFetcher(`/cultivation/getOneCrop?id=${id}`, false, getToken());
};

export const createCultivation = (data: ICrop) => {
  delete data._id;
  return postFetcher(`/cultivation/createCultivation`, data, getToken());
};

export const updateCultivation = (id: string, data: ICrop) => {
  return patchFetcher(
    `/cultivation/editCultivation?id=${id}`,
    data,
    getToken(),
  );
};

export const getCultivesPerUser = (id: string) => {
  return getFetcher(`/user-cultivation/list/${id}`, false, getToken());
};

export const removeCultivation = (id: string) => {
  return postFetcher(`/cultivation/removeCultivation/${id}`, {}, getToken());
};

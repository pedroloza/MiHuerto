import { getFetcher, postFetcher } from "../api";
import { getToken } from "../../utils/utils";

export const getAdministrators = () => {
  return getFetcher(`/user/administrators`, false, getToken());
};
export const getCropsByUser = () => {
  return getFetcher(`/user-cultivation/list-report`, false, getToken());
};

export const getCultiveById = (id: string) => {
  return postFetcher(
    `/user/getCultivationByUserCultivation?idCultivation=${id}`,
    {},
    getToken(),
  );
};

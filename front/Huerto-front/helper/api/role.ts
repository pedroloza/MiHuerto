import { getFetcher, patchFetcher, postFetcher } from "../api";
import { getToken } from "../../utils/utils";
import { IRol } from "../../Types/IRol";

export const getRoles = (page: number = 1, rowPerPage: number = 10) => {
  return getFetcher(
    `/role/getAllRoles?page=${page}&limit=${rowPerPage}`,
    false,
    getToken(),
  );
};

export const getActiveRoles = () => {
  return getFetcher(`/role/getRolesActives`, false, getToken());
};

export const createRole = (data: IRol) => {
  delete data._id;
  return postFetcher(`/role/createRole`, data, getToken());
};

export const updateRole = (id: string, data: IRol) => {
  return patchFetcher(`/role/editRole?id=${id}`, data, getToken());
};

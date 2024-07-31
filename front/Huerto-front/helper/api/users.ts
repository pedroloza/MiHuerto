import { getFetcher, patchFetcher, postFetcher } from "../api";
import { getToken } from "../../utils/utils";
import { UserProps } from "../../Types/IUser";

export const getUsersPortal = (page: number, rowPerPage: number) => {
  return getFetcher(
    `/user/getAllUsers?page=${page}&limit=${rowPerPage}&isMovil=false`,
    false,
    getToken(),
  );
};

export const getUsersApp = (page: number = 1, rowPerPage: number = 10) => {
  return getFetcher(
    `/user/getAllUsers?page=${page}&limit=${rowPerPage}&isMovil=true`,
    false,
    getToken(),
  );
};

export const getOneUser = (id: string) => {
  return getFetcher(`/user/getOneUser?id=${id}`, false, getToken());
};

export const createUser = (data: UserProps) => {
  return postFetcher(
    "/user/createUser",
    { ...data, dateCreated: new Date() },
    getToken(),
  );
};

export const setStatusUser = (id: string) => {
  return patchFetcher(`/user/editState?id=${id}`, {}, getToken());
};

export const updateUser = (id: string, data: UserProps) => {
  return patchFetcher(`/user/editUser?id=${id}`, data, getToken());
};

export const getDashboardData = () => {
  return getFetcher(`/user/dashboard`, false, getToken());
};

export const getMe = () => {
  return getFetcher(`/user/me`, false, getToken());
};

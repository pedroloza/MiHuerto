import { postFetcher } from "../api";
import { Login, Response } from "../../Types/Types";

export const postLogin = (data: any) => {
  return postFetcher("/user/signIn/", data, "", false, true);
};

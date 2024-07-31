import { createContext } from "react";
import { User } from "../../Types/Types";

interface UserContextProps {
  user: User;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const initialUserState = {
  _id: "",
  username: "",
  password: "",
  idRole: {
    _id: "",
    name: "",
  },
};

export const UserContext = createContext<UserContextProps>({
  user: initialUserState,
  login: (user, token) => {},
  logout: () => {},
});

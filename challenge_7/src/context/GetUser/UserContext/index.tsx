import { createContext } from "react";

interface UserContext {
  email: string;
  username: string;
  image_url: string;
  role: string;
  created_at: string
}

const defaultValue: UserContext = {
  email: '',
  username: '',
  image_url: '',
  role: '',
  created_at: '',
};

const UserContext = createContext<UserContext>(defaultValue);

export default UserContext;
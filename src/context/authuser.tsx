import { createContext } from "react";
import { UserContextType } from "../type/user";

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;

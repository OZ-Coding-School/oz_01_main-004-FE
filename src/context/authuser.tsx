import { createContext } from "react";
import { UserContextType } from "../type/user";

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;

import { createContext } from "react"

const authContext = createContext<string | null>(null)

export default authContext

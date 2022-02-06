import { createContext } from "react";


const CurrentUserContext = createContext({
    id: 0,
    isManager: false,
    fname: "",
    lname: "",
    username: ""
  })

export default CurrentUserContext;
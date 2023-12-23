import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext()

export function userContextProvider({children}) {
     const [user, setUser] = useState(null)
     useEffect(() => {
          if(!user){
               axios.get('/home').then(({data}) => {
                    setUser(data)
               })
          }
     }, [])

     return(
          <UserContext.Provider>
               {children}
          </UserContext.Provider>
     )
}


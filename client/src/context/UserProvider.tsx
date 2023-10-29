import React, { createContext, useState, PropsWithChildren } from 'react'

const UserContext = createContext({});

export interface UseUserProps {
    user?: any
    setUser?: React.Dispatch<React.SetStateAction<{}>>
  }

export const UserProvider = ({ children }:PropsWithChildren ) => {
    const [user, setUser] = useState<UseUserProps>()
    console.log(user);
    
    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>

    )
}

export default UserContext
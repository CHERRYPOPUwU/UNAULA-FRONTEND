import { createContext, useContext, useState } from "react";
import { createUserRequest } from "../api/users";


const UserContext = createContext();

export const useUsers = ()=>{
    const context = useContext(UserContext);

    if(!context){
        throw new Error(" useUsers must be used within a UserProvider");
    }

    return context;
}

export function UserProvider({ children }){

    const [users, setUsers] = useState([]);

    const createUser = async (user)=>{
        const res = await createUserRequest(user);
        console.log(res)
    }

    return (
        <UserContext.Provider value={{
            users,
            createUser
        }}>
            {children}
        </UserContext.Provider>
    )
}
import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async(inputs)=>{
        const res = await axios.post("http://localhost:8800/api/auth/login",inputs)
        document.cookie=`access_token=${res.data.access_token};`
        console.log("cookies:",document.cookie)
        console.log("user", res.data)
        setCurrentUser(res.data)
    }

    const logout = async()=>{
        const res = await axios.post("http://localhost:8800/api/auth/logout")
        console.log(res)
        if(res.data.signout){
            document.cookie="access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
            setCurrentUser(null)
            localStorage.clear();
        }
    }

    useEffect(()=>{
      //  localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser])

    return(
        <AuthContext.Provider value={{currentUser, login, logout}}>
        {children}

        </AuthContext.Provider>
    )
}
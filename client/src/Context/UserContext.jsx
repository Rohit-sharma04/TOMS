import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [role,setRole]=useState(null);
    useEffect(() => {
        const getUserData = async()=>{
            let userData = await axios.get("api/auth/getuserData");
            console.log("data", userData.data);
            if (userData.data.success) {
                console.log("user data", userData.data)
                setName(userData.data.data.name);
                setEmail(userData.data.data.email);
                setRole(userData.data.data.role);
            } else {
                toast.info(userData.data.message);
            }
        }
        getUserData();
        
    })
    return (
        <UserContext.Provider value={{ name, setName, email, setEmail ,role}}>
            {children}
        </UserContext.Provider>
    );
};
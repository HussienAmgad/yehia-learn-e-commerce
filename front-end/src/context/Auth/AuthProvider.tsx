import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

interface jwtPayload {
    firstName: string;
    lastName: string;
    email: string;
}

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('userToken'))

    useEffect(() => {
        const localtoken = localStorage.getItem('userToken');
        if (!localtoken) {
            console.log("notfount token");
        }
        if (localtoken) {
            setToken(localtoken);
            const decoded = jwtDecode<jwtPayload>(localtoken);
            setName(decoded.firstName+decoded.lastName);
            setEmail(decoded.email);
            console.log(decoded);
            
        }
    }, []);

    const login = (name: string, email: string, token: string) => {
        setName(name);
        setEmail(email);
        setToken(token);
        localStorage.setItem("userToken", token);
    }

    return (
        <AuthContext.Provider value={{ name, email, token, login }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;
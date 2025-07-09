import { useContext } from "react"
import { AdminAuthContext } from "../context/AdminAuth"
import { Navigate } from "react-router-dom";    

export const AdminRequiredAuth = ({children}) => {
    const {user} = useContext(AdminAuthContext);

    if (!user) {
        return <Navigate to={`/admin/login`}/>
    }

    return children;
}
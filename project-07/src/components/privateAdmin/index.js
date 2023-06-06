import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

function PrivateAdmin () {
    const token = getCookie('tokenAdmin'); 
    return (
        <>
            {token ? (<Outlet/>): (<Navigate to ='/loginAdmin'/>) }
        </>
    )
}
export default PrivateAdmin;
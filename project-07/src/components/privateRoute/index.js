import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

function PrivateRoute () {
    const token = getCookie('token'); 
    return (
        <>
            {token ? (<Outlet/>): (<Navigate to ='/login'/>) }
        </>
    )
}
export default PrivateRoute;
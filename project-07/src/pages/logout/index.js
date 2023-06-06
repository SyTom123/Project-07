import { deleteAllCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Reload  from "../../actions/reload";

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = () => {
        deleteAllCookie();
        dispatch(Reload());
        navigate('/login');
        window.location.reload();
        
    }
  return (
    <>
      <p onClick={handleClick}>
        Logout
      </p>
    </>
  );
}
export default Logout;

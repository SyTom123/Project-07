import { deleteAllCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

function LogoutAdmin() {
  const navigate = useNavigate();
  const handleClick = async() => {
    deleteAllCookie();
    navigate("/loginAdmin");
    window.location.reload();
  };
  return (
    <>
    <div className="headerAdmin__buttonLogout">
      <Button
        onClick={handleClick}
        icon={<LogoutOutlined />}
        style ={{fontWeight: "500", marginLeft: "10px"}}
      >
        Logout 
      </Button>
    </div>
      <div className="headerAdmin__buttonLogout--responsive">
      <Button
        onClick={handleClick}
        icon={<LogoutOutlined />}
        style ={{fontWeight: "500", marginLeft: "10px"}}
      >
      </Button>
    </div>
    </>
  );
}
export default LogoutAdmin;

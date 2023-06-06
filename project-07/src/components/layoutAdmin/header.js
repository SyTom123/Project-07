import { Button } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assess/image/logo.png";
import LogoutAdmin from "../../pages/logoutAdmin";
import {
  MenuFoldOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
function Header(props) {
  const { collapsed, setCollasped } = props;
  const handleClick = () => {
    setCollasped(!collapsed);
  };
  return (
    <>
      <div className="layoutAdmin__header">
        <header className="headerAdmin">
          <div
            className={
              "headerAdmin__logo " +
              (collapsed ? "headerAdmin__logo--fold" : "")
            }
          >
            {!collapsed && (
              <div className="headerAdmin__logoImg">
                <img src={logo} alt="Logo" />
              </div>
            )}
            <p>Admin</p>
          </div>
          <div className="headerAdmin__icons">
            <Button
              onClick={handleClick}
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined
                    style={{
                      fontWeight: "500",
                      color: "#fff",
                      fontSize: "20px",
                    }}
                  />
                ) : (
                  <MenuFoldOutlined
                    style={{
                      fontWeight: "500",
                      color: "#fff",
                      fontSize: "20px",
                    }}
                  />
                )
              }
              type="ghost"
            ></Button>
          </div>
          <div className="headerAdmin__button">
            <Link to="/">
              <Button
                icon={<HomeOutlined />}
                type="primary"
                style={{ fontWeight: "500" }}
              >
                Home Page
              </Button>
            </Link>
            <LogoutAdmin />
          </div>
        </header>
      </div>
    </>
  );
}
export default Header;

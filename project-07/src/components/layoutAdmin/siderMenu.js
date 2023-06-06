import { Menu } from "antd";
import { DatabaseOutlined, ShopOutlined , DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
function SiderMenu() {
  const location = useLocation();
  const items = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">DashBoard</Link>,
    },
    {
      key: "/adminInfo",
      icon: <UserOutlined /> ,
      label: <Link to="/adminInfo">Info Admin</Link>,
    },
    {
      key: "/inventory",
      icon: <DatabaseOutlined />,
      label: <Link to="/inventory">Inventory</Link>,
    },
    {
      key: "/userPurchase",
      icon: <ShopOutlined />,
      label: <Link to="admin/userPurchase">Orders</Link>,
    },
  ];
  return (
    <>
      <Menu
        items={items}
        mode="inline"
        defaultOpenKeys={["admin"]}
        defaultSelectedKeys={[location.pathname]}
        theme={"light"}
      />
    </>
  );
}
export default SiderMenu;

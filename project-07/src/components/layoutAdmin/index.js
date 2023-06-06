import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import "./layoutAdmin.scss";
import { Outlet } from "react-router-dom";
import SiderMenu from "./siderMenu";
import Header from "./header";

function LayoutAdmin() {
  const [collapsed, setCollasped] = useState(false);

  return (
    <>
      <Layout className="layoutAdmin">
        <Header collapsed={collapsed} setCollasped={setCollasped} />
        <Layout>
          <Sider
            theme="light"
            className="layoutAdmin__sider"
            collapsed={collapsed}
            width={"230px"}
            breakpoint="md"
            onBreakpoint={(broken) => setCollasped(broken)}
          >
            <SiderMenu />
          </Sider>
          <Content className="layoutAdmin__content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default LayoutAdmin;

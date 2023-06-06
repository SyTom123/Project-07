import HeaderDefault from "./header";
import { Outlet} from "react-router-dom"
import './layoutDefault.scss'
import { Content, Footer } from "antd/es/layout/layout";
import { Layout } from "antd";
import Authen from "../../actions/authen";
import { useDispatch } from "react-redux";
import FooterDefault from "./footer";

function LayoutDefault() {
  const dispatch = useDispatch();
  const handleClickAuthen = (value)=> {
    dispatch(Authen(value))
  }
  
  return (
    <>
      <Layout className="layout" >
        <div className="layout__header" >
            <HeaderDefault />
        </div>
        <Content className="layout__content" onClick={() => handleClickAuthen(true)}>
            <Outlet/>
        </Content>
        <Footer className='layout__footer'>
         <FooterDefault/>
        </Footer>
      </Layout>
    </>
  );
}
export default LayoutDefault;

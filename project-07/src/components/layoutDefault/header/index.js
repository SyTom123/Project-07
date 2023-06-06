import Container from "../../container";
import "./header.scss";
import Sibar from "./sibar";
import HeaderMain from "./headerMain";
import HeaderNav from "./headerNav";

function HeaderDefault() {
  return (
    <>
      <div className="headerDefault">
        <Container>
          <HeaderNav />
          <HeaderMain />
        </Container>
        <Sibar />
      </div>
    </>
  );
}
export default HeaderDefault;

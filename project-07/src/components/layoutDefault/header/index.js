import "./header.scss";
import Sibar from "./sibar";
import HeaderMain from "./headerMain";
import HeaderNav from "./headerNav";

function HeaderDefault() {
  return (
    <>
      <div className="headerDefault">
          <HeaderNav />
          <HeaderMain />
          <Sibar />
      </div>
    </>
  );
}
export default HeaderDefault;

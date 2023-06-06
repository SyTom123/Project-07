import { Col } from "antd";
import { useState } from "react";

function OfficeItem(props) {
  const { path1, path2, title } = props;
  const [path, setPath]= useState(path2);

  const handleMouseEnter = ()=> {
    setPath(path1);
  }

  const handleMouseOut = ()=> {
    setPath(path2);
  }
  return (
    <>
      <Col xxl={4} xl={4} lg={4} md={4} sm={8} sx={24} >
        <div className = "about__officeItem">
            <div className="about__officeImg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOut}>
                <img src={path} alt="" />
            </div>
            <p >{title}</p>
        </div>
      </Col>
    </>
  );
}
export default OfficeItem;

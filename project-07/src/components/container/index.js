import { Col, Row } from "antd";
function Container(props) {
    const {children} = props;
  return (
    <>
      <Row  justify={"center"}>
        <Col xxl={22} xl={22} lg={22} md={22} sm={20} sx={20}>
          {children}
        </Col>
      </Row>
    </>
  );
}
export default Container;

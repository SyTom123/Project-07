import { Carousel, Col, Row } from "antd";
import "./banner.scss";
import slider1 from "../../assess/image/slider1.jpg";
import slider2 from "../../assess/image/slider2.png";
import slider3 from "../../assess/image/slider3.jpg";
import slider4 from "../../assess/image/slider4.jpg";
import slider5 from "../../assess/image/slider5.jpg";
import slider6 from "../../assess/image/slider6.jpg";
import slider7 from "../../assess/image/slider7.jpg";
import slider8 from "../../assess/image/slider8.png";
import promotion1 from "../../assess/image/promotion1.png";
import promotion2 from "../../assess/image/promotion2.png";

function Banner() {
  return (
    <>
      <div className="banner">
        <Row gutter={[10, 10]}>
          <Col xxl={16} xl={16} lg={16} md={16} sm={16} sx={24}>
            <Carousel autoplay={true} className="banner__left">
              <div>
                <img src={slider1} alt="" />
              </div>
              <div>
                <img src={slider2} alt="" />
              </div>
              <div>
                <img src={slider3} alt="" />
              </div>
              <div>
                <img src={slider4} alt="" />
              </div>
              <div>
                <img src={slider5} alt="" />
              </div>
              <div>
                <img src={slider6} alt="" />
              </div>
              <div>
                <img src={slider7} alt="" />
              </div>
              <div>
                <img src={slider8} alt="" />
              </div>
            </Carousel>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={24}>
            <div className="banner__right">
              <div>
                <img src={promotion1} alt="" />
              </div>
              <div>
                <img src={promotion2} alt="" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Banner;

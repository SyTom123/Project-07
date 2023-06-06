import Container from "../../components/container";
import banner from "../../assess/image/about_banner.jpg";
import people1 from "../../assess/image/people1.png";
import people2 from "../../assess/image/people2.png";
import people3 from "../../assess/image/people3.png";
import office1 from "../../assess/image/office_1.png";
import office2 from "../../assess/image/office_2.png";
import office3 from "../../assess/image/office_3.png";
import office4 from "../../assess/image/office_4.png";
import office5 from "../../assess/image/office_5.png";
import office6 from "../../assess/image/office_6.png";
import office7 from "../../assess/image/office_7.png";
import office8 from "../../assess/image/office_8.png";
import office9 from "../../assess/image/office_9.png";
import office10 from "../../assess/image/office_10.png";
import office11 from "../../assess/image/office_11.png";
import office12 from "../../assess/image/office_12.png";
import office13 from "../../assess/image/office_13.png";
import office14 from "../../assess/image/office_14.png";
import office15 from "../../assess/image/office_15.png";
import office16 from "../../assess/image/office_16.png";
import office17 from "../../assess/image/office_17.png";
import office18 from "../../assess/image/office_18.png";
import office19 from "../../assess/image/office_19.png";
import office20 from "../../assess/image/office_20.png";
import office21 from "../../assess/image/office_21.png";
import office22 from "../../assess/image/office_22.png";
import office23 from "../../assess/image/office_23.png";
import office24 from "../../assess/image/office_24.png";

import "./about.scss";
import { Col, Row } from "antd";
import OfficeItem from "./officeItem";
import GoBack from "../../components/goBack";
function About() {
  window.scrollTo({
    top: 0,
    // behavior: "smooth",
  });
  return (
    <>
      <Container>
        <div className="about">
          <div className="about__banner">
            <img src={banner} alt="Banner" />
          </div>
          <div className="about__body">
            <h2 className="about__title">
              SnapUP là nền tảng thương mại điện tử hàng đầu tại Đông Nam Á và
              Đài Loan.
            </h2>
            <p>
              Ra mắt năm 2015, nền tảng thương mại SnapUp được xây dựng nhằm
              cung cấp cho người dùng những trải nghiệm dễ dàng, an toàn và
              nhanh chóng khi mua sắm trực tuyến thông qua hệ thống hỗ trợ thanh
              toán và vận hành vững mạnh.
            </p>
            <p>
              Chúng tôi có niềm tin mạnh mẽ rằng trải nghiệm mua sắm trực tuyến
              phải đơn giản, dễ dàng và mang đến cảm xúc vui thích. Niềm tin này
              truyền cảm hứng và thúc đẩy chúng tôi mỗi ngày tại SnapUP.
            </p>
            <Row gutter={[30, 20]} className="about__goal">
              <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
                <div className="about__box">
                  <div>
                    <h3>Mục tiêu của chúng tôi</h3>
                    <p>
                      Chúng tôi tin tưởng vào sức mạnh khai triển của công nghệ
                      và mong muốn góp phần làm cho thế giới trở nên tốt đẹp hơn
                      bằng việc kết nối cộng đồng người mua và người bán thông
                      qua việc cung cấp một nền tảng thương mại điện tử.
                    </p>
                  </div>
                </div>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
                <div className="about__box">
                  <div>
                    <h3>Định vị của chúng tôi</h3>
                    <p>
                      Đối với người dùng trên toàn khu vực, SnapUP mang đến trải
                      nghiệm mua sắm trực tuyến tích hợp với vô số sản phẩm đa
                      dạng chủng loại, cộng đồng người dùng năng động và chuỗi
                      dịch vụ liền mạch.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="about__people">
              <h3>Đặc điểm về con người của chúng tôi</h3>
              <p>
                Để định nghĩa chúng tôi là ai - thông qua lời nói hay cách ứng
                xử trong nhiều trường hợp khác nhau - thì thực chất, chúng tôi
                Gần gũi, Vui vẻ và Đồng lòng. Đây là những đặc tính chính và nổi
                bật trong từng bước đường phát triển của SnapUp.
              </p>
              <div className="about__peopleWrap">
                <Row gutter={[20, 20]}>
                  <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={24}>
                    <div className="about__peopleBox">
                      <div className="about__peopleImg">
                        <img src={people1} alt="Image1" />
                      </div>
                      <h2>Gần Gũi</h2>
                      <p>
                        Chúng tôi có niềm tin vào tính gần gũi mà thanh liêm,
                        nền tảng vững chắc cho một cuộc sống trung thực, bình
                        dân và thành thật với bản thân.
                      </p>
                    </div>
                  </Col>
                  <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={24}>
                    <div className="about__peopleBox">
                      <div className="about__peopleImg">
                        <img src={people2} alt="Image2" />
                      </div>
                      <h2>Vui Vẻ</h2>
                      <p>
                        Chúng tôi dễ gần, đáng yêu và tràn đầy năng lượng, luôn
                        mang đến niềm vui cho những người xung quanh.
                      </p>
                    </div>
                  </Col>
                  <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={24}>
                    <div className="about__peopleBox">
                      <div className="about__peopleImg">
                        <img src={people3} alt="Image3" />
                      </div>
                      <h2>Đồng Lòng</h2>
                      <p>
                        Chúng tôi thích tận hưởng thời gian bên nhau giống như
                        tận hưởng việc mua sắm trực tuyến với người thân và bạn
                        bè - làm những việc yêu thích cùng nhau như một đại gia
                        đình lớn.
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="about__value">
              <h2>Giá trị cốt lõi</h2>
              <div className="about__valueImg"></div>
            </div>
            <div className="about__office">
              <h2>Văn phòng của chúng tôi</h2>
              <Row gutter={[20, 20]}>
                <OfficeItem
                  path1={office1}
                  path2={office2}
                  title="BRAZIL - SÃO PAULO"
                />
                <OfficeItem
                  path1={office3}
                  path2={office4}
                  title="TRUNG QUỐC - BẮC KINH"
                />
                <OfficeItem
                  path1={office5}
                  path2={office6}
                  title="TRUNG QUỐC - THƯỢNG HẢI"
                />
                <OfficeItem
                  path1={office7}
                  path2={office8}
                  title="TRUNG QUỐC - THẨM QUYẾN"
                />
                <OfficeItem
                  path1={office9}
                  path2={office10}
                  title="INDONESIA - BANDUNG"
                />
                <OfficeItem
                  path1={office11}
                  path2={office12}
                  title="INDONESIA - BEKASI"
                />
                <OfficeItem
                  path1={office13}
                  path2={office14}
                  title="MEXICO - MEXICO CITY"
                />
                <OfficeItem
                  path1={office15}
                  path2={office16}
                  title="PHILIPPINES - MANILA"
                />
                <OfficeItem
                  path1={office17}
                  path2={office18}
                  title="SINGAPORE"
                />
                <OfficeItem
                  path1={office19}
                  path2={office20}
                  title="HÀN QUỐC - SEOUL"
                />
                <OfficeItem path1={office21} path2={office22} title="ĐÀI BẮC" />
                <OfficeItem
                  path1={office23}
                  path2={office24}
                  title="VIỆT NAM - HÀ NỘI"
                />
              </Row>
            </div>
          </div>
          <div className="about__goBack" style={{float: "right"}}>
            <GoBack />
          </div>
        </div>
      </Container>
    </>
  );
}
export default About;

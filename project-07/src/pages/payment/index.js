/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Col, Form, Input, notification, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/container";
import newPrice from "../../components/newPrice";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./payment.scss";
import { Link } from "react-router-dom";
import { postPayment } from "../../services/paymentService";
import getDateTime from "../../helpers/getDateTime";
import { useForm } from "antd/es/form/Form";
import { deleteAll } from "../../actions/cart";
import { useEffect, useState } from "react";
import { getUsersByID, updateUsers } from "../../services/usersService";
import { getCookie } from "../../helpers/cookie";
import TotalMoney from "../../components/totalMoney";
import ProperName from "../../helpers/properName";

function Payment() {
  const [form] =Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.CartReducer);
  const [profileInfo, setprofileInfo] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const response = await getUsersByID();
      if (response) {
        setprofileInfo(response);
      }
    };
    getApi();
  }, []);

  const totalMoney = TotalMoney(cart);

  const rules = [{ required: true, message: "Required" }];
  const handleFinish = async (values) => {
    // luu dia chi nguoi dung
    let diachi = values.address;
    const userAddress = {
      address: diachi,
    };

    const response = await updateUsers(userAddress);

    const products = cart.map((item) => {
      return {
        productID: item.id,
        quantity: item.quantity,
      };
    });

    const options = {
      userID: getCookie("id"),
      note: values.note,
      products: products,
      createAt: getDateTime(),
      status: "onGoing",
    };

    const result = await postPayment(options);
    if (result) {
      form.resetFields();
      dispatch(deleteAll());
      api.success({
        message: "Order succesfully",
        description: "We will contact to you in some minites",
        placement: "bottomRight",
        duration: 3,
      });
    } else {
      api.error({
        message: "Order not succesfully",
        description: "System is wrong. Please try again",
        placement: "bottomRight",
        duration: 3,
      });
    }
  };
  useEffect(() => form.resetFields(), [profileInfo]);
  return (
    <>
      {contextHolder}
      <Container>
        <div className="payment">
          <Row gutter={[20, 20]}>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
              <div className="products__header">
                <p>Order Infomation</p>
              </div>
              {cart.length > 0 && (
                <div className="payment__infoCart">
                  {cart.map((item) => (
                    <div className="payment__infoCartItem" key={item.id}>
                      <div className="payment__cartImage">
                        <img
                          src={item.value[0].thumbnail}
                          alt={item.value[0].title}
                        />
                      </div>
                      <div className="payment__cartContent">
                        <div className="payment__cartTitle">
                          {ProperName(item.value[0].title)}
                        </div>
                        <div className="payment__cartQuantity">
                          Quantity: <strong>{item.quantity}</strong> ps
                        </div>
                        <div className="payment__cartPrice">
                          $ {(newPrice(item.value[0]) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="payment__totalCart">
                <p>Total: </p>
                <p>${totalMoney}</p>
              </div>
              <div className="payment__cartReturn">
                <Link to="/cart">
                  <ArrowLeftOutlined />
                  <span> Return cart page</span>
                </Link>
              </div>
            </Col>
            {cart.length > 0 && (
              <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
                <div className="products__header">
                  <p>Delivery address</p>
                </div>
                {profileInfo && (
                  <Form
                    layout="vertical"
                    onFinish={handleFinish}
                    form={form}
                    initialValues={profileInfo}
                  >
                    <Row gutter={[20]}>
                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
                        <Form.Item name="name" rules={rules}>
                          <Input placeholder="Full Name" />
                        </Form.Item>
                      </Col>

                      <Col xxl={16} xl={16} lg={24} md={24} sm={24} sx={24}>
                        <Form.Item name="email" rules={rules}>
                          <Input placeholder="Email" type={"email"} />
                        </Form.Item>
                      </Col>

                      <Col xxl={8} xl={8} lg={24} md={24} sm={24} sx={24}>
                        <Form.Item name="phone" rules={rules}>
                          <Input placeholder="Phone number" />
                        </Form.Item>
                      </Col>

                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
                        <Form.Item name="address" rules={rules}>
                          <Input placeholder="Your address" />
                        </Form.Item>
                      </Col>

                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
                        <Form.Item name="note" label="Note">
                          <TextArea showCount rows={4} />
                        </Form.Item>
                      </Col>

                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
                        <Button htmlType="submit" type="primary">
                          Buy Now
                        </Button>
                      </Col>
                     
                    </Row>
                  </Form>
                )}
              </Col>
            )}
          </Row>
        </div>
      </Container>
    </>
  );
}
export default Payment;

import { Row, Col, Card, Form, Input, Button, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import GenerateToken from "../../helpers/generateToken";
import { createUsers, getUsers } from "../../services/usersService";
// import { useEffect, useState } from 'react';
function Register() {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const rules = [
    {
      required: true,
      message: "Required",
    },
  ];
  const handleFinish = async (values) => {
    const token = GenerateToken();
    const options = {
      ...values,
      token: token,
    };
    const checkExitUser = await getUsers(options.email);
    if (checkExitUser.length > 0) {
      api.error({
        message: "Đăng ký tài khoản không thành công",
        description: "Hệ thống đang lỗi. Xin vui lòng thử lại",
        placement: "bottomRight",
        duration: 3,
      });
    } else {
      const result = await createUsers(options);
      if (result) {
        api.success({
          message: "Đăng ký tài khoản thành công",
          description: (
            <>
              Bạn đã đăng ký thành công tài khoản{" "}
              <strong>{options.name}</strong>
            </>
          ),
          placement: "bottomRight",
          duration: 3,
        });
        form.resetFields();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        api.error({
          message: "Đăng ký tài khoản không thành công",
          description: "Hệ thống đang lỗi. Xin vui lòng thử lại",
          placement: "bottomRight",
          duration: 3,
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={22}>
          <div className="Register">
            <Card title="Register">
              <Form layout="vertical" onFinish={handleFinish} form={form}>
                <Form.Item label="UserName" name="name" rules={rules}>
                  <Input type={"text"} />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={rules}>
                  <Input type="email" />
                </Form.Item>
                <Form.Item label="Phone" name="phone">
                  <Input type="phone" />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={rules}>
                  <Input type="password" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Form>
              <div>
                <p>
                  Or <Link to="/login">Login </Link>
                </p>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
}
export default Register;

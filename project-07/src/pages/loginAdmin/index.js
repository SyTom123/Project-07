import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { getAdmin } from "../../services/adminService";
import { deleteAllCookie, setCookie } from "../../helpers/cookie";
import "./loginAdmin.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Reload from "../../actions/reload";
function LoginAdmin() {
  const rules = [{ required: true, message: "Required" }];
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  const handleFinish = async (values) => {
    const email = values.email;
    const password = values.password;
    const checkExitAdmin = await getAdmin(email, password);
    if (checkExitAdmin.length > 0) {
      deleteAllCookie();
      setCookie("tokenAdmin", checkExitAdmin[0].token, 1);
      dispatch(Reload());
      navigate("/admin");
     
      window.location.reload();
    } 
    else {
      form.resetFields();
      api.error({
        message: "Login not successfully",
        description: "User or password not correct. Please try again",
        placement: "bottomRight",
        duration: 3,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="loginAdmin">
        <Row justify="center">
          <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={22}>
            <div className="loginAdmin__container">
              <Card title="Login Admin">
                <Form
                  layout="vertical"
                  onFinish={handleFinish}
                  form={form}
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                >
                  <Form.Item label="Email" name="email" rules={rules}>
                    <Input type="email" />
                  </Form.Item>
                  <Form.Item label="Password" name="password" rules={rules}>
                    <Input type="password" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Login
                    </Button>
                  </Form.Item>
                </Form>
                <div>
                  Or <Link to="/"> Go to Homepage</Link>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default LoginAdmin;

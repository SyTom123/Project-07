import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Reload from "../../actions/reload";
import Container from "../../components/container";
import { deleteAllCookie, setCookie } from "../../helpers/cookie";
import { getUsers } from "../../services/usersService";

function Login() {
  const rules = [{ required: true, message: "Required" }];
  const cart = useSelector((state) => state.CartReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const handleFinish = async (values) => {
    const email = values.email;
    const password = values.password;
    const checkExitUser = await getUsers(email, password);

    if (checkExitUser.length > 0) {
      deleteAllCookie();
      setCookie("token", checkExitUser[0].token, 1);
      setCookie("id", checkExitUser[0].id, 1);

      if (cart.length > 0) {
        navigate("/payment");
      } else {
        navigate("/");
      }
      dispatch(Reload());
    } else {
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
      <Container>
        <Row justify="center">
          <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={22}>
            <div className="login">
              <Card title="Login">
                <Form
                  layout="vertical"
                  form={form}
                  onFinish={handleFinish}
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
                  <p>
                    Or <Link to="/register"> Register now</Link>
                  </p>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Login;

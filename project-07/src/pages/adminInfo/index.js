import { Button, Card, Col, Form, Input, Row, notification } from "antd";
import { useEffect, useState } from "react";
import { editAdmin, getAdmin } from "../../services/adminService";
import "./adminInfo.scss";

function AdminInfo() {
  const [infoAdmin, setInfoAdmin] = useState([]);
  const rules = [{ required: true, message: "Required" }];
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();

  const getApi = async () => {
    const result = await getAdmin();
    if (result) {
      setInfoAdmin(result);
    }
  };

  useEffect(() => {
    getApi();
  }, []);
  const handleReload = ()=> {
    getApi()
  }
  const handleFinish = async(values) => {
    const result = await editAdmin(values);
    if(result) {
      handleReload();
      form.resetFields();
      api.success({
        message: "Changed password succesfully",
        description: <> You have just changed succesfully admin password</>,
        placement: "bottomRight",
        duration: 3
    })
    }
    else {
      api.error({
        message: "Changed password not successfully",
        description: "System is wrong. Please try again",
        placement: "bottomRight",
        duration: 3,
      });

    }
  };
  return (
    <>
    {contextHolder}
      <div className="adminInfo">
        {infoAdmin.length > 0 && (
          <Row>
            <Col xxl={9} xl={9} lg={12} md={12} sm={24} sx={24}>
              <Card title="Admin Infomation">
                <p>User Name: <strong> admin </strong></p>
                <p>Email: <strong> {infoAdmin[0].email} </strong></p>
                <p>Password: <strong> {infoAdmin[0].password} </strong></p>
                 
                <h3>Change Password</h3>
                <Form
                  layout="vertical"
                  initialValues={{ password: "" }}
                  form={form}
                  onFinish={handleFinish}
                >
                  <Form.Item label="New Password" name="password" rules={rules}>
                    <Input type="password" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Change
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}
export default AdminInfo;

/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Form, Image, Input, notification, Row } from "antd";
import { useEffect, useState } from "react";
import Container from "../../components/container";
import { getUsersByID, updateUsers } from "../../services/usersService";
import "./profile.scss";
import avatarImg from "../../assess/image/avatar.png";
import Reload from "../../actions/reload";
import { useDispatch } from "react-redux";
import ProperName from "../../helpers/properName";
function Profile() {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const rules = [
    {
      required: true,
      message: "Required!",
    },
  ];
  const [profileInfo, setprofileInfo] = useState([]);
  const [formDisabled, setFormDisabled] = useState(true);

  const getApi = async () => {
    const response = await getUsersByID();
    setprofileInfo(response);
  };
  useEffect(() => {
    getApi();
  }, []);

  const handleReload = () => {
    getApi();
  };

  const handleClick = () => {
    handleReload();
    form.resetFields();
    setFormDisabled(!formDisabled);
  };

  const handleFinish = async (options) => {
    const result = await updateUsers(options);
    if (result) {
      setFormDisabled(!formDisabled);
      handleReload();
      dispatch(Reload());
      api.success({
        message: "Update sussessfully",
        description: (
          <>
            You updated your user Account sussessfully
            <strong>{options.profileName}</strong>
          </>
        ),
        placement: "bottomRight",
        duration: 3,
      });
    } else {
      api.error({
        message: "Update not sussessfully",
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
        {profileInfo && (
          <div className="profile">
            <div className="profile__top">
              <div className="profile__title">
                <h2>My Profile</h2>
                <p>Manage and protect your account</p>
              </div>
              <div>
                {formDisabled ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      setFormDisabled(!formDisabled);
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      setFormDisabled(!formDisabled);
                    }}
                  >
                    Hủy
                  </Button>
                )}
              </div>
            </div>
            <div className="profile__body">
              <Row gutter={[20, 20]}>
                <Col xxl={16} xl={16} lg={16} md={16} sm={16} sx={24}>
                  <div className="profile__form">
                    {profileInfo && (
                      <Form
                        layout="vertical"
                        initialValues={profileInfo}
                        disabled={formDisabled}
                        onFinish={handleFinish}
                        form={form}
                      >
                        <Row gutter={[20]}>
                          <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
                            <Form.Item
                              label="User Name"
                              name="name"
                              rules={rules}
                            >
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
                            <Form.Item
                              label="Address"
                              name="address"
                              rules={rules}
                            >
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
                            <Form.Item label="Email" name="email" rules={rules}>
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
                            <Form.Item label="Phone" name="phone" rules={rules}>
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
                            <Form.Item label="Avatar src" name="avatarSrc">
                              <Input />
                            </Form.Item>
                          </Col>  
                          {!formDisabled && (
                            <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
                              <Button
                                htmlType="submit"
                                type="primary"
                                style={{ marginRight: "15px" }}
                              >
                                Cập nhật
                              </Button>
                              <Button type="primary" danger onClick={handleClick}>
                                Hủy
                              </Button>
                          </Col>
                          )}
                        </Row>
                      </Form>
                    )}
                  </div>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={24}>
                  <div className="profile__avatar">
                    <div className="profile__avatarImage">
                      <Image
                        src={
                          profileInfo.avatarSrc
                            ? profileInfo.avatarSrc
                            : avatarImg
                        }
                        alt=""
                      />
                    </div>
                    <div className="profile__avatarName">
                      <strong>{ ProperName(profileInfo.name)}</strong>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
export default Profile;

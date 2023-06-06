import {
  Button,
  Col,
  Form,
  Modal,
  notification,
  Row,
  Select,
  Tooltip,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getPurchaseStatus } from "../../services/purchaseStatus";
import { editPayment } from "../../services/paymentService";

function PurchasesEdit({ item, onReload }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionsStatus, setOptionStatus] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  
  useEffect(() => {
    const getApi = async () => {
      const result = await getPurchaseStatus();
      if (result) {
        setOptionStatus(result);
      }
    };
    getApi();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const rules = [
    {
      required: true,
      message: "Required",
    },
  ];

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const handleChange = async (values) => {
    const options = {
      status: values,
    };
    console.log(options);
    const result = await editPayment(item.id, options);
    if (result) {
      setIsModalOpen(false);
      onReload();
      api.success({
        message: "Update Payment succesfully",
        description: (
          <>
            You have just updated succesfully payment
            <strong>{values.title}</strong>
          </>
        ),
        placement: "bottomRight",
        duration: 3,
      });
    } else {
      api.error({
        message: "Update payment not successfully",
        description: "System is wrong. Please try again",
        placement: "bottomRight",
        duration: 3,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Tooltip placement="bottom" title={"Update payment"}>
        <Button
          onClick={showModal}
          icon={<EditOutlined style={{ color: "green" }} />}
          type="ghost"
        ></Button>
      </Tooltip>
      <Modal
        title="Edit Product"
        open={isModalOpen}
        onCancel={handleCancel}
        width="30vw"
        footer={null}
      >
        <Form layout="vertical" form={form} initialValues={item}>
          <Row gutter={[20]}>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
              <Form.Item label="Status" name="status" rules={rules}>
                <Select
                  placeholder="Select status"
                  options={optionsStatus}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
export default PurchasesEdit;

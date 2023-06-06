import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Tooltip,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCategory } from "../../services/categoryService";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { editProduct } from "../../services/productService";

function InventoryEdit(props) {
  const { record, onReload } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const [optionsCategory, setOptionsCategory] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    const getApi = async () => {
      const result = await getCategory();
      if (result) {
        const options = result.map((item) => ({
          value: item,
          label: item,
        }));
        options.unshift({
          value: "",
          label: "",
        });
        setOptionsCategory(options);
      }
    };
    getApi();
  }, []);

  const rules = [
    {
      required: true,
      message: "Required",
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getApi = async () => {};
    getApi();
  }, []);
  const handleFinish = async (values) => {
    const result = await editProduct(record.id, values);

    if (result) {
      setIsModalOpen(false);
      onReload();
      api.success({
        message: "Update Product succesfully",
        description: (
          <>
            You have just updated succesfully productSection
            <strong>{values.title}</strong>
          </>
        ),
        placement: "bottomRight",
        duration: 3,
      });
    } else {
      api.error({
        message: "Update product not successfully",
        description: "System is wrong. Please try again",
        placement: "bottomRight",
        duration: 3,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Tooltip placement="bottom" title={"Chỉnh sửa bản ghi"}>
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
        width="75vw"
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={record}
          onFinish={handleFinish}
        >
          <Row gutter={[20]}>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
              <Form.Item label="Title" name="title" rules={rules}>
                <Input />
              </Form.Item>
            </Col>

            <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
              <Form.Item label="Price" name="price" rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
              <Form.Item
                label="DiscountPercentage"
                name="discountPercentage"
                rules={rules}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
              <Form.Item label="Stock" name="stock" rules={rules}>
                <Input type={"number"} min="0" />
              </Form.Item>
            </Col>

            <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
              <Form.Item label="Brand" name="brand" rules={rules}>
                <Input />
              </Form.Item>
            </Col>

            <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
              <Form.Item label="Category" name="category" rules={rules}>
                <Select
                  placeholder="Select category"
                  options={optionsCategory}
                />
              </Form.Item>
            </Col>

            <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
              <Form.Item label="Image Src" name="thumbnail" rules={rules}>
                <Input />
              </Form.Item>
            </Col>

            <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} sx={24}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default InventoryEdit;

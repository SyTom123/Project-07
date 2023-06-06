import { Button, Col, Form, Input, notification, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import GoBack from "../../components/goBack";
import { getCategory } from "../../services/categoryService";
import { createProduct } from "../../services/productService";
import "./addProduct.scss";

function AddProduct() {
  const [optionsCategory, setOptionsCategory] = useState([]);
  const [form] =Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const rules = [
    {
      required: true,
      message: "Required",
    },
  ];

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

  const handleFinsh = async (values) => {
    values.rating = 0;
    let image = [];
    for (let i = 0; i < 5; i++) {
      const img = `images${i}`;
      if (values[img] !== undefined) {
        image.push(values[img]);
        delete values[img];
      }
    }
    values.images = image;
    const result = await createProduct(values);
    
    if (result) {
      form.resetFields();
      api.success({
        message: "Add product successfully",
        description: (
          <>
            You have just added <strong>{values.title}</strong>
          </>
        ),
        placement: "bottomRight",
        duration: 3,
      });
    } else {
      api.error({
        message: "Add product not successfully",
        description: "System is wrong. Please try again",
        placement: "bottomRight",
        duration: 3,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <div className="addProduct">
        <div className="addProduct__top">
          <h2>Create a new Product</h2>
          <GoBack />
        </div>
        <div className="addProduct__form">
          <Form layout="vertical" onFinish={handleFinsh} form={form}>
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

              <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
                <Form.Item label="Extra Image 1 Src" name={"images0"}>
                  <Input />
                </Form.Item>
              </Col>

              <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
                <Form.Item label="Extra Image 2 Src" name={`images1`}>
                  <Input />
                </Form.Item>
              </Col>

              <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
                <Form.Item label="Extra Image 3 Src" name={`images2`}>
                  <Input />
                </Form.Item>
              </Col>

              <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
                <Form.Item label="Extra Image 4 Src" name={`images3`}>
                  <Input />
                </Form.Item>
              </Col>

              <Col xxl={12} xl={12} lg={12} md={12} sm={12} sx={24}>
                <Form.Item label="Extra Image 5 Src" name={`images4`}>
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
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}
export default AddProduct;

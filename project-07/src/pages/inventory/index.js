/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./inventory.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import InventoryView from "./InventoryView";
import InventoryDelete from "./inventoryDelete";
import InventoryEdit from "./inventoryEdit";
import { Link } from "react-router-dom";
import { getCategory } from "../../services/categoryService";
import ProperName from "../../helpers/properName";

function Inventory() {
  const [dataProducts, setDataProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categorySort, setCategorySort] = useState("");
  const [optionsCategory, setOptionsCategory] = useState([]);

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const getApi = async () => {
    const result = await getProducts(search, "", "", "", "", categorySort);
    if (result) {
      setDataProducts(result.reverse());
    }
  };

  useEffect(() => {
    getApi();
  }, [search, categorySort]);

  useEffect(() => {
    const getApi = async () => {
      const result = await getCategory();
      if (result) {
        const options = result.map((item) => ({
          value: item,
          label: ProperName(item),
        }));
        options.unshift({
          value: "all",
          label: "All",
        });
        setOptionsCategory(options);
      }
    };
    getApi();
  }, []);

  const handleReload = () => {
    getApi();
  };

  const handleFinish1 = (values) => {
    setSearch(values.title);
    setCategorySort("");
    form.resetFields();
    form2.resetFields();
  };
  const handleChange = (values) => {
    if (values === "all") {
      values = "";
    }
    setCategorySort(values);
    setSearch("");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => ProperName(record.title),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text, record) => ProperName(record.category),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <>
          <InventoryView record={record} />
          <InventoryDelete record={record} onReload={handleReload} />
          <InventoryEdit record={record} onReload={handleReload} />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="inventory">
        <div className="inventory__title">
          <h2>All Products List</h2>
        </div>
        <div className="inventory__button">
          <Link to="/addProduct">
            <Button icon={<PlusOutlined />} type="primary">
              Add
            </Button>
          </Link>
        </div>
        <div className="inventory__search">
          <Row gutter={[20, 20]}>
            <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
              <Form layout="vertical" onFinish={handleFinish1} form={form}>
                <Form.Item
                  label={<strong>Search by Title</strong>}
                  name="title"
                >
                  <Input placeholder="Input title here" />
                </Form.Item>
              </Form>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
              <Form
                layout="vertical"
                form={form2}
                initialValues={{ category: "all" }}
              >
                <Form.Item
                  label={<strong>Or Search by Category</strong>}
                  name="category"
                >
                  <Select
                    placeholder="Select category"
                    options={optionsCategory}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
        {dataProducts.length > 0 && (
          <div className="inventory__quantity">
            Total Quantity: <strong>{dataProducts.length}</strong> products
          </div>
        )}

        <div className="inventory__table">
          <Table columns={columns} dataSource={dataProducts} rowKey="id" />
        </div>
      </div>
    </>
  );
}
export default Inventory;

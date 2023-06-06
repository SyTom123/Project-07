/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, Row, Select, Tag } from "antd";
import { useEffect, useState } from "react";
import Container from "../../components/container";
import newPrice from "../../components/newPrice";
import { getAllPayment, getPayment } from "../../services/paymentService";
import { getProducts } from "../../services/productService";
import "./userPurchase.scss";
import { getCookie } from "../../helpers/cookie";
import PurchasesView from "./purchaseView";
import PurchasesEdit from "./purchaseEdit";
import PurchaseDelete from "./purchaseDelete";
import { getPurchaseStatus } from "../../services/purchaseStatus";
import ProperName from "../../helpers/properName";

function UserPurchase() {
  const [purchaseData, setPurchaseData] = useState([]);
  const tokenAdmin = getCookie("tokenAdmin");

  const [optionsStatus, setOptionStatus] = useState([]);
  const [status, setStatus] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    const getApi = async () => {
      const result = await getPurchaseStatus();
      if (result) {
        result.unshift({
          lable: "All",
          value: "All",
        });
        setOptionStatus(result);
      }
    };
    getApi();
  }, []);

  const handleChange = (values) => {
    if (values === "All") {
      values = "";
    }
    setStatus(values);
  };

  const getApi = async () => {
    let result;
    if (tokenAdmin) {
      result = await getAllPayment(status);
    } else {
      result = await getPayment(status);
    }

    let purchaseDataTotal = [];
    for (let i = 0; i < result.length; i++) {
      const { products, ...rest } = result[i];
      let product = [];
      for (let j = 0; j < result[i].products.length; j++) {
        const id = result[i].products[j].productID;
        const result1 = await getProducts("", "", "", "", "", "", id);
        const result2 = {
          product: result1,
          quantity: result[i].products[j].quantity,
          totalPrice: (
            result[i].products[j].quantity * newPrice(result1[0])
          ).toFixed(2),
        };
        product.push(result2);
      }
      const purchaseDataItem = {
        ...rest,
        products: product,
      };

      purchaseDataTotal.push(purchaseDataItem);
    }
    if (result) {
      setPurchaseData(purchaseDataTotal.reverse());
    }
  };

  useEffect(() => {
    getApi();
  }, [status]);

  const handleReload = () => {
    getApi();
  };

  return (
    <>
      <Container>
        <div className="userPurchase">
          <div className="products__header">
            {tokenAdmin ? <p>All orders </p> : <p>My Purchases </p>}
          </div>

          {purchaseData.length > 0 ? (
            <>
              <div className="userPurchase__sort">
                <Form form={form} layout="vertical">
                  <Form.Item
                    label={<strong>Sort by Status</strong>}
                    name="Status"
                  >
                    <Row gutter={[20]}>
                      <Col xxl={8} xl={8} lg={8} md={8} sm={12} sx={24}>
                        <Select
                          onChange={handleChange}
                          placeholder="Select status"
                          options={optionsStatus}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              </div>
              <div className="userPurchase__body">
                <table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      {tokenAdmin && <th>User ID</th>}
                      <th>Product</th>
                      <th>Quantiy</th>
                      <th>Total</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {tokenAdmin && <td>{item.userID}</td>}
                        <td>
                          {item.products.map((pro, i) => (
                            <p key={pro.product[0].id}>
                              {ProperName(pro.product[0].title)}
                            </p>
                          ))}
                        </td>
                        <td>
                          {item.products.map((pro, i) => (
                            <p key={`${pro.product[0].id}-${pro.quantity}`}>
                              {pro.quantity}
                            </p>
                          ))}
                        </td>
                        <td>
                          <strong>
                            {item.products
                              .reduce((sum, product) => {
                                sum = sum + parseFloat(product.totalPrice);
                                return sum;
                              }, 0)
                              .toFixed(2)}{" "}
                            $
                          </strong>
                        </td>
                        <td>{item.createAt}</td>
                        <td>
                          {item.status === "onGoing" ? (
                            <Tag color="yellow">On going</Tag>
                          ) : item.status === "completed" ? (
                            <Tag color="green">Completed</Tag>
                          ) : (
                            <Tag color="red">Cancel</Tag>
                          )}
                        </td>
                        <td>
                          <PurchasesView item={item} />
                          {tokenAdmin && (
                            <>
                              <PurchaseDelete
                                item={item}
                                onReload={handleReload}
                              />
                              <PurchasesEdit
                                item={item}
                                onReload={handleReload}
                              />
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>Empty</>
          )}
        </div>
      </Container>
    </>
  );
}
export default UserPurchase;

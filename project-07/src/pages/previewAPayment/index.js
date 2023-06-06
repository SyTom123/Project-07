/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Tag } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/container";
import GoBack from "../../components/goBack";
import newPrice from "../../components/newPrice";
import { getCookie } from "../../helpers/cookie";
import { getPaymentbyID } from "../../services/paymentService";
import { getProducts } from "../../services/productService";
import { getUsersByID } from "../../services/usersService";
import "./previewAPayment.scss";
import ProperName from "../../helpers/properName";

function PreviewAPayment() {
  const params = useParams();
  const [purchaseData, setPurchaseData] = useState([]);
  const tokenAdmin = getCookie("tokenAdmin");
  useEffect(() => {
    const getApi = async () => {

      const result = await getPaymentbyID(params.id);

      const userId = result.userID;
      const response = await getUsersByID(userId);

      const { products, userID, ...rest } = result;
      let product = [];
      let purchaseDataTotal = [];
      for (let i = 0; i < result.products.length; i++) {
        const id = result.products[i].productID;
        const result1 = await getProducts("", "", "", "", "", "", id);
        const result2 = {
          product: result1,
          quantity: result.products[i].quantity,
          totalPrice: (
            result.products[i].quantity * newPrice(result1[0])
          ).toFixed(2),
        };
        product.push(result2);
      }
      let purchaseDataItem = {
        ...rest,
        products: product,
      };
      if (response) {
        purchaseDataItem = {
          ...purchaseDataItem,
          user: response
        }
      }
      purchaseDataTotal.push(purchaseDataItem);
      if (result) {
        setPurchaseData(purchaseDataTotal);
      }
    };
    getApi();
  }, []);

  return (
    <>
      <Container>
        <div className="previewAPayment">
          <div className="products__header">
            <p>Payment Details </p>
            <GoBack />
          </div>
          {purchaseData.length > 0 && (
            <>
              <div className="previewAPayment">
                <div className="previewAPayment__time">
                  <p>
                    Date Order: <span>{purchaseData[0].createAt}</span>
                  </p>
                </div>
                <div className="previewAPayment__status">
                  Status:
                  <span>
                    {purchaseData[0].status === "onGoing" ? (
                      <Tag color="yellow">On going</Tag>
                    ) : purchaseData[0].status === "completed" ? (
                      <Tag color="green">Completed</Tag>
                    ) : (
                      <Tag color="red">Cancel</Tag>
                    )}
                  </span>
                </div>
                {purchaseData[0].note && (
                  <div className="previewAPayment__note">
                  <p>
                    Note: <span>{purchaseData[0].note}</span>
                  </p>
                </div>
                )}
                {tokenAdmin && (
                  <div className="previewAPayment__infoUser">
                    <Card title="Customer Infomation">
                      <div>
                        <p>Name: <strong>{purchaseData[0].user.name}</strong></p> 
                        <p>Address: <strong>{purchaseData[0].user.address}</strong></p>
                        <p>Email: <strong>{purchaseData[0].user.email}</strong></p>
                        <p> Phone : <strong>{purchaseData[0].user.phone}</strong></p>
                      </div>
                    </Card>
                  </div>
                )}
                <div className="previewAPayment__body">
                  <p>Products</p>
                  {purchaseData[0].products.map((item, index) => (
                    <div className="previewAPayment__products" key={index}>
                      {item.product.map((pro, i) => (
                        <div
                          className="previewAPayment__product"
                          key={`${index}-${pro.id}`}
                        >
                          <div className="previewAPayment__cartImage">
                            <img src={pro.thumbnail} alt={pro.title} />
                          </div>
                          <div className="previewAPayment__cartContent">
                            <div className="previewAPayment__cartTitle">
                               {ProperName(pro.title)}
                            </div>
                            <div className="previewAPayment__cartQuantity">
                              Quantity:
                              <span>
                                <strong> {item.quantity}</strong>
                              </span>
                              ps
                            </div>
                            <div className="previewAPayment__cartPrice">
                              {(newPrice(pro) * item.quantity).toFixed(2)} $
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="previewAPayment__totalCart">
                <p>Total: </p>
                <p>
                  <strong>
                    $
                    { purchaseData[0].products
                      .reduce((sum, product) => {
                        sum = sum + parseFloat(product.totalPrice);
                        return sum;
                      }, 0)
                      .toFixed(2)}
                  </strong>
                </p>
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
export default PreviewAPayment;

/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Col, Button, notification } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/container";
import { getProducts } from "../../services/productService";
import "./singleProduct.scss";
import newPrice from "../../components/newPrice";
import { ShoppingCartOutlined } from "@ant-design/icons";
import GoBack from "../../components/goBack";
import { addCart, updateCart } from "../../actions/cart";
import { down, reset, up } from "../../actions/productQuantity";
import { getCookie } from "../../helpers/cookie";
import ProperName from "../../helpers/properName";

function SingleProduct() {
  const param = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [path, setPath] = useState("");
  const cart = useSelector((state) => state.CartReducer);
  const quantity = useSelector((state) => state.ProductQuantity);
  const [api, contextHolder] = notification.useNotification();
  const tokenAdmin = getCookie("tokenAdmin");

  const getApi = async () => {
    const result = await getProducts("", "", "", "", "", "", param.id);
    setPath(result[0].thumbnail);
    if (result) {
      setProduct(result);
    }
  };
  useEffect(() => {
    dispatch(reset());
    getApi();
  }, []);

  const handleChangeImage = (item) => {
    setPath(item);
  };

  const handleClick = (id, product) => {
    const number = quantity;
    if (cart.some((item) => item.id === id)) {
      dispatch(updateCart(id, number, 0));
      api.success({
        message: "Update product to Chart successfully",
        description: (
          <>
            <strong>{product[0].title}</strong> has been updated to chart
          </>
        ),
        placement: "bottomRight",
        duration: 3,
      });
    } else {
      const number = quantity;
      dispatch(addCart(id, product, number));
      dispatch(reset());
      api.success({
        message: "Add product to Chart successfully",
        description: (
          <>
            <strong>{product[0].title}</strong> has been added to chart
          </>
        ),
        placement: "bottomRight",
        duration: 3,
      });
    }
  };

  const handleUp = () => {
    dispatch(up());
  };

  const handleDown = () => {
    if (quantity > 1) {
      dispatch(down());
    }
  };

  return (
    <>
      <Container>
        {contextHolder}
        {product.length > 0 && (
          <div className="singleProduct">
            <Row gutter={[30, 10]}>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} sx={24}>
                <div className="singleProduct__image">
                  <div className="singleProduct__imageTop">
                    <img src={path} alt="thumbnail" />
                  </div>
                  <div className="singleProduct__imageBottom">
                    {(product[0].images || []).map((item, index) => (
                      <div className="singleProduct__imageWrap" key={index}>
                        <div
                          className="singleProduct__imageItem"
                          onClick={() => handleChangeImage(item)}
                        >
                          <img src={item} alt="" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} sx={24}>
                <div className="singleProduct__content">
                  <div className="singleProduct__title">
                    {ProperName(product[0].title)}
                  </div>
                  <div className="singleProduct__description">
                    {product[0].description}
                  </div>
                  <div className="singleProduct__wrap">
                    <p>
                      Rating: <span>{product[0].rating}</span>
                    </p>
                    <p>
                      Brand: <span>{product[0].brand}</span>
                    </p>
                    <p>
                      Category: <span>{ProperName(product[0].category)}</span>
                    </p>
                  </div>
                  <div className="singleProduct__price">
                    <div className="singleProduct__oldPrice">
                      <span>$ {product[0].price}</span>
                      <span> (inclusive of all taxes)</span>
                    </div>
                    <div className="singleProduct__newPrice">
                      <p>$ {newPrice(product[0])}</p>
                      <div className="singleProduct__discountPercentage">
                        <p>{product[0].discountPercentage} % OFF</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      "singleProduct__admin " +
                      (tokenAdmin ? "singleProduct__admin--hidden" : "")
                    }
                  >
                    <div className="singleProduct__quantity">
                      Quantity:
                      <span onClick={handleDown}>-</span>
                      <input type="text" value={quantity} disabled />
                      <span onClick={handleUp}>+</span>
                    </div>
                    <div className="singleProduct__button">
                      <Button
                        icon={<ShoppingCartOutlined />}
                        type="primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => handleClick(product[0].id, product)}
                      >
                        Add To chart
                      </Button>
                      <GoBack />
                    </div>
                  </div>
                  {tokenAdmin && (
                    <div>
                      <GoBack />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </>
  );
}
export default SingleProduct;

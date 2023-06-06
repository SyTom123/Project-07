import { Button, notification, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/container";
import newPrice from "../../components/newPrice";
import { DeleteOutlined } from "@ant-design/icons";
import GoBack from "../../components/goBack";
import "./cart.scss";
import { deleteAll, deleteCart, updateCart } from "../../actions/cart";
import { Link } from "react-router-dom";
import TotalMoney from "../../components/totalMoney";
import ProperName from "../../helpers/properName";

function Cart() {
  const cart = useSelector((state) => state.CartReducer);
  const [api, contextHolder] = notification.useNotification();
  const totalMoney = TotalMoney(cart);
  const dispatch = useDispatch();

  const handleUpCart = (id) => {
    dispatch(updateCart(id, 1));
  };
  const handleDownCart = (item, id) => {
    if (item.quantity > 1) {
      dispatch(updateCart(id, -1));
    }
  };
  const handleClick = (item, id) => {
    dispatch(deleteCart(id));
    api.success({
      message: "Delete product from Chart successfully",
      description: (
        <>
          {" "}
          <strong>{item.value[0].title}</strong> has been deleted from chart
        </>
      ),
      placement: "bottomRight",
      duration: 3,
    });
  };
  const handleDeleteAll = () => {
    dispatch(deleteAll());
    api.success({
      message: "Delete all products from Chart successfully",
      description: "All products has been deleted from to chart",
      placement: "bottomRight",
      duration: 3,
    });
  };
  
  return (
    <>
      {contextHolder}
      <Container>
        <div className="cart">
          <div className="products__header">
            <p>Cart List</p>
            <GoBack />
          </div>
          {cart.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>UnitPrice</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="cart__title">
                          {ProperName(item.value[0].title)}
                        </div>
                      </td>
                      <td>
                        <div className="cart__imageBox">
                          <div className="cart__image">
                            <img src={item.value[0].thumbnail} alt="" />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="cart__price">
                          $ {newPrice(item.value[0])}
                        </div>
                      </td>
                      <td>
                        <div className="cart__quantity">
                          <span
                            onClick={() =>
                              handleDownCart(item, item.value[0].id)
                            }
                          >
                            -
                          </span>
                          <input type="text" value={item.quantity} disabled />
                          <span onClick={() => handleUpCart(item.value[0].id)}>
                            +
                          </span>
                        </div>
                      </td>
                      <td className="cart__price">
                        $ {(newPrice(item.value[0]) * item.quantity).toFixed(2)}
                      </td>
                      <td>
                        <Popconfirm
                          title="Sure to delete?"
                          onConfirm={() => handleClick(item, item.value[0].id)}
                        >
                          <div className="cart__button">
                            <Button
                              type="primary"
                              danger
                              icon={<DeleteOutlined />}
                            ></Button>
                          </div>
                        </Popconfirm>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <div className="cart__total">
                  <Popconfirm
                    title="Sure to delete All?"
                    onConfirm={() => handleDeleteAll()}
                  >
                    <div className="cart__clearAll">
                      <Button type="primary" danger>
                        Clear Cart
                      </Button>
                    </div>
                  </Popconfirm>
                  <div className="cart__money">
                    <p>
                      Total:
                      <span>
                        <strong>$ {totalMoney}</strong>
                      </span>
                    </p>
                    <Link to="/payment">
                      <Button type="primary">Checkout</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p style={{ fontWeight: "500" }}>Empty Cart</p>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
export default Cart;

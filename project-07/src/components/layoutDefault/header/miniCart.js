import { Badge, Button, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import newPrice from "../../newPrice";
import "./minCart.scss";
import ProperName from "../../../helpers/properName";

function MiniCart() {
  const cart = useSelector((state) => state.CartReducer);
  const count = cart.reduce((sum, item) => (sum += item.quantity), 0);
  let disabled = true;
  if (cart.length > 0) {
    disabled = false;
  }

  const items = cart.map((item, index) => {
    return {
      key: index,
      label: (
        <>
          <div className="miniCart__item">
            <div className="miniCart__image">
              <img src={item.value[0].thumbnail} alt="thumbnail" />
            </div>
            <div className="miniCart__title">
              {ProperName(item.value[0].title)}
            </div>
            <div className="miniCart__price">
              $ {(newPrice(item.value[0]) * item.quantity).toFixed(2)}
            </div>
          </div>
        </>
      ),
    };
  });

  return (
    <>
      <div>
        <Link to="/cart">
          <Dropdown
            menu={{ items }}
            disabled={disabled}
            className="miniCart"
            overlayClassName="miniCart__dropdown"
            dropdownRender={(menus) => (
              <>
                <div className="miniCart__head">
                  <p>Recently Cart Product</p>
                </div>
                <div className="miniCart__body">{menus}</div>
                <div className="miniCart__button">
                  <Link to="/cart">
                    <Button type="primary">View my Shopping Cart</Button>
                  </Link>
                </div>
              </>
            )}
          >
            <Badge
              count={count}
              style={{
                color: "red",
                background: "yellow",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
              <div className="headerDefault__cartIcon">
                <FaShoppingCart />
              </div>
            </Badge>
          </Dropdown>
        </Link>
      </div>
    </>
  );
}
export default MiniCart;

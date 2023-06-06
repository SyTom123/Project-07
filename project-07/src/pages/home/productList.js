import newPrice from "../../components/newPrice";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import ProperName from "../../helpers/properName";
function ProductList(props) {
  const { items, end } = props;
  return (
    <>
    <Row gutter={[10,10]}>
      <div className="products__list">
        {items.slice(0, end).map((item) => (
          <Col xxl={4} xl={4} lg={4} md={6} sm={12} sx={8}  key={item.id} className="products__item">
            <Link to={`/singleProduct/${item.id}`}>
              <div className="products__box">
                <div className="products__image">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="products__sale">
                  {item.discountPercentage}% Off
                </div>
                <div className="products__brand">
                  <span>Brand: </span>
                  <span>
                    <strong>{item.brand}</strong>
                  </span>
                </div>
                <div className="products__title">{ProperName(item.title)}</div>
                <div className="products__price">
                  <span>${item.price}</span>
                  <span>
                    <strong> ${newPrice(item)}</strong>
                  </span>
                </div>
                <div className="products__hr"></div>
              </div>
            </Link>
          </Col>
        ))}
      </div>
      </Row>
    </>
  );
}
export default ProductList;

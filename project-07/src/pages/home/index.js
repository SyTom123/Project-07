import Banner from "../../components/layoutDefault/banner";
import Container from "../../components/container";
import "./home.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { Button, Row } from "antd";
import ProductList from "./productList";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [productsTopSale, setProductsTopSale] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const result = await getProducts();
      const tempProduct = [];
      if (result) {
        for (let i in result) {
          let randomIndex = Math.floor(Math.random() * result.length);
          while (tempProduct.includes(result[randomIndex])) {
            randomIndex = Math.floor(Math.random() * result.length);
          }
          tempProduct[i] = result[randomIndex];
        }
      }
      setProducts(tempProduct);

      const sort = "discountPercentage";
      const order = "desc";
      const response = await getProducts("", sort, order);
      if (response) {
        setProductsTopSale(response);
      }
    };
    getApi();
  }, []);

  return (
    <div className="home">
      <Container>
        <Banner />
        <div className="products">
          <div className="products__header">SEE OURS PRODUCTS</div>
          <div className="products__body">
            {products.length > 0 && <ProductList items={products} end={12} />}
            <Link to="/productsSection/all">
              <Button
                style={{ display: "block", margin: "20px auto" }}
                type="primary"
              >
                Xem thêm
              </Button>
            </Link>
          </div>
          <div className="products__header">TOP SALE PRODUCTS</div>
          <div className="products__body">
            <Row>
              {productsTopSale.length > 0 && (
                <ProductList items={productsTopSale} end={12} />
              )}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default Home;

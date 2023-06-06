/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Container from "../../components/container";
import { getProducts } from "../../services/productService";
import ProductList from "../home/productList";
import { Button } from "antd";
import "./productSection.scss";
import { useDispatch, useSelector } from "react-redux";
import { Down, Reset, Up } from "../../actions/pagination";
import { useParams } from "react-router-dom";
import GoBack from "../../components/goBack";

function ProductsSection() {
  const param = useParams();
  const [products, setProducts] = useState([]);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.Pagination);

  useEffect(() => {
    dispatch(Reset());
  }, []);

  const getApi = async (limit, category) => {
    const result = await getProducts("", "", "", page, limit, category);
    if (result) {
      setProducts(result);
    }
    if (param.cate === "all") {
      const response = await getProducts();
      const number = Math.ceil(response.length / limit);
      setTotalPageNumber(number);
    }
  };
  useEffect(() => {
    let limit = 18;
    let category = "";
    if (param.cate !== "all") {
      category = param.cate;
      setPage(1);
    }
    getApi(limit, category);
  }, [page, param.cate, pageNumber]);

  const handleDown = () => {
    if (page > 1) {
      setPage((state) => (state = state - 1));
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 1500);
    }
    dispatch(Down());
  };
  const handleUp = (totalPageNumber) => {
    if (page < totalPageNumber) {
      setPage((state) => (state = state + 1));
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 1500);
    }
    dispatch(Up(totalPageNumber));
  };

  return (
    <>
      <div className="productsSection">
        <Container>
          <div className="products__header">
            <p>
              {param.cate === "all" ? (
                "ALL OUR PRODUCTS"
              ) : (
                <>Our {param.cate} Products</>
              )}
            </p>
            <GoBack />
          </div>
          <div className="productsSection__body">
            {products.length > 0 ? (
              <ProductList items={products} />
            ) : (
              <>
                <p>Không có sản phẩm để hiển thị</p>
              </>
            )}
          </div>
          {totalPageNumber > 1 && (
            <div className="productsSection__pagination">
              <Button type="primary" onClick={handleDown}>
                Previous
              </Button>
              <input type="text" disabled value={pageNumber} />
              <Button type="primary" onClick={() => handleUp(totalPageNumber)}>
                Next
              </Button>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
export default ProductsSection;

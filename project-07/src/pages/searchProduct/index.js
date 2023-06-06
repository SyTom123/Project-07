/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/container";
import { getProducts } from "../../services/productService";
import ProductList from "../home/productList";

function SearchProduct() {
  const param = useParams();
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    const getApi = async () => {
      const result = await getProducts(param.q);
      if (result) {
        setSearchData(result);
      }
    };
    getApi();
  }, [param.q]);
  return (
    <>
      <div className="searchProduct">
        <Container>
          <div className="products__header">
            <p>{<>Our {param.q} Products</>}</p>
          </div>
          <div className="products__body">
          {searchData.length > 0 ? <ProductList items={searchData} /> : <><p>Không có sản phẩm để hiển thị</p></>}
          </div>
        </Container>
      </div>
    </>
  );
}
export default SearchProduct;

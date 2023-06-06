import { Link } from "react-router-dom";
import ProperName from "../../../helpers/properName";
import { useDispatch, useSelector } from "react-redux";
import Authen from "../../../actions/authen";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getCategory } from "../../../services/categoryService";

function Sibar() {
  const dispatch = useDispatch();
  const authen = useSelector((state) => state.AuthenReducer);

  const handleClick = (value) => {
    dispatch(Authen(value));
  };

  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getApi = async () => {
      const result = await getCategory();
      if (result) {
        setCategory(result);
      }
    };
    getApi();
  }, []);

  return (
    <>
      <div
        className={
          "headerDefault__sibar " + (authen && "headerDefault__sibar--hidden")
        }
      >
        <div className="headerDefault__sibar--head">
          <p>ALL CATEGORIES</p>
          <span>
            <FaTimes onClick={() => handleClick(true)} style={{fontSize: "20px"}} />
          </span>
        </div>
        {category.length > 0 && (
          <div className="headerDefault__sibar--body">
            <div className="headerDefault__sibar--container">
              {category.map((item, index) => (
                <Link to={`/productsSection/${item}`} key={index}>
                  <div
                    className="headerDefault__sibartag"
                    onClick={() => handleClick(true)}
                  >
                    <p>{ProperName(item)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Sibar;

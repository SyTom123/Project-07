import { Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import logo from "../../../assess/image/logo.png";
import MiniCart from "./miniCart";
import { useDispatch } from "react-redux";
import Authen from "../../../actions/authen";
import { getCategory } from "../../../services/categoryService";
import ProperName from "../../../helpers/properName";

function HeaderMain() {
  const [category, setCategory] = useState([]);
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getApi = async () => {
      const result = await getCategory();
      if (result) {
        setCategory(result);
      }
    };
    getApi();
  }, []);

  const handleClick = (value) => {
    dispatch(Authen(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.target.children[0].value;
    navigate(`/searchProduct/${keyword}`);
    ref.current.value = "";
  };

  return (
    <div className="headerDefault__main">
      <div className="headerDefault__bar">
        <Tooltip placement="top" title={"Click to open categories"}>
          <FaBars onClick={() => handleClick(false)} />
        </Tooltip>
      </div>

      <Link to="/">
        <div className="headerDefault__logo">
          <div className="headerDefault__logoImg">
            <img src={logo} alt="logo" />
          </div>
          <p> SnapUp </p>
        </div>

      </Link>
      <div className="headerDefault__middle">
        <form className="headerDefault__search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search your prouduct title here"
            name="keySearch"
            ref={ref}
            required
          />
          <button>
            <FaSearch />
          </button>
        </form>
        
        <div className="headerDefault__tags">
          {category.length > 0 && (
            <div className="headerDefault__tags">
              {category.slice(0, 8).map((item, index) => (
                <div className="headerDefault__tag" key={index}>
                  <Link to={`/productsSection/${item}`}>{ProperName(item)}</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="headerDefault__cart">
        <MiniCart />
      </div>
    </div>
  );
}
export default HeaderMain;

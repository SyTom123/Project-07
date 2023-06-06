/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import MiniUser from "./miniUser";
import { getCookie } from "../../../helpers/cookie";
import { useSelector } from "react-redux";
function HeaderNav() {
  const token = getCookie("token");
  const reload = useSelector((state) => state.ReloadReducer);

  return (
    <div className="headerDefault__nav">
      <div className="headerDefault__left">
        <ul>
          <Link to="/">
            <li style={{ marginLeft: "0" }}>Seller Center</li>
          </Link>
          <li>Download</li>
          <li>
            Follow us on
            <span>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
            </span>
            <span>
              <a
                href="https://www.instagram.com//"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </span>
          </li>
        </ul>
      </div>

      <div className="headerDefault__right">
        <ul>
          <li>Support</li>
          {token ? (
            <MiniUser />
          ) : (
            <>
              <Link to="/login">
                <li>Login</li>
              </Link>
              <Link to="/register">
                <li>Register</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
export default HeaderNav;

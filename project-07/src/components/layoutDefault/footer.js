import { Link } from "react-router-dom";

function FooterDefault() {
  return (
    <>
      <ul>
        <Link to="/about">
          <li>About SnapUp</li>
        </Link>
        <Link to="/policy">
          <li>Privacy Policy</li>
        </Link>
        <li style={{ border: "none" }}>Term of Service</li>
      </ul>
      <p> &copy; 2023 SnapUp Coppyright by Sy Tom</p>
    </>
  );
}
export default FooterDefault;

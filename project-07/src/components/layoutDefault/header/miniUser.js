import { Image, Dropdown } from "antd";
import { Link } from "react-router-dom";
import Logout from "../../../pages/logout";
import avatarImg from "../../../assess/image/avatar.png";
import { useEffect, useState } from "react";
import { getUsersByID } from "../../../services/usersService";
import "./miniUser.scss";
import { useSelector } from "react-redux";
import ProperName from "../../../helpers/properName";

function MiniUser() {
  const [profileInfo, setProfileInfo] = useState([]);
  const reload = useSelector((state) => state.ReloadReducer);

  const getApi = async () => {
    const response = await getUsersByID();
    setProfileInfo(response);
  };

  useEffect(() => {
    getApi();
  }, [reload]);

  const items = [
    {
      label: <Link to="/profile">My account</Link>,
      key: "0",
    },
    {
      label: <Link to="/userPurchase">My Purchase</Link>,
      key: "1",
    },
    {
      label: <Logout />,
      key: "2",
    },
  ];

  return (
    <div className="miniUser">
      <Dropdown
        menu={{
          items,
        }}
      >
        <li>
          {profileInfo && (
            <>
              <div className="miniUser__avatarImg">
                <Image
                  preview = {false}
                  src={profileInfo.avatarSrc ? profileInfo.avatarSrc : avatarImg }alt=""
                />
              </div>
              <p>{ProperName(profileInfo.name)}</p>
            </>
          )}
        </li>
      </Dropdown>
    </div>
  );
}
export default MiniUser;

import Image from "next/image";

import FeatherIconCom from "CommonElements/Icons/FeatherIconCom";
import React, { useContext } from "react";
import { FaUser } from "react-icons/fa6";
import { Logout } from "../../../../utils/Constant/index";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { UserContext } from "../../../../helper/User";

const Profile = () => {
  const router = useRouter();
  const { user, logout } = useContext(UserContext);

  const handleLogOut = () => {
    Cookies.remove("token");
    router.push("/authentication/login");
  };
  return (
    <li className="profile-nav onhover-dropdown pe-0 py-0">
      <div className="media profile-media">
        <Image
          className="b-r-10"
          src="/assets/images/dashboard/profile.png"
          alt=""
          width={40}
          height={35}
        />{" "}
        <div className="media-body">
          <span>
            {user?.name} {user?.lastName}
          </span>
          <p className="mb-0 font-roboto">
            {user?.idRole?.name} <i className="middle fa fa-angle-down" />
          </p>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        {/*{profileListData &&*/}
        {/*  profileListData.map((item, index) => (*/}
        {/*    <li key={index}>*/}
        {/*      <Link href={item.path}>*/}
        {/*        <FeatherIconCom iconName={item.icon} />*/}
        {/*        <span>{item.text} </span>*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*  ))}*/}
        <li onClick={handleLogOut}>
          <a href="#123">
            <FeatherIconCom iconName={"LogIn"} />
            <span>Cerrar Sesión</span>
          </a>
        </li>
      </ul>
    </li>
  );
};

export default Profile;

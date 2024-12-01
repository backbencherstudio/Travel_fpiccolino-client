import React from "react";
import logo from "../assets/logo.svg";
import ParentComponent from "../Components/ParentComponent/ParentComponent";

const Footer = () => {
  return (
    <div className="bg-black">
      <ParentComponent>
        <div className="grid grid-cols-3">
          <div>
            <img src={logo} alt="" />
          </div>
          <div className=""></div>
          <div></div>
        </div>
      </ParentComponent>
    </div>
  );
};

export default Footer;

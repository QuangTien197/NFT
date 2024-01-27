import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./HelpCenter.module.css";

const HelpCenter = () => {
  const helpCenter = [
    {
      name: "About",
      link: "aboutus",
    },
    {
      name: "Contact Us",
      link: "contactus",
    },
    {
      name: "Sign Up",
      link: "signUp",
    },
    {
      name: "LogIn",
      link: "login",
    },
    {
      name: "Subscription",
      link: "subscription",
    },
  ];
  const handleClick = (path) => {
    // Xử lý các thao tác cần thiết trước khi chuyển trang (nếu cần)
    // ...

    // Chuyển trang
    window.location.href = path;
  };
  return (
    <div className={Style.box}>
      {helpCenter.map((el, i) => (
        <div key={i + 1} className={Style.helpCenter}>
          <Link href={{ pathname: `/${el.link}` }}>
            <a onClick={() => handleClick(`/${el.link}`)}>{el.name}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HelpCenter;

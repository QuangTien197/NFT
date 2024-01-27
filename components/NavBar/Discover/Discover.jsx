import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = () => {
  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "Search",
      link: "searchPage",
    },
    {
      name: "Author Profile",
      link: "author",
    },
    {
      name: "Account Setting",
      link: "account",
    },
    {
      name: "Upload NFT",
      link: "uploadNFT",
    },
    {
      name: "Connect Wallet",
      link: "connectWallet",
    },
  ];

  const handleClick = (path) => {
    // Xử lý các thao tác cần thiết trước khi chuyển trang (nếu cần)
    // ...

    // Chuyển trang
    window.location.href = path;
  };

  return (
    <div>
      {discover.map((el, i) => (
        <div key={i + 1} className={Style.discover}>
          <Link href={{ pathname: `/${el.link}` }}>
            <a onClick={() => handleClick(`/${el.link}`)}>{el.name}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;

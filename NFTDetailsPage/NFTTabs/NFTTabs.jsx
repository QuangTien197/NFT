import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./NFTTabs.module.css";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NFTTabs = ({ dataTab, icon, nft }) => {
  const {  getAuction } = useContext(NFTMarketplaceContext)
  const [bid, setBid] = useState("");
const [bidder, setBidder] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAuctions = await getAuction(nft.tokenId);
        console.log(123123, getAuctions);
        setBid(getAuctions.bid)
        setBidder(getAuctions.bidder)

      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // Các công việc khác bạn muốn thực hiện sau khi fetchData đã hoàn thành ở đây.
  }, [ ]);
  return (
    <div className={Style.NFTTabs}>
      {dataTab.map((el, i) => (
        <div className={Style.NFTTabs_box} key={i + 1}>
          <Image
            src={el}
            alt="profile image"
            width={40}
            height={40}
            className={Style.NFTTabs_box_img}
          />
          <div className={Style.NFTTabs_box_info}>
            <span>
              Offer by {bid} by <br></br>
              {icon}
            </span>
            <span>{bidder}</span>
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTTabs;

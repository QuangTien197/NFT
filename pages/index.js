import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSilder,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader
} from "../components/componentsindex";
//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";


const Home = () => {
  const {  fetchNFTs } = useContext(NFTMarketplaceContext)



//   useEffect(() => {
//     checkIfWalletConnected()
//   }, [])

  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);


  useEffect(() => {
    fetchNFTs().then((item) => {
      if (item == undefined) {
        item = []
        setNfts(item.reverse())
        setNftsCopy(item)
      }
      setNfts(item.reverse());
      setNftsCopy(item);
    })
  }, [])
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSilder />
      {/* <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive /> */}
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}
      <FollowerTab />
      {/* <Slider /> */}
      {/* <Collection /> */}


      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      {/* <Subscribe /> */}
      {/* <Brand /> */}
      {/* <Video /> */}
    </div>
  );
};

export default Home;

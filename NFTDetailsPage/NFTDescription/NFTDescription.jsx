import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar } from "react-icons/bi";

import { Modal } from 'react-bootstrap';
import Styles from '../../components/Error/Error.module.css'
import formStyle from "../../AccountPage/Form/Form.module.css"



//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";
import { NFTTabs } from "../NFTDetailsIndex";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
//INTERNAL IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NFTDescription = ({ nft, icon }) => {
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);
  const [owners, setOwners] = useState(false);




  const [isOpen, setIsModalOpen] = useState(false);
  const [isOpen1, setIsModalOpen1] = useState(false);
  const [isOpen2, setIsModalOpen2] = useState(false);
  const [isOpen3, setIsModalOpen3] = useState(false);

  // ----change price-----
  const openModal = () => {
    setIsModalOpen(true);
  }; 

  const closeModal = () => {
    setIsModalOpen(false);
  };


    // ----transfer-----
  const openModalTransfer = () => {
    setIsModalOpen1(true);
  };

  const closeModalTransfer = () => {
    setIsModalOpen1(false);
  };


    // ----place a bid-----
  const openModalBid = () => {
    setIsModalOpen2(true);
  };

  const closeModalBid = () => {
    setIsModalOpen2(false);
  };


    // ----resell-----
  const openModalSell = () => {
    setIsModalOpen3(true);
  };

  const closeModalSell = () => {
    setIsModalOpen3(false);
  };


  const { buyNFT, currentAccount, deleteItem, joinAuction, getAuction, changePrice, transferNFT, createSale } = useContext(NFTMarketplaceContext)
  // console.log(nft)
  const router = useRouter()


  const provananceArray = [
    images.user6,
    images.user7,
    images.user8,
    images.user9,
    images.user10,
  ];
  const ownerArray = [
    images.user1,
    images.user8,
    images.user2,
    images.user6,
    images.user5,
  ];

  const openSocial = () => {
    if (!social) {
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
      setSocial(false);
    } else {
      setNFTMenu(false);
    }
  };

  const openTabs = (e) => {
    const btnText = e.target.innerText;

    if (btnText == "Bid History") {
      setHistory(true);
      setProvanance(false);
      setOwner(false);
    } else if (btnText == "Provanance") {
      setHistory(false);
      setProvanance(true);
      setOwner(false);
    }
  };

  const openOwmer = () => {
    if (!owner) {
      setOwner(true);
      setHistory(false);
      setProvanance(false);
    } else {
      setOwner(false);
      setHistory(true);
    }
  };




  // const handleLinkClickTransfer = (owner, tokenId) => {
  //   router.push(`/transferNFT?owner=${owner}&tokenId=${tokenId}`)
  // };
  // const { id } = router.query
  const deleteNFT = async (id) => {
    try {
      console.log(id)
      await deleteItem(id);

    } catch (error) {
      console.log('Error delete', error)
    }

  }

  // ---------get auction---------------------
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
  }, [nft.tokenId]);



  // Chang Price-------------------------------------------------------------
  // Assuming you have a changePrice function in your context
  const [price, setPrice] = useState(0); // Corrected initialization
  const [image, setImage] = useState("");
  const changePrices = async () => {
    try {
      console.log(nft.tokenId)
      await changePrice(price, nft.tokenId);
      // router.push('/author');
    } catch (error) {
      console.error('Error changing price', error);
    }
  };

  // TRansfer NFT -----------------------------------------
  const [priceBid, setPriceBid] = useState("")
  const [address, setAddress] = useState("")
  const transfer = async () => {
    try {
      await transferNFT(address, nft.tokenId);
      router.push('/author')
    } catch (error) {
      console.log('Erro transfer', error.message)
    }

  }

  // ------------Place ABId------------------------------------

  const joinAuctions = async () => {
    try {
        // console.log(price, id)
        await joinAuction(nft.tokenId, priceBid);
        // router.push('/author')
    } catch (error) {
        console.log('Erro transfer', error.message)
    }

  }

  // ----------ReSell-----------------------------------------
  const { tokenURI } = router.query
  const [priceSell, setPriceSell] = useState("")
  const reSell = async () => {
    try {

      const url = decodeURIComponent(tokenURI);
        await createSale(url, priceSell, true, nft.tokenId);
        router.push('/author')
    } catch (error) {
        console.log('Erro resell', error.message)
    }

  }

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>

        {/* //Part ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual Worlds</p>
          <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openSocial()}
            />

            {social && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <TiSocialFacebook /> Facebooke
                </a>
                <a href="#">
                  <TiSocialInstagram /> Instragram
                </a>
                <a href="#">
                  <TiSocialLinkedin /> LinkedIn
                </a>
                <a href="#">
                  <TiSocialTwitter /> Twitter
                </a>
                <a href="#">
                  <TiSocialYoutube /> YouTube
                </a>
              </div>
            )}

            <BsThreeDots
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openNFTMenu()}
            />

            {currentAccount == nft.seller.toLowerCase() ? (
              <>
                {NFTMenu && (
                  <div className={Style.NFTDescription_box_share_box_social}>
                    <a onClick={openModal}>
                      {/* <a href="#" onPress={onOpen}> */}
                      <BiDollar /> Change price
                    </a>
                    <a onClick={() => deleteNFT(nft.tokenId)}>
                      <MdOutlineDeleteSweep /> Delete item
                    </a>

                  </div>
                )}
              </>
            ) : currentAccount == nft.owner.toLowerCase() ? (
              <>
                {NFTMenu && (
                  <div className={Style.NFTDescription_box_share_box_social}>
                    <a onClick={openModalTransfer}>
                      <BiTransferAlt
                      // onClick={handleLinkClickTransfer(currentAccount, nft.tokenId)} 
                      /> Transfer
                    </a>

                  </div>

                )}

              </>
            ) : (
              null
            )}


          </div>
        </div>
        {/* //Part TWO */}
        <div className={Style.NFTDescription_box_profile}>
          <h1>{nft.name} #{nft.tokenId}</h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image
                src={images.user1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Creator</small> <br />
                <Link href={{ pathname: "/author", query: `${nft.seller}` }}>
                  <span>
                    Karli Costa <MdVerified />
                  </span>
                </Link>

              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_box_right}>
              <Image
                src={images.creatorbackground1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />

              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>Collection</small> <br />
                <span>
                  Trex app <MdVerified />
                </span>
              </div>
            </div>
          </div>

          <div className={Style.NFTDescription_box_profile_biding}>
            <p>
              <MdTimer /> <span>Auction ending in:</span>
            </p>
            { }
            <div className={Style.NFTDescription_box_profile_biding_box_timer}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>2</p>
                <span>Days</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>22</p>
                <span>hours</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>45</p>
                <span>mins</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>12</p>
                <span>secs</span>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Current Bid</small>
                <p>
                  {nft.price} TREX <span>( ≈ $3,221.22)</span>
                </p>
              </div>

              <span>[96 in stock]</span>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>

              {currentAccount == nft.seller.toLowerCase() ? (
                <p>You cannot buy your own NFT</p>
              ) : currentAccount == nft.owner.toLowerCase() ? (
                <Button
                  icon=<FaWallet />
                  btnName="List on MarketPlace"
                  handleClick={() => openModalSell()}
                  classStyle={Style.button}
                />
              ) : nft.list == "true" ? (
                <Button
                  icon=<FaWallet />
                  btnName="Buy NFT"
                  handleClick={() => buyNFT(nft)}
                  classStyle={Style.button}
                />
              ) : nft.bid == "true" ? (
                <div>
                  <Button
                    icon=<FaWallet />
                    btnName="Place a bid"
                    handleClick={() =>  openModalBid() }
                    classStyle={Style.button}
                  />
                </div>


              ) : (
                <p>
                  This is not your NFT
                </p>
              )}

              {currentAccount == nft.seller.toLowerCase() ? (
                <p>
                  {/* You cannot buy your own NFT */}
                </p>
              ) : currentAccount == nft.owner.toLowerCase() ? (
                <Button
                  icon=<FaWallet />
                  btnName="Auction"
                  handleClick={() => router.push(`/aBid?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                  classStyle={Style.button}
                />
              ) : nft.list == "true" ? (
                <Button
                  icon=<FaPercentage />
                  btnName="Make offer"
                  handleClick={() => { }}
                  classStyle={Style.button}
                />
              ) : nft.bid == "true" ? (
                <Button
                  icon=<FaPercentage />
                  btnName="Make offer"
                  handleClick={() => { }}
                  classStyle={Style.button}
                />
              ) : (
                <p>
                  {/* This is not your NFT */}
                </p>
              )}



            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
              <button onClick={(e) => openTabs(e)}>Bid History</button>
              <button onClick={(e) => openTabs(e)}>Provanance</button>
              <button onClick={() => openOwmer()}>Owner</button>
            </div>

            {history && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <div className={Style.NFTTabs_box}>
                  <Image
                    src={images.user1}
                    alt="profile image"
                    width={40}
                    height={40}
                    className={Style.NFTTabs_box_img}
                  />
                  <div className={Style.NFTTabs_box_info}>
                    <span>
                      Offer by {bid} TREX by <br></br>
                      {icon}
                    </span>
                    <span>{bidder}</span>

                  </div>
                </div>
              </div>
            )}
            {provanance && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={provananceArray} />
              </div>
            )}

            {owner && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={ownerArray} icon=<MdVerified /> />
              </div>
            )}
          </div>
        </div>

      </div>
      // ---------Modal ChangePrice--------------------------------
      <Modal show={isOpen} onHide={closeModal} centered className={Styles.modal} >
        <div className={Styles.modal_box}>
          <Modal.Header >
            <Modal.Title>Change Price Your Token, Set Price</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <div className={formStyle.Form_box_input}>
              <label htmlFor="name">Price</label>
              <input
                type="number"
                min={0.001}
                placeholder="Change Price"
                className={formStyle.Form_box_input_userName}
                onChange={(e) => setPrice(e.target.value)}
              />

            </div>

          </Modal.Body>
          <Modal.Footer>
            <div className={Style.footer}>
              <button onClick={closeModal} className={Style.button_modal}>
                Close
              </button>
              <button onClick={changePrices} className={Style.button_modal1}>
                Change
              </button>
            </div>

          </Modal.Footer>
        </div>

      </Modal>


      // ---------Modal Transfer--------------------------------
      <Modal show={isOpen1} onHide={closeModalTransfer} centered className={Styles.modal} >
        <div className={Styles.modal_box}>
          <Modal.Header >
            <Modal.Title>Transfer Your Token</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <div className={formStyle.Form_box_input}>
              <label htmlFor="name">Address</label>
              <input
                type="text"
                placeholder="Address"
                className={formStyle.Form_box_input_userName}
                onChange={(e) => setAddress(e.target.value)}
              />

            </div>

          </Modal.Body>
          <Modal.Footer>
            <div className={Style.footer}>
              <button onClick={closeModalTransfer} className={Style.button_modal}>
                Close
              </button>
              <button onClick={transfer} className={Style.button_modal1}>
                Transfer NFT
              </button>
            </div>

          </Modal.Footer>
        </div>

      </Modal>


     // ---------Modal Place ABid--------------------------------
     <Modal show={isOpen2} onHide={closeModalBid} centered className={Styles.modal} >
     <div className={Styles.modal_box}>
       <Modal.Header >
         <Modal.Title>Make Offer or Join Auction</Modal.Title>
       </Modal.Header>
       <Modal.Body >
         <div className={formStyle.Form_box_input}>
           <label htmlFor="name">Price</label>
           <input
            type="number"
            min={0.001}
            placeholder="Price"
            className={formStyle.Form_box_input_userName}
             onChange={(e) => setPriceBid(e.target.value)}
           />

         </div>

       </Modal.Body>
       <Modal.Footer>
         <div className={Style.footer}>
           <button onClick={closeModalBid} className={Style.button_modal}>
             Close
           </button>
           <button onClick={joinAuctions} className={Style.button_modal1}>
             Place Bid
           </button>
         </div>

       </Modal.Footer>
     </div>

     </Modal>        


    //-----------Modal ReSell----------------------------------
    <Modal show={isOpen3} onHide={closeModalBid} centered className={Styles.modal} >
    <div className={Styles.modal_box}>
      <Modal.Header >
        <Modal.Title>ReSell Your Token, Set Price</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Price</label>
          <input
           type="number"
           min={0.001}
           placeholder="ReSell price"
           className={formStyle.Form_box_input_userName}
            onChange={(e) => setPriceSell(e.target.value)}
          />

        </div>

      </Modal.Body>
      <Modal.Footer>
        <div className={Style.footer}>
          <button onClick={closeModalSell} className={Style.button_modal}>
            Close
          </button>
          <button onClick={reSell} className={Style.button_modal1}> 
            Resell NFT
          </button>
        </div>

      </Modal.Footer>
    </div>

    </Modal>
    </div >
  );
};

export default NFTDescription;

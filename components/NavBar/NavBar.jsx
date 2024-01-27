import React, { useEffect, useState, useContext, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
//----IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import { useRouter } from "next/router";
//----IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button } from "../componentsindex";
import images from "../../img";
import Error from "../Error/Error";
import ModalWallet from "./ModalWallet/ModalWallet";

const NavBar = () => {
  //----USESTATE COMPONNTS
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [ethBalance, setEthBalance] = useState(null);

  const discoverMenuRef = useRef(null);
  const helpMenuRef = useRef(null);
  const navbarRef = useRef(null);

  const router = useRouter()



  // close menu
  const openDiscoverMenu = () => {
    setDiscover(!discover);
    setHelp(false);
  };

  const openHelpMenu = () => {
    setDiscover(false);
    setHelp(!help);
  };



  // ------------------------------------
  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };



  const closeMenus = (e) => {
    if (discoverMenuRef.current && !discoverMenuRef.current.contains(e.target)) {
      setDiscover(false);
    }

    if (helpMenuRef.current && !helpMenuRef.current.contains(e.target)) {
      setHelp(false);
    }

    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeMenus);

    return () => {
      document.removeEventListener('mousedown', closeMenus);
    };
  }, []);
  //SMART CONTRACT
  const { currentAccount, connectWallet, openError, checkEthBalance } = useContext(NFTMarketplaceContext)
  const handleClick = () => {
    // Xử lý các thao tác cần thiết trước khi chuyển trang (nếu cần)
    // ...

    // Chuyển trang
    router.push('/');
  };

  const fetchData = async () => {
    try {
      const eth = await checkEthBalance();
      // console.log(123, eth);
      setEthBalance(eth);
    } catch (error) {
      console.error('Lỗi khi lấy số dư ETH:', error);
    }
  };

  useEffect(() => {
    if (currentAccount) {
      fetchData();
    }
  }, [currentAccount]);


  const [isOpen1, setIsModalOpen1] = useState(false);
  const openModal1 = () => {
    if (!isOpen1) {
      setIsModalOpen1(true);
    } else {
      setIsModalOpen1(false);
    }
    // setIsModalOpen(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  return (
    <div className={Style.navbar} ref={navbarRef}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image
              src={images.logo}
              alt="NFT MARKET PLACE"
              width={100}
              height={100}
              onClick={handleClick}
            />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => { }} className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* //END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            {/* DISCOVER MENU */}
            <p onClick={(e) => openDiscoverMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* HELP CENTER MENU */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openHelpMenu(e)}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>

          {/* CREATE BUTTON SECTION */}
          {/* <div className={Style.navbar_container_right_button}>
            {currentAccount === "" ? (
              <select
                value={selectedWalletType}
                onChange={(e) => connectWallet(e.target.value)}
              >
                <option value="" disabled>Select a Wallet</option>
                {supportedWallets.map((wallet) => (
                  <option key={wallet.type} value={wallet.type}>
                    {wallet.name}
                  </option>
                ))}
              </select>
            ) : (
              <Button
                btnName="Create"
                handleClick={() => router.push('/uploadNFT')}
              />
            )}
          </div> */}

          {/* USER PROFILE */}
          <div className={Style.navbar_container_right_button}>
            {
              currentAccount == "" ? (
                <div className={Style.navbar_container_right_help}>
                  <p onClick={(e) => openModal1()}>Select Wallet</p>
                  {isOpen1 && (
                    // className={Style.navbar_container_right_help_box}
                    <div onClick={closeModal1}>
                      <ModalWallet
                        className={Style.modal_box}
                        isOpen={isOpen1}
                        closeModal={closeModal1}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className={Style.navbar_container_box_profile}>
                  <div>
                    <Image
                      src={images.user1}
                      alt="Profile"
                      width={40}
                      height={40}
                      // onClick={() => openProfile()}
                      className={Style.navbar_container_right_profile}
                    />
                  </div>
                  <div className={Style.navbar_container_box_profile_info}>
                    <small>{currentAccount.slice(0, 10)}...{currentAccount.slice(35, 42)}</small><br />
                    <small>{ethBalance} ETH</small>
                  </div>
                  {/* {profile && <Profile currentAccount={currentAccount} />} */}
                </div>
              )
            }

          </div>
          {/* <div className={Style.navbar_container_right_profile_box}>
            {
              currentAccount == "" ? (
                <div className={Style.navbar_container_right_profile}>
                </div>
              ) : (
                <div className={Style.navbar_container_right_profile}>
                  <Image
                    src={images.user1}
                    alt="Profile"
                    width={40}
                    height={40}
                    onClick={() => openProfile()}
                    className={Style.navbar_container_right_profile}
                  />

                  {profile && <Profile currentAccount={currentAccount} />}
                </div>
              )
            }

          </div> */}

          {/* MENU BUTTON */}

          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>

      {/* SIDBAR CPMPONE/NT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar
            setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet} />
        </div>
      )}

      {openError && <Error />}
      {/* <Error/> */}

    </div>
  );
};

export default NavBar;

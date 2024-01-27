//IMPORT MODAL
import { Modal } from 'react-bootstrap';
// import GoogleIcon from '@mui/icons-material/Google';
// import AppleIcon from '@mui/icons-material/Apple';
import React,{useContext} from "react";
import Link from "next/link";
import Image from "next/image";
// import StyleButton from "../../../NFTDetailsPage/NFTDescription/NFTDescription";

//INTERNAL IMPORT
import Style from "./Wallet.module.css";

// import { useSession, signIn, signOut } from "next-auth/react"

import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

import images from '../../../img';
// import Img from '../../../img';
const ModalWallet = ({ isOpen, closeModal }) => {

    

    // const { data: session } = useSession()


    const { currentAccount, connectWallet,supportedWallets,setSelectedWalletType,selectedWalletType } = useContext(NFTMarketplaceContext)


    const handleMetamask = async () => {
        
        const a = "metamask";
        connectWallet(a)
          };
        const handlePhantom = () => {
            const b = "phantom";
            connectWallet(b)
        }
        const handleRabby = () => {
            const c = "rabby";
            connectWallet(c)
        }
    //--------DISCOVER NAVIGATION MENU
    return (
        <Modal show={isOpen} onHide={closeModal} centered className={Style.modal}>
            <div className={Style.modal_box}>
                <Modal.Header>
                    <Modal.Title><h1>Login</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={Style.socialLogin}>
                        <button onClick={() => handleMetamask()} className={Style.button_modal}>
                        <Image
                            src={images.meta}
                            alt="Metamask"
                            width={50}
                            height={50}
                            />
                           <p style={{marginLeft:"20px"}}>Metamask</p>
                        </button>
                        <button onClick={handlePhantom} className={Style.button_modal1}>
                        <Image
                            src={images.pt}
                            alt="Phantom"
                            width={50}
                            height={50}
                          
                            />  
                            <p style={{marginLeft:"20px"}}>Phantom</p>
                        </button>
                        <button onClick={handleRabby} className={Style.button_modal1}>
                        <Image
                            src={images.rabby}
                            alt="rabby"
                            width={50}
                            height={50}
                          
                            /> 
                            <p style={{marginLeft:"20px"}}>Rabby</p>
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default ModalWallet;

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import Image from "next/image";
import Web3 from "web3";
//INTERNAL IMPORT
import Style from "../styles/reSellToken.module.css";
import formStyle from "../AccountPage/Form/Form.module.css"
import { Button } from "../components/componentsindex"

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import { ST } from "next/dist/shared/lib/utils";

const placeAbid = () => {
    const { joinAuction} = useContext(NFTMarketplaceContext)
    const [price, setPrice] = useState('"')
    // const [time, setTime] = useState('"')
    const [image, setImage] = useState("")
    const router = useRouter()
    const { id, tokenURI } = router.query

    const fetchNFT = async () => {
        if (!tokenURI) return
        const { data } = await axios.get(tokenURI);

        setImage(data.image)
    }

    useEffect(() => {
        fetchNFT()
    }, [id]);
    // 
    const joinAuctions = async () => {
        try {
            // console.log(price, id)
            await joinAuction(id, price);
            // router.push('/author')
        } catch (error) {
            console.log('Erro transfer', error.message)
        }

    }


    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    useEffect(() => {
        const fetchWalletData = async () => {
          try {
          
            // Kiểm tra xem trình duyệt có hỗ trợ Web3 không
            if (typeof window.ethereum !== 'undefined') {
              // Tạo một đối tượng Web3
         
              const web3 = new Web3(window.ethereum);
             
              // Yêu cầu quyền kết nối với MetaMask
              await window.ethereum.request({ method: 'eth_requestAccounts' });
           
              // Lấy địa chỉ và số dư của ví
              const currentAccount = window.ethereum.selectedAddress;
             
              setAccount(currentAccount);
    
              const balanceInWei = await web3.eth.getBalance(currentAccount);
     
              const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
      
              setBalance(balanceInEther);
            } else {
              console.error('Web3 không được hỗ trợ trong trình duyệt này');
            }
          } catch (error) {
            console.error('Lỗi khi lấy thông tin ví:', error);
          }
        };
    
        fetchWalletData();
      }, []); // useEffect sẽ chạy chỉ một lần khi component được tạo ra
    return (
       
         <div className={Style.reSellToken}>
         <div className={Style.reSellToken_box}>
             <h1>Make Offer or Create Auction</h1>


             <div className={Style.reSellToken_box_image}>
                 {
                     image && <Image src={image} alt="Transfer NFT" width={400} height={400}></Image>
                 }

             </div>
             <div>
                <ul>
                    <div> </div>
                </ul>
             </div>
             <div className={formStyle.Form_box_input}>
                 <label htmlFor="name"></label>
                 <input
                     type="number"
                     min={0.001}
                     placeholder="Price"
                     className={formStyle.Form_box_input_userName}
                     onChange={(e) => setPrice(e.target.value)}
                 /> 
             </div>

             <div className={Style.reSellToken_box_btn}>
                 <Button btnName="Place Bid" handleClick={() => joinAuctions()}></Button>
             </div>
         </div>

     </div>
    )
}
export default placeAbid
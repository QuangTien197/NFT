import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import Image from "next/image";
//INTERNAL IMPORT
import Style from "../styles/reSellToken.module.css";
import formStyle from "../AccountPage/Form/Form.module.css"
import { Button } from "../components/componentsindex"

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import { ST } from "next/dist/shared/lib/utils";

const transferNFT = () => {
    const { createSale, transferNFT } = useContext(NFTMarketplaceContext)
    const [address, setAddress] = useState('"')
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
    const transfer = async () => {
        try {
            await transferNFT(address, id);
            router.push('/author')
        } catch (error) {
            console.log('Erro transfer', error.message)
        }

    }

    return (
        <div className={Style.reSellToken}>
            <div className={Style.reSellToken_box}>
                <h1>Transfer Your Token</h1>
                <div className={formStyle.Form_box_input}>
                    <label htmlFor="name">Address</label>
                    <input
                        type="text"
                        placeholder="Address"
                        className={formStyle.Form_box_input_userName}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className={Style.reSellToken_box_image}>
                    {
                        image && <Image src={image} alt="Transfer NFT" width={400} height={400}></Image>
                    }

                </div>

                <div className={Style.reSellToken_box_btn}>
                    <Button btnName="Transfer NFT" handleClick={() => transfer()}></Button>
                </div>
            </div>

        </div>
    )
}
export default transferNFT
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

const changePrice = () => {
    const { changePrice } = useContext(NFTMarketplaceContext); // Assuming you have a changePrice function in your context
    const [price, setPrice] = useState(0); // Corrected initialization
    const [image, setImage] = useState("");
    const router = useRouter();
    const { id, tokenURI } = router.query;

    const fetchNFT = async () => {
        if (!tokenURI) return;
        try {
            const { data } = await axios.get(tokenURI);
            setImage(data.image);
        } catch (error) {
            console.error('Error fetching NFT', error);
        }
    };

    useEffect(() => {
        fetchNFT();
    }, [id, tokenURI]);

    const changePrices = async () => {
        try {
            await changePrice( price, id);
            // router.push('/author');
        } catch (error) {
            console.error('Error changing price', error);
        }
    };

    return (
        <div className={Style.reSellToken}>
            <div className={Style.reSellToken_box}>
                <h1>Change Price Your Token, Set Price</h1>
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

                <div className={Style.reSellToken_box_image}>
                    {image && <Image src={image} alt="Change Price NFT" width={400} height={400} />}
                </div>

                <div className={Style.reSellToken_box_btn}>
                    <Button btnName="Change Price NFT" handleClick={changePrices} />
                </div>
            </div>
        </div>
    );
}
export default changePrice
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

const aBid = () => {
    const { createSale, transferNFT, createAuction } = useContext(NFTMarketplaceContext)
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
    const creAuction = async () => {
        try {
            console.log(price, id)
            await createAuction(id, price, customDate);
            // router.push('/author')
        } catch (error) {
            console.log('Erro transfer', error.message)
        }

    }

    const [selectedOption, setSelectedOption] = useState('');
    const [customDate, setCustomDate] = useState('');

    const handleSelectChange = (value) => {
        setSelectedOption(value);

        // Perform different actions based on the selected option
        if (value === 'option1') {
            // Handle 12 hours
            const currentDate = new Date();
            setCustomDate(currentDate.toISOString().split('T')[0]);
        } else if (value === 'option2') {
            // Handle 1 day
            const nextDay = new Date();
            nextDay.setDate(nextDay.getDate() + 1);
            setCustomDate(nextDay.toISOString().split('T')[0]);
        } else if (value === 'option3') {
            // Handle 3 days
            const threeDaysLater = new Date();
            threeDaysLater.setDate(threeDaysLater.getDate() + 3);
            setCustomDate(threeDaysLater.toISOString().split('T')[0]);
        } else if (value === 'option4') {
            // Handle 7 days
            const sevenDaysLater = new Date();
            sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
            setCustomDate(sevenDaysLater.toISOString().split('T')[0]);
        } else if (value === 'option5') {
            // Handle 1 month
            const oneMonthLater = new Date();
            oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
            setCustomDate(oneMonthLater.toISOString().split('T')[0]);
        } else {
            // Handle other options or custom date
            setCustomDate('');
        }
    };


    return (
        <div className={Style.reSellToken}>
            <div className={Style.reSellToken_box}>
                <h1>Transfer Your Token</h1>


                <div className={Style.reSellToken_box_image}>
                    {
                        image && <Image src={image} alt="Transfer NFT" width={400} height={400}></Image>
                    }

                </div>
                <div className={formStyle.Form_box_input}>
                    <label htmlFor="name">Address</label>
                    <input
                        type="number"
                        min={0.001}
                        placeholder="reSell price"
                        className={formStyle.Form_box_input_userName}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className={formStyle.Form_box_input_select}>
                    <select
                className={formStyle.Form_box_input_userName}
                onChange={(e) => handleSelectChange(e.target.value)}
            >
                <option value="option1">12 hours</option>
                <option value="option2">1 day</option>
                <option value="option3">3 days</option>
                <option value="option4">7 days</option>
                <option value="option5">1 month</option>
                <option value="option6">Custom date</option>
            </select>
            {selectedOption ? (
                <input
                    type="date"
                    placeholder="Time"
                    className={formStyle.Form_box_input_userName}
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                />
            ) : null}
                    </div>

                </div>

                <div className={Style.reSellToken_box_btn}>
                    <Button btnName="Place A Bid" handleClick={() => creAuction()}></Button>
                </div>
            </div>

        </div>
    )
}
export default aBid
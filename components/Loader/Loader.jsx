import React from "react";
import Style from "./Loader.module.css";
import Image from "next/image";

import images from "../../img"
const Loader = () => {
    return (
        <div className={Style.Loader}>
            <div className={Style.Loader_box}>
                <div className={Style.Loader_box_img}>
                    <Image src={images.logo}
                        alt="loading"
                        width={200}
                        height={200}
                        className={Style.Loader_box_img_img}
                        objectFit="cover"
                    ></Image>
                </div>
            </div>
        </div>
    )
}

export default Loader
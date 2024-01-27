  import React from "react";

  //INTERNAL IMPORT
  import Style from "./Button.module.css";
  import useModal from '../../pages/useModal.js';

  const Button = ({ btnName, handleClick, icon, classStyle }) => {
    return (
      <div className={Style.box}>
        <button
          className={`${Style.button} ${classStyle}`}
          onClick={() => handleClick()}
        >
          {icon} {btnName}
        </button>
      </div>
    );
  };

  export default Button;

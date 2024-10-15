import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
import "../css/Style.css"
export const PopupCart = (props) => {
  return (props.trigger) ? (
    <>
    <div className='popup' >
        <div className='popup-inner'>
          <button className='close-btn button-of-popup' onClick={() => props.setTrigger(false)}><IoCloseOutline className='icon-of-popup' /></button>
            
            { props.children }
        </div>
    </div>
    </>
  ) : "";
}

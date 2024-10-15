import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

export const Popup = (props) => {
  return (props.trigger) ? (
    <>
    <div className='popup'>
        <div className='popup-inner'>
          <Link to="/"><button className='close-btn button-of-popup' onClick={() => props.setTrigger(false)}><IoCloseOutline className='icon-of-popup' /></button></Link>
            { props.children }
        </div>
    </div>
    </>
  ) : "";
}

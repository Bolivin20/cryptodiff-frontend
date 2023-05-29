import style from './Button.module.css';
import React from 'react';



function Button(props) {
    const { width, text, disabled, id, type , onClick} = props;

    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };
  
    return (
      <div style={{ width }} className={style.buttonDiv}>
        <button type={type} className={style.bigButton} disabled={disabled} id={id} onClick={handleClick}>
          {text}
        </button>
      </div>
    );
  }
  
  export default Button;
  
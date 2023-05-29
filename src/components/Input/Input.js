import style from './Input.module.css';
import React from 'react';
import Eye from '../../images/eye.svg';



function Input(props) {

    const { placeholder, type, title, inputIcon, width, value, onChange } = props;
    let secondIcon;
    if (type === 'password') {
        secondIcon = <img src={Eye} alt="letter icon"></img>;
    }

    return (
        <div style={{ width: width }}>
            <p className={style.inputTitle}>{title}</p>
            <div className={style.inputContainer}>
                <img src={inputIcon} alt="letter icon"></img>
                <input type={type} placeholder={placeholder} className={style.inputStyle} value={value} onChange={onChange} />
                {secondIcon}
            </div>
        </div>
    );
}

export default Input;

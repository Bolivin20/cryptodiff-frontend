import style from './Logo.module.css';
import logo from '../../images/logo.svg';
import React from 'react';


function Logo(props) {

    const { fontSize, height } = props;

    return (
        <div className={style.logo}>
            <img src={logo} alt="Logo" height={height} />
            <p className={style.logoTitle} style={{ fontSize: fontSize }}>CryptoDiff</p>
        </div>
    );
}

export default Logo;
import style from './Page.module.css';
import Navbar from '../NavBar/NavBar';
import React from 'react';


function Page(props) {

    return (
        <div className={style.app}>
            <Navbar></Navbar>
            {props.children}
        </div>
    );
}

export default Page;
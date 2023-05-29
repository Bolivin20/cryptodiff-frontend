import style from './NavBar.module.css';
import Logo from '../Logo/Logo';
import React from 'react';
import { Link } from 'react-router-dom';

function handleLogout() {
    localStorage.removeItem('token');
    window.location.reload();
}

function NavBar() {

    return (
        <div className={style.menuBar}>
            <Link className={style.logoLink} to='/'><Logo fontSize='2em' height='50em' /></Link>
            <div className={style.tabs}>
            <Link className={style.logoLink} to='/'><p>Ranking</p></Link>
            <Link className={style.logoLink} to='/settings'><p>Settings</p></Link>
            <Link onClick={handleLogout} className={style.logoLink}><p>Log out</p></Link>
            </div>
        </div>
    );
}

export default NavBar;
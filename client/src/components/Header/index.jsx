import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className={styles.headerMainContainerDiv}>
                <div className={styles.firstChildOfHeaderContainer}>
                    <Link to='/'>HOME</Link>
                    <Link to='/about'>ABOUT</Link>
                    <Link to='/contact'>CONTACT</Link>
                    <Link to='/contact'>LOGOUT</Link>
                </div>
                <div className={styles.loginBtnOfHeader}>
                    <Link to='/login'>LOGIN</Link>
                </div>
            </div>
        </>
    )
}

export default Header;
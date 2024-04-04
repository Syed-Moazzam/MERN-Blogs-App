import React, { useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import CustomDrawer from '../CustomDrawer';
import { MdHome, MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaHeadphones } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";


const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    }

    const drawerItems = [
        { icon: MdHome, name: 'Home' },
        { icon: BsFillInfoSquareFill, name: 'About' },
        { icon: FaHeadphones, name: 'Contact' },
        { icon: IoMdAddCircle, name: 'Create Blog' },
        { icon: FaUserCircle, name: 'Profile' },
        { icon: MdOutlineLogin, name: 'Login' },
        { icon: MdOutlineLogout, name: 'Logout' }
    ];

    return (
        <>
            <div className={styles.headerMainContainerDiv}>
                <button className={styles.hamburgerIconOfHeader} onClick={toggleDrawer}><GiHamburgerMenu /></button>
                <div className={styles.loginBtnOfHeader}>
                    <Link to='/login'>LOGIN</Link>
                </div>
            </div>
            <CustomDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} drawerItems={drawerItems} />
        </>
    )
}

export default Header;
import React, { useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import Button from '../Button';
import SearchBar from '../SearchBar';
import CustomDrawer from '../CustomDrawer';
import { MdHome, MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Avatar from '../Avatar';
import { isCookieTokenValid } from '../../api';

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    }

    const drawerItems = [
        { icon: MdHome, name: 'Home', navigateTo: '/' },
        { icon: BsFillInfoCircleFill, name: 'About', navigateTo: '/about' },
        { icon: FaHeadphonesSimple, name: 'Contact', navigateTo: '/contact' },
        { icon: IoMdAddCircle, name: 'Create Blog', navigateTo: '/create-blog' },
        { icon: FaUserCircle, name: 'Profile', navigateTo: '/profile' },
        !isCookieTokenValid() ? { icon: MdOutlineLogin, name: 'Login', navigateTo: '/login' } : { icon: MdOutlineLogout, name: 'Logout' }
    ];

    return (
        <>
            <div className={styles.headerMainContainerDiv}>
                <Button className={styles.hamburgerIconOfHeader} onClick={toggleDrawer}><GiHamburgerMenu /></Button>
                <SearchBar value={searchInput} setter={setSearchInput} type={'text'} placeholder={'Search Blogs By Title Or Category...'} searchBtnText={'Search'} className={styles.searchbarOfHeader} />
                {isCookieTokenValid() && <Avatar className={styles.userAvatarOfHeader} />}
            </div>

            <CustomDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} drawerTitle={'StoryStreamline'} drawerItems={drawerItems} />
        </>
    )
}

export default Header;
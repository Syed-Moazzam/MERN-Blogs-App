import React, { useState } from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
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
import { isCookieTokenValid, logoutApi } from '../../api';
import showToast from '../../utils/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/user/userSlice';

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state?.user);

    const toggleDrawer = (name) => {
        setOpenDrawer(!openDrawer);

        if (name === 'Logout') {
            logoutApi().then((res) => {
                if (res?.data?.status === 'success') {
                    showToast('success', res?.data?.message);
                    dispatch(logout());
                    navigate('/');
                }
            }).catch((err) => {
                showToast('error', err.message);
            });
        }
    }

    const drawerItems = [
        { icon: MdHome, name: 'Home', navigateTo: '/' },
        { icon: BsFillInfoCircleFill, name: 'About', navigateTo: '/about' },
        { icon: FaHeadphonesSimple, name: 'Contact', navigateTo: '/contact' },
        { icon: IoMdAddCircle, name: 'Create Blog', navigateTo: '/create-blog' },
        { icon: FaUserCircle, name: 'Profile', navigateTo: '/user-profile' },
        !isCookieTokenValid() ? { icon: MdOutlineLogin, name: 'Login', navigateTo: '/login' } : { icon: MdOutlineLogout, name: 'Logout' }
    ];

    return (
        <>
            <div className={styles.headerMainContainerDiv}>
                <Button className={styles.hamburgerIconOfHeader} onClick={toggleDrawer}><GiHamburgerMenu /></Button>
                <SearchBar value={searchInput} setter={setSearchInput} type={'text'} placeholder={'Search Blogs By Title Or Category...'} searchBtnText={'Search'} className={styles.searchbarOfHeader} />
                {isCookieTokenValid() && <Avatar img={user?.profileImg} className={styles.userAvatarOfHeader} />}
            </div>

            <CustomDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} drawerTitle={'StoryStreamline'} drawerItems={drawerItems} />
        </>
    )
}

export default Header;
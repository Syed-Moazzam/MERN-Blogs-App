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
import { useSelector } from 'react-redux';
import LogoutModal from '../../modals/LogoutModal';
import useSessionValidation from '../../utils/SessionValidator';

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [showModal, setShowModal] = useState(false);

    const user = useSelector((state) => state?.user);

    const isSessionValid = useSessionValidation();

    const navigate = useNavigate();

    const toggleDrawer = (name) => {
        setOpenDrawer(!openDrawer);

        if (name === 'Logout') {
            setShowModal(true);
        }
    }

    const drawerItems = [
        { icon: MdHome, name: 'Home', navigateTo: '/' },
        { icon: BsFillInfoCircleFill, name: 'About', navigateTo: '/about' },
        { icon: FaHeadphonesSimple, name: 'Contact', navigateTo: '/contact' },
        { icon: IoMdAddCircle, name: 'Create Blog', navigateTo: '/create-blog' },
        { icon: FaUserCircle, name: 'Profile', navigateTo: '/user-profile' },
        !isSessionValid() ? { icon: MdOutlineLogin, name: 'Login', navigateTo: '/login' } : { icon: MdOutlineLogout, name: 'Logout' }
    ];

    return (
        <>
            <div className={styles.headerMainContainerDiv}>
                <Button className={styles.hamburgerIconOfHeader} onClick={toggleDrawer}><GiHamburgerMenu /></Button>
                <SearchBar value={searchInput} setter={setSearchInput} type={'text'} placeholder={'Search Blogs By Title Or Category...'} searchBtnText={'Search'} className={styles.searchbarOfHeader} />
                {isSessionValid() && <Avatar img={user?.profileImg} className={styles.userAvatarOfHeader} onClick={() => navigate('/user-profile')} />}
            </div>

            <CustomDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} drawerTitle={'StoryStreamline'} drawerItems={drawerItems} />

            {showModal && <LogoutModal show={showModal} onHide={setShowModal} />}
        </>
    )
}

export default Header;
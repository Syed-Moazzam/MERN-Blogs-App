import React from 'react';
import styles from './SearchBar.module.css';
import Input from '../Input';
import Button from '../Button';
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = ({ value, setter, type, placeholder, searchBtnText, className }) => {
    return (
        <div className={[className && className, styles.searchbarContainer].join(' ')}>
            <IoSearchSharp className={styles.searchIcon} />
            <Input value={value} setter={setter} type={type} placeholder={placeholder} className={styles.searchbarInput} containerCustomStyle={{ borderBottom: 'none' }} />
            <Button btnText={searchBtnText} className={styles.searchbarButton} />
        </div>
    )
}

export default SearchBar;
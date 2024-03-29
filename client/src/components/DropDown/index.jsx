import React from 'react';
import styles from './DropDown.module.css';

const DropDown = ({ options, value, setter, className }) => {
    return (
        <div className={styles.dropdownContainer}>
            <select value={value} onChange={(e) => setter(e.target.value)} className={[className && className, styles.dropdownComponent].join(' ')}>
                <option value="Select Category">Select Category</option>
                {options?.map((option, key) => {
                    return (
                        <option value={option?.value} key={key}>{option?.label}</option>
                    )
                })}
            </select>
        </div>
    );
};

export default DropDown;

import React from 'react';
import styles from './DropDown.module.css';
import { Dropdown } from 'react-bootstrap';

const DropDown = ({ options, value, setter, defaultValue, variant, clickableOptions, className, disabled }) => {
    return !clickableOptions ? (
        <div className={styles.dropdownContainer}>
            <select value={value} onChange={(e) => setter(e.target.value)} className={[className && className, styles.dropdownComponent, !value && styles.dropdownDefaultOption].join(' ')} disabled={disabled}>
                <option value="">{defaultValue}</option>
                {options?.map((option, key) => {
                    return (
                        <option value={option?.value} key={key}>{option?.label}</option>
                    )
                })}
            </select>
        </div>
    ) :
        (
            <Dropdown>
                <Dropdown.Toggle variant={variant && variant} className={className && className} id="dropdown-basic"></Dropdown.Toggle>

                <Dropdown.Menu>
                    {options?.map((option, index) => {
                        return (
                            <Dropdown.Item key={index} onClick={option?.onClick}>{option?.label}</Dropdown.Item>
                        )
                    })}
                </Dropdown.Menu>
            </Dropdown>
        )
};

export default DropDown;

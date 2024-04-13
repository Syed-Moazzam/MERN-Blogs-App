import React, { useState } from 'react';
import styles from './Input.module.css';
import { IoEye, IoEyeOff } from "react-icons/io5";

const Input = ({ value, setter, type, placeholder, className, disabled, callFrom }) => {
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [inputType, setInputType] = useState('password');

    const toggleInputType = () => {
        setIsEyeOpen((prev) => !prev);
        if (inputType === 'password') setInputType('text');
        else setInputType('password');
    }

    const inputTypeArr = ['file', 'color', 'radio', 'checkbox', 'date', 'submit'];

    return (
        <div className={[!inputTypeArr.includes(type) && styles.inputContainerCustomStyle, styles.inputComponentContainer].join(' ')} style={{ borderBottom: callFrom === 'SearchBar' && 'none' }}>
            <input type={type !== 'password' ? type : inputType} value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder} className={[className && className, styles.inputComponent].join(' ')} disabled={disabled} />

            {type === 'password' && <span className={styles.eyeIconOfInput} onClick={toggleInputType}>{isEyeOpen ? <IoEye /> : <IoEyeOff />}</span>}
        </div>
    )
}

export default Input;
import React from 'react';
import styles from './Input.module.css';

const Input = ({ value, setter, type, placeholder, className }) => {
    return (
        <div className={styles.inputComponentContainer}>
            <input type={type} value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder} className={[className && className, styles.inputComponent].join(' ')} />
        </div>
    )
}

export default Input;
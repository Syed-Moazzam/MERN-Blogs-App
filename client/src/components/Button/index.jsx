import React from 'react';
import styles from './Button.module.css';

const Button = ({ btnText, className, onClick }) => {
    return (
        <div className={styles.btnContainerDiv}>
            <button onClick={onClick} className={[className && className, styles.buttonDefaultStyling].join(' ')}>{btnText}</button>
        </div>
    )
}

export default Button;
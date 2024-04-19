import React from 'react';
import styles from './Button.module.css';
import Loader from '../Loader';

const Button = ({ children, btnText, loading, className, onClick, disabled }) => {
    return (
        <div className={styles.btnContainerDiv}>
            <button onClick={onClick} className={[className && className, styles.buttonDefaultStyling].join(' ')} disabled={loading || disabled}>{loading ? <Loader className={styles.loaderForButton} customStyles={{ width: '25px', height: '25px', borderWidth: '4px' }} /> : children ? children : btnText}</button>
        </div>
    )
}

export default Button;
import React from 'react';
import styles from './Button.module.css';
import Loader from '../Loader';

const Button = ({ btnText, loading, className, onClick }) => {
    return (
        <div className={styles.btnContainerDiv}>
            <button onClick={onClick} className={[className && className, styles.buttonDefaultStyling].join(' ')} disabled={loading}>{loading ? <Loader className={styles.loaderForButton} customStyles={{ width: '28px', height: '28px', borderWidth: '4px' }} /> : btnText}</button>
        </div>
    )
}

export default Button;
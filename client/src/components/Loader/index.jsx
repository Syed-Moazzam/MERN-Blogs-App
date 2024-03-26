import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './Loader.module.css';

const Loader = ({ animation, variant, className, customStyles }) => {
    return (
        <div className={[className && className, styles.loaderContainer].join(" ")}>
            <Spinner animation={animation} variant={variant} className={styles.mainLoader} style={{ ...customStyles }} />
        </div>
    )
}

export default Loader;
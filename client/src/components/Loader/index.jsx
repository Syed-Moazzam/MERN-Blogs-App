import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './Loader.module.css';

const Loader = ({ animation, variant }) => {
    return (
        <div className={styles.loaderContainer}>
            <Spinner animation={animation} variant={variant} className={styles.mainLoader} />
        </div>
    )
}

export default Loader;
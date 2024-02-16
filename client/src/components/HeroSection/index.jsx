import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = ({ img }) => {
    return (
        <div className={styles.heroSectionContainerDiv}>
            <img src={img} alt="" />
        </div>
    )
}

export default HeroSection;
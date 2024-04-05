import React from 'react';
import allImages from '../../constants/imagePath';
import styles from './Avatar.module.css';

const Avatar = ({ img, className }) => {
    return (
        <div className={styles.avatarContainer}>
            <img src={img ? img : allImages?.defaultUserAvatar} alt="" className={[className && className, styles.avatarImage].join(' ')} />
        </div>
    )
}

export default Avatar;
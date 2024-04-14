import React from 'react';
import allImages from '../../constants/imagePath';
import styles from './Avatar.module.css';

const Avatar = ({ img, className, onClick }) => {
    return (
        <div className={[img && styles.avatarContainer].join('')} onClick={onClick}>
            <img src={img ? img : allImages?.defaultUserAvatar} alt="" className={[className && className, styles.avatarImage].join(' ')} />
        </div>
    )
}

export default Avatar;
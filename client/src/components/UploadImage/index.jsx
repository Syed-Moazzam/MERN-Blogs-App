import React, { useRef } from 'react';
import styles from './UploadImage.module.css';
import { FiUpload } from 'react-icons/fi';

const UploadImage = ({ value, setter }) => {
    const imgRef = useRef(null);

    const handleImageSelection = () => {
        imgRef.current.click();
    }

    const handleImageUpload = (e) => {
        const img = e.target.files[0];
        const imgUrl = URL.createObjectURL(img);
        setter(imgUrl);
    }

    return (
        <div className={styles.uploadImageContainer}>
            <input type="file" accept='image/*' ref={imgRef} onChange={handleImageUpload} />
            <button className={value === null ? styles.defaultImgOverlay : styles.uploadImgOverlay} onClick={handleImageSelection}>
                <span><FiUpload className={styles.uploadImgIcon} /></span>
                <span>Upload Image</span>
            </button>
            <img src={value} alt="" />
        </div>
    )
}

export default UploadImage;

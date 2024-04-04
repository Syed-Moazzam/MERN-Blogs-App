import React, { useRef, useState } from 'react';
import styles from './UploadImage.module.css';
import { FiUpload } from 'react-icons/fi';
import Loader from '../Loader';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UploadImage = ({ value, setter, disabled }) => {
    const imgRef = useRef(null);
    const [previewImg, setPreviewImg] = useState('');

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file) {
            setter(file);
            reader.onloadend = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = () => {
        setPreviewImg('');
        setter('');

        if (imgRef.current) {
            imgRef.current.value = '';
        }
    }

    return (
        <div className={styles.uploadImageContainer}>
            <input type="file" accept='image/*' ref={imgRef} onChange={handleImageUpload} disabled={disabled} />
            {!previewImg && <button className={styles.uploadImgOverlay} onClick={() => imgRef.current.click()}>
                <span><FiUpload className={styles.uploadImgIcon} /></span>
                <span>Upload Image</span>
            </button>}

            {previewImg &&
                <>
                    <div className={styles.editOrDeleteImgOverlay}>
                        <button onClick={() => imgRef.current.click()}><FaRegEdit /></button>
                        <button onClick={handleImageDelete}><MdDelete /></button>
                    </div>

                    <img src={previewImg} alt="" className={styles.previewImage} />
                </>
            }
        </div>
    )
}

export default UploadImage;

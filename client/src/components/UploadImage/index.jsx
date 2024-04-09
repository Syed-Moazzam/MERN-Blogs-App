import React, { useRef, useState } from 'react';
import styles from './UploadImage.module.css';
import { FiUpload } from 'react-icons/fi';
import Loader from '../Loader';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from '../Button';

const UploadImage = ({ value, setter, disabled }) => {
    const imgRef = useRef(null);
    const [previewImg, setPreviewImg] = useState('');

    const handleImagePreview = async (e) => {
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
            <input type="file" accept='image/*' ref={imgRef} onChange={handleImagePreview} disabled={disabled} />
            {!previewImg && <Button className={styles.uploadImgOverlay} onClick={() => imgRef.current.click()}>
                <span><FiUpload className={styles.uploadImgIcon} /></span>
                <span>Upload Image</span>
            </Button>}

            {previewImg &&
                <>
                    <div className={styles.editOrDeleteImgOverlay}>
                        <Button onClick={() => imgRef.current.click()}><FaRegEdit /></Button>
                        <Button onClick={handleImageDelete}><MdDelete /></Button>
                    </div>

                    <img src={previewImg} alt="" className={styles.previewImage} />
                </>
            }
        </div>
    )
}

export default UploadImage;

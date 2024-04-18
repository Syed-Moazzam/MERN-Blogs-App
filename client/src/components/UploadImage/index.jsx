import React, { useRef } from 'react';
import styles from './UploadImage.module.css';
import { FiUpload } from 'react-icons/fi';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from '../Button';

const UploadImage = ({ value, setter, previewImg, setPreviewImg, className, disabled, user }) => {
    const imgRef = useRef(null);

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
        <div className={[styles.uploadImageContainer, disabled && styles.disabledUploadImageContainer].join(' ')}>
            <input type="file" accept='image/*' ref={imgRef} onChange={handleImagePreview} />
            {!previewImg && !value && <Button className={[className && className, styles.uploadImgOverlay].join(' ')} onClick={() => imgRef.current.click()}>
                <span><FiUpload className={styles.uploadImgIcon} /></span>
                <span>Upload Image</span>
            </Button>}

            {(previewImg || value) &&
                <>
                    <div className={[className && className, styles.editOrDeleteImgOverlay].join(' ')}>
                        <Button onClick={() => imgRef.current.click()}><FaRegEdit /></Button>
                        <Button onClick={handleImageDelete}><MdDelete /></Button>
                    </div>

                    <img src={typeof value === 'string' ? value : previewImg} alt="" className={[styles.previewImage, user && styles.userPreviewImage].join(' ')} />
                </>
            }
        </div>
    )
}

export default UploadImage;

import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../../components/Button';
import { updateBlog, uploadImageToCloudinary } from '../../api';
import showToast from '../../utils/Toast';
import styles from './EditBlogModal.module.css';
import UploadImage from '../../components/UploadImage';
import Input from '../../components/Input';
import DropDown from '../../components/DropDown';
import TextArea from '../../components/TextArea';

const EditBlogModal = ({ show, onHide, existingBlog, setIsBlogUpdated }) => {
    const [blogImage, setBlogImage] = useState(existingBlog?.blogImg);
    const [blogTitle, setBlogTitle] = useState(existingBlog?.title);
    const [blogCategory, setBlogCategory] = useState(existingBlog?.category);
    const [blogStory, setBlogStory] = useState(existingBlog?.story);
    const [previewImg, setPreviewImg] = useState(existingBlog?.blogImg);

    const [loading, setLoading] = useState(false);

    const options = [
        { label: 'Music', value: 'Music' },
        { label: 'Movies', value: 'Movies' },
        { label: 'Sports', value: 'Sports' },
        { label: 'Technology', value: 'Technology' },
        { label: 'Fashion', value: 'Fashion' }
    ];

    const handleBlogUpdate = async () => {
        setLoading(true);
        let updatedBlogImg = "";

        if (blogImage !== existingBlog?.blogImg) {
            const formData = new FormData;
            formData.append('file', blogImage);
            formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

            const response = await uploadImageToCloudinary(formData);
            updatedBlogImg = response?.data?.secure_url;
        }
        const reqBody = {
            authorId: existingBlog?.authorId,
            ...(blogImage !== existingBlog?.blogImg && { blogImg: updatedBlogImg }),
            ...(blogTitle !== existingBlog?.title && { title: blogTitle }),
            ...(blogCategory !== existingBlog?.category && { category: blogCategory }),
            ...(blogStory !== existingBlog?.story && { story: blogStory }),
        };
        updateBlog(existingBlog?._id, reqBody).then((res) => {
            if (res?.data?.status !== 'success') {
                showToast('error', res?.data?.message);
                return;
            }
            setIsBlogUpdated(true);
            showToast('success', res?.data?.message);
            onHide(false);
        }).catch((err) => {
            showToast('error', err?.message);
        }).finally(() => setLoading(false));
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Blog Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.modalBodyContentForEditBlog}>
                    <div className={styles.uploadImgContainerOfEditBlogModal}>
                        <UploadImage value={blogImage} setter={setBlogImage} previewImg={previewImg} setPreviewImg={setPreviewImg} className={styles.uploadImgClass} imgStyles={{ width: '250px', height: '250px' }} />
                    </div>
                    <Input value={blogTitle} setter={setBlogTitle} type={'text'} placeholder={'Title...'} />
                    <DropDown value={blogCategory} setter={setBlogCategory} options={options} />
                    <TextArea value={blogStory} setter={setBlogStory} placeholder={'Tell Your Story...'} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button btnText={'Cancel'} onClick={() => onHide(false)} className={styles.cancelBtnOfEditBlogModal} />
                <Button btnText={'Submit'} onClick={handleBlogUpdate} className={styles.submitBtnOfEditBlogModal} loading={loading} disabled={(!blogImage || blogImage === existingBlog?.blogImg) && (!blogTitle || blogTitle === existingBlog?.title) && (!blogCategory || blogCategory === existingBlog?.category) && (!blogStory || blogStory === existingBlog?.story)} />
            </Modal.Footer>
        </Modal>
    );
};

export default EditBlogModal;
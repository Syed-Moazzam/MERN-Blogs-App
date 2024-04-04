import React, { useState } from 'react'
import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import Footer from '../../components/Footer';
import allImages from '../../constants/imagePath';
import { Col, Container, Row } from 'react-bootstrap';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import DropDown from '../../components/Dropdown';
import UploadImage from '../../components/UploadImage';
import styles from './CreateBlog.module.css';
import validator from 'validator';
import showToast from '../../utils/showToast';
import { uploadImagesToCloudinary } from '../../api';

const CreateBlog = () => {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogStory, setBlogStory] = useState('');
    const [blogCategory, setBlogCategory] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const options = [
        { label: 'Music', value: 'Music' },
        { label: 'Movies', value: 'Movies' },
        { label: 'Sports', value: 'Sports' },
        { label: 'Technology', value: 'Technology' },
        { label: 'Fashion', value: 'Fashion' }
    ];

    const handleBlogCreation = () => {
        if (validator.isEmpty(blogTitle) || validator.isEmpty(blogCategory) || validator.isEmpty(blogStory)) {
            showToast('error', 'Please Fill In All Required Fields!');
        }
        else if (!image) {
            showToast('error', 'Please Upload Blog Image!');
        }
        else {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`);

            // Uploading image to Cloudinary
            setLoading(true);
            uploadImagesToCloudinary(formData).then((response) => {
                setImage(response?.data?.secure_url);
            }).catch((error) => {
                console.log('image could not be uploaded due to', error);
            }).finally(() => setLoading(false));
        }
    }

    return (
        <>
            <Header />
            <HeroSection img={allImages?.createBlogImg} />
            <section className={styles.createBlogContainer}>
                <Container>
                    <Row>
                        <Col lg={4}>
                            <div className={styles.uploadImageDiv}>
                                <UploadImage value={image} setter={setImage} disabled={loading} />
                            </div>
                        </Col>
                        <Col lg={8}>
                            <Input value={blogTitle} setter={setBlogTitle} placeholder={'Title'} type={'text'} disabled={loading} />
                            <DropDown options={options} value={blogCategory} setter={setBlogCategory} disabled={loading} />
                            <TextArea value={blogStory} setter={setBlogStory} placeholder={'Tell Your Story...'} disabled={loading} />
                            <Button btnText={'PUBLISH'} loading={loading} className={styles.publishBtnOfCreateBlogPage} onClick={handleBlogCreation} />
                        </Col>
                    </Row>
                </Container >
            </section >
            <Footer />
        </>
    )
}

export default CreateBlog;
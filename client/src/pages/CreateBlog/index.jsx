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
import showToast from '../../utils/Toast';
import { createBlog, uploadImageToCloudinary } from '../../api';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogStory, setBlogStory] = useState('');
    const [blogCategory, setBlogCategory] = useState('');
    const [blogImage, setBlogImage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const options = [
        { label: 'Music', value: 'Music' },
        { label: 'Movies', value: 'Movies' },
        { label: 'Sports', value: 'Sports' },
        { label: 'Technology', value: 'Technology' },
        { label: 'Fashion', value: 'Fashion' }
    ];

    const handleBlogCreation = () => {
        if (validator.isEmpty(blogTitle) || validator.isEmpty(blogCategory) || validator.isEmpty(blogStory)) {
            showToast('error', 'Please Fill In All The Required Fields Correctly!');
        }
        else if (!blogImage) {
            showToast('error', 'Please Upload Blog Image!');
        }
        else {
            const formData = new FormData();
            formData.append('file', blogImage);
            formData.append('upload_preset', `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`);

            // Uploading image to Cloudinary
            setLoading(true);
            uploadImageToCloudinary(formData).then((response) => {
                setBlogImage(response?.data?.secure_url);
                const img = response?.data?.secure_url;

                const reqBody = {
                    title: blogTitle,
                    category: blogCategory,
                    story: blogStory,
                    blogImg: img
                }
                createBlog(reqBody).then((res) => {
                    if (res?.data?.status === 'success') {
                        showToast('success', res?.data?.message);
                        navigate('/');
                    }
                }).catch((err) => {
                    showToast('error', err?.message);
                    setBlogTitle("");
                    setBlogCategory("");
                    setBlogStory("");
                    setBlogImage("");
                });
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
                    <Row className={styles.rowOfCreateBlogPage}>
                        <Col lg={4}>
                            <div className={styles.uploadImageDiv}>
                                <UploadImage value={blogImage} setter={setBlogImage} disabled={loading} />
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
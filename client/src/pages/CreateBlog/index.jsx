import React, { useState } from 'react'
import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import Footer from '../../components/Footer';
import allImages from '../../constant/imagePath';
import { Col, Container, Row } from 'react-bootstrap';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import DropDown from '../../components/Dropdown';
import UploadImage from '../../components/UploadImage';
import styles from './CreateBlog.module.css';

const CreateBlog = () => {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogStory, setBlogStory] = useState('');
    const [blogCategory, setBlogCategory] = useState('');

    const options = [
        { label: 'Music', value: 'Music' },
        { label: 'Movies', value: 'Movies' },
        { label: 'Sports', value: 'Sports' },
        { label: 'Technology', value: 'Technology' },
        { label: 'Fashion', value: 'Fashion' }
    ];

    const [image, setImage] = useState(null);

    return (
        <>
            <Header />
            <HeroSection img={allImages?.createBlogImg} />
            <section className={styles.createBlogContainer}>
                <Container>
                    <Row>
                        <Col lg={4}>
                            <div className={styles.uploadImageDiv}>
                                <UploadImage value={image} setter={setImage} />
                            </div>
                        </Col>
                        <Col lg={8}>
                            <Input value={blogTitle} setter={setBlogTitle} placeholder={'Title'} type={'text'} />
                            <DropDown options={options} value={blogCategory} setter={setBlogCategory} />
                            <TextArea value={blogStory} setter={setBlogStory} placeholder={'Tell Your Story...'} />
                            <Button btnText={'PUBLISH'} className={styles.publishBtnOfCreateBlogPage} />
                        </Col>
                    </Row>
                </Container >
            </section >
            <Footer />
        </>
    )
}

export default CreateBlog;
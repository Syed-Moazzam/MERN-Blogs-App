import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import allImages from '../../constant/imagePath';
import styles from './Home.module.css';
import Button from '../../components/Button';
import HeroSection from '../../components/HeroSection';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const categories = [
        { label: 'All Categories', path: '/' },
        { label: 'Music', path: '?category=Music' },
        { label: 'Movies', path: '?category=Movies' },
        { label: 'Sports', path: '?category=Sports' },
        { label: 'Technology', path: '?category=Technology' },
        { label: 'Fashion', path: '?category=Fashion' }
    ];

    return (
        <>
            <Header />
            <HeroSection img={allImages?.mainBgImg} />
            <Container fluid className={styles.blogsCategoryContainer}>
                <Row>
                    <Col lg={2}>
                        <Button btnText={'CREATE BLOG'} onClick={() => navigate('/create-blog')} />
                        <div className={styles.categoriesMainContainer}>
                            {categories?.map((category, key) => {
                                return (
                                    <div className={styles.eachCategoryContainer} key={key}>
                                        <Link to={category?.path}>{category?.label}</Link>
                                    </div>
                                )
                            })}
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Home;
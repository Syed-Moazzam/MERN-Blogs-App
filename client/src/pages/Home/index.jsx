import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import allImages from '../../constants/imagePath';
import styles from './Home.module.css';
import Button from '../../components/Button';
import HeroSection from '../../components/HeroSection';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import BlogCard from '../../components/BlogCard';
import { getAllBlogs } from '../../api';

const Home = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [searchParams] = useSearchParams();

    let filteredBlogs = [];
    const category = searchParams.get("category");

    const categories = [
        { label: 'All Categories', path: '/' },
        { label: 'Music', path: '?category=Music' },
        { label: 'Movies', path: '?category=Movies' },
        { label: 'Sports', path: '?category=Sports' },
        { label: 'Technology', path: '?category=Technology' },
        { label: 'Fashion', path: '?category=Fashion' }
    ];

    useEffect(() => {
        getAllBlogs().then((res) => {
            if (res?.data?.status === 'success') {
                setBlogs(res?.data?.data);
            }
        }).catch((err) => {
            console.log('err', err);
        })
    }, []);

    if (category) {
        filteredBlogs = blogs?.filter((blog) => blog?.category === category);
    }

    return (
        <>
            <Header />
            <HeroSection img={allImages?.mainBgImg} />
            <Container fluid className={styles.blogsCategoryContainer}>
                <Row>
                    <Col lg={2}>
                        <Button btnText={'CREATE BLOG'} className={styles.createBlogButtonOfHome} onClick={() => navigate('/create-blog')} />
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

                    <Col lg={10}>
                        {filteredBlogs?.length || blogs?.length ? <Row>
                            {(filteredBlogs?.length ? filteredBlogs : blogs)?.map((blog, index) => {
                                return (
                                    <Col lg={3} key={index}>
                                        <BlogCard image={blog?.blogImg} categoryName={blog?.category} blogTitle={blog?.title} authorName={blog?.authorName} blogDescription={blog?.story} onClick={() => navigate(`/blog/${blog?._id}`)} />
                                    </Col>
                                )
                            })}
                        </Row>
                            : <h3 className={styles.noBlogsFoundElement}>No Blogs Found!</h3>
                        }
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Home;
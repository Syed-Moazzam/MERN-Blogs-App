import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import allImages from '../../constants/imagePath';
import styles from './Home.module.css';
import HeroSection from '../../components/HeroSection';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import BlogCard from '../../components/BlogCard';
import { getAllBlogs } from '../../api';
import Loader from '../../components/Loader';

const Home = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

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
        }).finally(() => setLoading(false));
    }, []);

    if (category) {
        filteredBlogs = blogs?.filter((blog) => blog?.category === category);
    }

    return (
        <>
            {loading ? <Loader customStyles={{ width: '60px', height: '60px', borderWidth: '6px' }} /> :
                <>
                    <Header />
                    <HeroSection img={allImages?.mainBgImg} />
                    <Container fluid className={styles.homeMainContainer}>
                        <Row className={styles.rowOfHomeContent}>
                            <Col md={4} lg={3} xxl={2}>
                                <Link to={'/create-blog'} className={styles.createBlogLinkOfHome}>CREATE BLOG</Link>
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

                            <Col md={8} lg={9} xxl={10}>
                                {filteredBlogs?.length || blogs?.length ? <Row>
                                    {(filteredBlogs?.length ? filteredBlogs : blogs)?.map((blog, index) => {
                                        return (
                                            <Col sm={6} md={6} lg={4} xxl={3} key={index}>
                                                <div className={styles.blogCardContainerOfHome}>
                                                    <BlogCard image={blog?.blogImg} categoryName={blog?.category} blogTitle={blog?.title} authorName={blog?.authorName} blogDescription={blog?.story} onClick={() => navigate(`/blog/${blog?._id}`)} />
                                                </div>
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
            }
        </>
    )
}

export default Home;
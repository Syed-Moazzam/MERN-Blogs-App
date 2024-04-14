import React, { useEffect, useState } from 'react';
import styles from './SingleBlog.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getSingleBlog } from '../../api';

const SingleBlog = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        getSingleBlog(blogId).then((res) => {
            console.log('res', res?.data?.data);
            setBlog(res?.data?.data);
        }).catch((err) => {
            console.log('error', err?.message);
        })
    }, []);

    return (
        <>
            <Header />
            <section>
                <Container fluid className={styles.singleBlogContainer}>
                    <Row>
                        <Col lg={12}>
                            <div className={styles.blogImageContainer}><img src={blog?.blogImg} alt="" /></div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default SingleBlog;
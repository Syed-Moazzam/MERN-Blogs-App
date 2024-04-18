import React, { useEffect, useState } from 'react';
import styles from './SingleBlog.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getSingleBlog } from '../../api';
import Button from '../../components/Button';
import { MdDelete, MdEdit } from 'react-icons/md';
import DeleteBlogModal from '../../modals/DeleteBlogModal';
import showToast from '../../utils/Toast';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';

const SingleBlog = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const user = useSelector((state) => state?.user);

    useEffect(() => {
        getSingleBlog(blogId).then((res) => {
            setBlog(res?.data?.data);
        }).catch((err) => {
            showToast('error', err?.message);
        }).finally(() => setLoading(false));
    }, []);


    return (
        <>
            {loading ? <Loader customStyles={{ width: '60px', height: '60px', borderWidth: '6px' }} /> :
                <>
                    <Header />
                    <section>
                        <Container className={styles.singleBlogContainer}>
                            <Row>
                                <Col lg={12}>
                                    <div className={styles.blogImageContainer}><img src={blog?.blogImg} alt="" /></div>
                                </Col>
                                <Col lg={12}>
                                    <div className={styles.blogContentMainContainer}>
                                        <div className={styles.containerOfBlogTitleAndBtns}>
                                            <div className={styles.blogTitle}>
                                                <h2>{blog?.title}</h2>
                                                <p>{blog?.category}</p>
                                            </div>
                                            {user && user?._id === blog?.authorId && <div className={styles.editAndDeleteBtnContainer}>
                                                <Button className={styles.editBlogBtn}><MdEdit /></Button>
                                                <Button className={styles.deleteBlogBtn} onClick={() => setShowModal(true)}><MdDelete /></Button>
                                            </div>}
                                        </div>

                                        <div className={styles.blogContent}>
                                            <p className={styles.blogAuthorContainer}>
                                                <span>Author: </span>
                                                <span>{blog?.authorName}</span>
                                            </p>
                                            <div className={styles.blogStoryContainer}>
                                                <span className={styles.emptySpanAtBlogStart}></span>
                                                <p className={styles.blogStory}>{blog?.story}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <Footer />
                </>
            }
            {showModal && <DeleteBlogModal show={showModal} onHide={setShowModal} authorId={blog?.authorId} blogId={blogId} />}
        </>
    )
}

export default SingleBlog;
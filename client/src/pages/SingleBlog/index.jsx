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
import EditBlogModal from '../../modals/EditBlogModal';
import showToast from '../../utils/Toast';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Avatar from '../../components/Avatar';
import TextArea from '../../components/TextArea';

const SingleBlog = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    const [deleteBlogModal, setDeleteBlogModal] = useState(false);
    const [editBlogModal, setEditBlogModal] = useState(false);
    const [isBlogUpdated, setIsBlogUpdated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");
    const [characterCount, setCharacterCount] = useState(200);

    const maxCharCount = 200;
    const user = useSelector((state) => state?.user);

    useEffect(() => {
        setLoading(true);
        getSingleBlog(blogId).then((res) => {
            setBlog(res?.data?.data);
        }).catch((err) => {
            showToast('error', err?.message);
        }).finally(() => setLoading(false));
    }, [isBlogUpdated]);

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
                                                <Button className={styles.editBlogBtn} onClick={() => setEditBlogModal(true)}><MdEdit /></Button>
                                                <Button className={styles.deleteBlogBtn} onClick={() => setDeleteBlogModal(true)}><MdDelete /></Button>
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
                                <Col lg={12}>
                                    <div className={styles.blogCommentsContainer}>
                                        <div className={styles.signedInUserContainer}>
                                            <p>Signed in as:</p>
                                            <Avatar img={user?.profileImg} className={styles.signedInUserImage} />
                                            <p className={styles.signedInUsername}>@{user?.username}</p>
                                        </div>

                                        <div className={styles.addCommentContainer}>
                                            <TextArea value={comment} setter={setComment} placeholder={'Add A Comment...'} className={styles.commentTextArea} maxCharCount={maxCharCount} setCharacterCount={setCharacterCount} />
                                            <div className={styles.charRemAndSubmitBtnContainer}>
                                                <p>{characterCount} characters remaining</p>
                                                <Button btnText={'Submit'} className={styles.submitCommentBtn} disabled={!comment} />
                                            </div>
                                        </div>

                                        <div className={styles.allCommentsMainContainer}>
                                            <div className={styles.commentsCount}>
                                                <p>Comments</p>
                                                <p>2</p>
                                            </div>

                                            <div className={styles.commentsContainer}>
                                                <div className={styles.singleComment}>
                                                    <div className={styles.imageOfCommenter}>
                                                        <Avatar img={user?.profileImg} />
                                                    </div>
                                                    <div className={styles.commentContent}>
                                                        <div className={styles.commentHeader}>
                                                            <p className={styles.commenterName}>@Moazzam</p>
                                                            <p className={styles.commentingTime}>1 month ago</p>
                                                        </div>
                                                        <p className={styles.commentText}>
                                                            Congratulations! You've successfully set up Tailwind CSS with Vite, providing a blazing fast and efficient way to develop web applications. Now, you can start crafting beautiful user interfaces.
                                                        </p>
                                                    </div>
                                                </div>
                                                <hr />
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

            {editBlogModal && <EditBlogModal show={editBlogModal} onHide={setEditBlogModal} existingBlog={blog} setIsBlogUpdated={setIsBlogUpdated} />}
            {deleteBlogModal && <DeleteBlogModal show={deleteBlogModal} onHide={setDeleteBlogModal} authorId={blog?.authorId} blogId={blogId} />}
        </>
    )
}

export default SingleBlog;
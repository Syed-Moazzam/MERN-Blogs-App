import React, { Fragment, useEffect, useState } from 'react';
import styles from './SingleBlog.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getSingleBlogWithComments, createComment } from '../../api';
import Button from '../../components/Button';
import { MdDelete, MdEdit } from 'react-icons/md';
import DeleteBlogModal from '../../modals/DeleteBlogModal';
import EditBlogModal from '../../modals/EditBlogModal';
import showToast from '../../utils/Toast';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Avatar from '../../components/Avatar';
import TextArea from '../../components/TextArea';
import BlogComment from '../../components/BlogComment';
import DropDown from '../../components/DropDown';

const SingleBlog = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    const [deleteBlogModal, setDeleteBlogModal] = useState(false);
    const [editBlogModal, setEditBlogModal] = useState(false);
    const [isBlogUpdated, setIsBlogUpdated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [comment, setComment] = useState("");
    const [characterCount, setCharacterCount] = useState(200);
    const [allComments, setAllComments] = useState([]);

    const maxCharCount = 200;
    const user = useSelector((state) => state?.user);

    useEffect(() => {
        setLoading(true);
        getSingleBlogWithComments(blogId).then((res) => {
            setBlog(res?.data?.data?.blog);
            setAllComments(res?.data?.data?.allComments);
        }).catch((err) => {
            showToast('error', err?.message);
        }).finally(() => setLoading(false));
    }, [isBlogUpdated]);

    const submitComment = () => {
        const reqBody = {
            blogId,
            commenterId: user?._id,
            commenterImg: user?.profileImg,
            commenterName: user?.username,
            commentText: comment
        };

        setCommentLoading(true);
        createComment(reqBody).then((res) => {
            setComment("");
            setCharacterCount(200);
            if (res?.data?.status !== 'success') {
                showToast('error', res?.data?.message);
                return;
            }
            setAllComments([...allComments, res?.data?.data]);
        }).catch((err) => {
            showToast('error', err?.message);
        }).finally(() => setCommentLoading(false));
    }

    const options = [
        { label: 'Edit', onClick: () => setEditBlogModal(true) },
        { label: 'Delete', onClick: () => setDeleteBlogModal(true) }
    ];

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

                                            {user && user?._id === blog?.authorId && <div className={styles.editAndDeleteBtnDropdown}>
                                                <DropDown options={options} className={styles.clickableDropdownOfSingleBlog} clickableOptions={true} />
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
                                        {user &&
                                            <>
                                                <div className={styles.signedInUserContainer}>
                                                    <p>Signed in as:</p>
                                                    <Avatar img={user?.profileImg} className={styles.signedInUserImage} />
                                                    <p className={styles.signedInUsername}>@{user?.username}</p>
                                                </div>

                                                <div className={styles.addCommentContainer}>
                                                    <TextArea value={comment} setter={setComment} placeholder={'Add A Comment...'} className={styles.commentTextArea} maxCharCount={maxCharCount} setCharacterCount={setCharacterCount} />
                                                    <div className={styles.charRemAndSubmitBtnContainer}>
                                                        <p>{characterCount} characters remaining</p>
                                                        <Button btnText={'Submit'} className={styles.submitCommentBtn} disabled={!comment} onClick={submitComment} loading={commentLoading} />
                                                    </div>
                                                </div>
                                            </>
                                        }

                                        {allComments && allComments?.length > 0 && <div className={styles.allCommentsMainContainer}>
                                            <div className={styles.commentsCount}>
                                                <p>Comments</p>
                                                <p>{allComments?.length}</p>
                                            </div>

                                            <div className={styles.commentsContainer}>
                                                {allComments?.map((comment, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <BlogComment commenterId={comment?.commenterId} commentId={comment?._id} commenterImg={comment?.commenterImg} commenterName={comment?.commenterName} commentingDateAndTime={comment?.createdAt} commentText={comment?.commentText} allComments={allComments} setAllComments={setAllComments} />
                                                            <hr />
                                                        </Fragment>
                                                    )
                                                })}
                                            </div>
                                        </div>}
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
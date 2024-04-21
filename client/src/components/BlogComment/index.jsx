import React, { useState } from 'react';
import styles from './BlogComment.module.css';
import Avatar from '../Avatar';
import Button from '../Button';
import DeleteCommentModal from '../../modals/DeleteCommentModal';
import { useSelector } from 'react-redux';

const BlogComment = ({ commenterId, commentId, commenterImg, commenterName, commentingDateAndTime, commentText, allComments, setAllComments }) => {
    const [deleteCommentModal, setDeleteCommentModal] = useState(false);
    const user = useSelector((state) => state?.user);

    const findCommentTime = () => {
        const postingTime = new Date(commentingDateAndTime);
        const currentTime = new Date();

        const seconds = Math.floor((currentTime - postingTime) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);

        if (months > 0) {
            return months === 1 ? '1 month ago' : `${months} months ago`;
        } else if (days > 0) {
            return days === 1 ? '1 day ago' : `${days} days ago`;
        } else if (hours > 0) {
            return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
        } else if (minutes > 0) {
            return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
        } else {
            return 'just now';
        }
    }

    return (
        <>
            <div className={[styles.singleComment, user?._id !== commenterId && styles.singleCommentWithoutEditAndDelete].join(' ')}>
                <div className={styles.imageOfCommenter}>
                    <Avatar img={commenterImg} />
                </div>
                <div className={styles.commentContent}>
                    <div className={styles.commentHeader}>
                        <p className={styles.commenterName}>@{commenterName}</p>
                        <p className={styles.commentingDateAndTime}>{findCommentTime()}</p>
                    </div>
                    <p className={styles.commentText}>{commentText}</p>
                    {user && user?._id === commenterId && <div className={styles.editAndDeleteCommentBtnsContainer}>
                        <Button btnText={'Edit'} />
                        <Button btnText={'Delete'} onClick={() => setDeleteCommentModal(true)} />
                    </div>}
                </div>
            </div>

            {deleteCommentModal && <DeleteCommentModal show={deleteCommentModal} onHide={setDeleteCommentModal} commentId={commentId} allComments={allComments} setAllComments={setAllComments} />}
        </>
    )
}

export default BlogComment;
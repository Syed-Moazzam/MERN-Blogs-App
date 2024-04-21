import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../../components/Button';
import { deleteComment } from '../../api';
import showToast from '../../utils/Toast';
import styles from './DeleteCommentModal.module.css';

const DeleteCommentModal = ({ show, onHide, commentId, allComments, setAllComments }) => {
    const handleCommentDeletion = () => {
        onHide(false);
        deleteComment(commentId).then((res) => {
            if (res?.data?.status !== 'success') {
                showToast('error', res?.data?.message);
                return;
            }
            showToast('success', res?.data?.message);
            const filteredComments = allComments?.filter((comment) => comment?._id !== commentId);
            setAllComments(filteredComments);
        }).catch((err) => {
            showToast('error', err?.message);
        });
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Comment Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are You Sure You Want To Delete This Comment Permanently?</Modal.Body>
            <Modal.Footer>
                <Button btnText={'Cancel'} onClick={() => onHide(false)} className={styles.cancelBtnOfDeleteCommentModal} />
                <Button btnText={'Delete'} onClick={handleCommentDeletion} className={styles.deleteBtnOfDeleteCommentModal} />
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCommentModal;
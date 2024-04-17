import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../../components/Button';
import { deleteBlog } from '../../api';
import showToast from '../../utils/Toast';
import { useNavigate } from 'react-router-dom';
import styles from './DeleteBlogModal.module.css';

const DeleteBlogModal = ({ show, onHide, authorId, blogId }) => {
    const navigate = useNavigate();

    const handleBlogDeletion = () => {
        onHide(false);
        deleteBlog(authorId, blogId).then((res) => {
            if (res?.data?.status !== 'success') {
                showToast('error', res?.data?.message);
                return;
            }
            showToast('success', res?.data?.message);
            navigate('/');
        }).catch((err) => {
            showToast('error', err?.message);
        });
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Blog Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are You Sure You Want To Delete This Blog?</Modal.Body>
            <Modal.Footer>
                <Button btnText={'No'} onClick={() => onHide(false)} className={styles.noBtnOfDeleteBlogModal} />
                <Button btnText={'Yes'} onClick={handleBlogDeletion} className={styles.yesBtnOfDeleteBlogModal} />
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBlogModal;
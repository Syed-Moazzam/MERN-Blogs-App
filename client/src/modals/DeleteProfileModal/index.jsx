import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../../components/Button';
import { deleteUser } from '../../api';
import showToast from '../../utils/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAuthenticatedUser } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import styles from './DeleteProfileModal.module.css';

const DeleteProfileModal = ({ show, onHide }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state?.user);

    const handleProfileDeletion = () => {
        onHide(false);
        deleteUser(user?._id).then((res) => {
            if (res?.data?.status === 'success') {
                showToast('success', res?.data?.message);
                dispatch(deleteAuthenticatedUser());
                navigate('/');
            }
            else {
                showToast('error', res?.data?.message);
            }
        }).catch((err) => {
            showToast('error', err?.message);
        });
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Profile Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>By Deleting Your Profile, All Your Account Information And Blogs Will Be Permanently Deleted. Are You Sure You Want To Proceed With Deleting Your Profile?</Modal.Body>
            <Modal.Footer>
                <Button btnText={'No'} onClick={() => onHide(false)} className={styles.noBtnOfLogoutModal} />
                <Button btnText={'Yes'} onClick={handleProfileDeletion} className={styles.yesBtnOfLogoutModal} />
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteProfileModal;
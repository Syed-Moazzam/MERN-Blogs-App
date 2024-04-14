import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../../components/Button';
import { logoutApi } from '../../api';
import showToast from '../../utils/Toast';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import styles from './LogoutModal.module.css';

const LogoutModal = ({ show, onHide }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        onHide(false);
        logoutApi().then((res) => {
            if (res?.data?.status === 'success') {
                showToast('success', res?.data?.message);
                dispatch(logout());
                navigate('/');
            }
        }).catch((err) => {
            showToast('error', err?.message);
        });
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Logout Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are You Sure You Want To Logout?</Modal.Body>
            <Modal.Footer>
                <Button btnText={'No'} onClick={() => onHide(false)} className={styles.noBtnOfLogoutModal} />
                <Button btnText={'Yes'} onClick={handleLogout} className={styles.yesBtnOfLogoutModal} />
            </Modal.Footer>
        </Modal>
    );
};

export default LogoutModal;
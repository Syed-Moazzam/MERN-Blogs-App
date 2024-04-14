import React, { useEffect, useState } from 'react';
import styles from './UserProfile.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import UploadImage from '../../components/UploadImage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { IoCheckmark } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import showToast from '../../utils/Toast';
import { updateUser, uploadImageToCloudinary } from '../../api';
import { updateAuthenticatedUser } from '../../redux/user/userSlice';
import DeleteProfileModal from '../../modals/DeleteProfileModal';

const UserProfile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userImage, setUserImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const user = useSelector((state) => state?.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setUsername(user?.username);
            setEmail(user?.email);
            setUserImage(user?.profileImg);
        }
    }, [user]);

    const updateUserProfile = async () => {
        if (validator.isEmpty(username) || !validator.isEmail(email)) {
            showToast('error', 'Please Fill In All The Required Fields Correctly!');
        }
        else {
            setLoading(true);
            let image = "";
            if (userImage && userImage !== user?.profileImg) {
                const formData = new FormData();
                formData.append('file', userImage);
                formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

                const response = await uploadImageToCloudinary(formData);
                image = response?.data?.secure_url;
            }

            const reqBody = {
                username,
                email,
                ...(password && { password }),
                profileImg: image
            };

            updateUser(user?._id, reqBody).then((res) => {
                const response = res?.data?.data;
                const { createdAt, updatedAt, __v, ...userPayload } = response;

                if (res?.data?.status === 'success') {
                    showToast('success', res?.data?.message);
                    dispatch(updateAuthenticatedUser(userPayload));

                    if (password) setPassword("");
                }
                else {
                    showToast('error', res?.data?.message);
                }
            }).catch((err) => {
                showToast('error', err?.message);
            }).finally(() => setLoading(false));
        }
    }

    return (
        <>
            <Header />
            <section className={styles.userProfileContainer}>
                <Container>
                    <Row className={styles.rowOfUserProfileSection}>
                        <Col lg={12} className={styles.containerOfUserProfileImg}>
                            <UploadImage value={userImage} setter={setUserImage} className={styles.uploadImgComponentForUserProfile} user={user} />
                        </Col>
                        <Col lg={12}>
                            <Input value={username} setter={setUsername} type={'text'} placeholder={'Enter Name...'} />
                        </Col>
                        <Col lg={12}>
                            <Input value={email} setter={setEmail} type={'email'} placeholder={'Enter Email Address...'} />
                        </Col>
                        <Col lg={12}>
                            <Input value={password} setter={setPassword} type={'password'} placeholder={'Enter Password...'} />
                        </Col>
                        <Col lg={12} className={styles.containerOfUpdateAndDeleteProfile}>
                            <Button className={[(user?.username === username && user?.email === email && user?.profileImg === userImage && !password) && styles.disabledUpdateBtn, styles.updateUserProfileBtn].join(' ')} onClick={updateUserProfile} loading={loading}>
                                <IoCheckmark />
                                <span>Update Profile</span>
                            </Button>
                            <Button className={styles.deleteUserProfileBtn} onClick={() => setShowModal(true)}>
                                <MdDelete />
                                <span>Delete Profile</span>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {showModal && <DeleteProfileModal show={showModal} onHide={setShowModal} />}
            <Footer />
        </>
    )
}

export default UserProfile;
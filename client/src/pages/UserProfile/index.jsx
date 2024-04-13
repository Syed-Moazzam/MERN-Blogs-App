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
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userImage, setUserImage] = useState("");

    const user = useSelector((state) => state?.user);

    useEffect(() => {
        if (user) {
            setUsername(user?.username);
            setEmail(user?.email);
            setUserImage(user?.profileImg);
        }
    }, []);

    return (
        <>
            <Header />
            <section className={styles.userProfileContainer}>
                <Container>
                    <Row className={styles.rowOfUserProfileSection}>
                        <Col lg={12} className={styles.containerOfUserProfileImg}>
                            <UploadImage value={userImage} setter={userImage} className={styles.uploadImgComponentForUserProfile} />
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
                            <Button className={styles.updateUserProfileBtn}>
                                <IoCheckmark />
                                <span>Update Profile</span>
                            </Button>
                            <Button className={styles.deleteUserProfileBtn}>
                                <MdDelete />
                                <span>Delete Profile</span>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default UserProfile;
import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroSection from '../../components/HeroSection';
import allImages from '../../constants/imagePath';
import { Col, Container, Row } from 'react-bootstrap';
import Input from '../../components/Input';
import styles from './Contact.module.css';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import { sendEmail } from '../../api';
import validator from 'validator';
import showToast from '../../utils/Toast';

const Contact = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailSubmit = () => {
        if (validator.isEmpty(username) || !validator.isEmail(email) || validator.isEmpty(message)) {
            showToast('error', 'Please Fill In All The Required Fields Correctly!');
        }
        else {
            setLoading(true);
            sendEmail({ username, email, message }).then((res) => {
                if (res?.data?.status !== 'success') {
                    showToast('error', res?.data?.message);
                    return;
                }
                showToast('success', res?.data?.message);
            }).catch((err) => {
                showToast('error', err?.message);
            }).finally(() => {
                setLoading(false);
                setUsername("");
                setEmail("");
                setMessage("");
            });
        }
    }

    return (
        <>
            <Header />
            <HeroSection img={allImages?.contactImg} />
            <section className={styles.contactFormSection}>
                <Container>
                    <Row>
                        <Col lg={5}><img src={allImages?.contactImg2} alt="" className={styles.contactImg2} /></Col>
                        <Col lg={7}>
                            <div className={styles.contactForm}>
                                <h2>Get In Touch!</h2>
                                <Input value={username} setter={setUsername} placeholder={'Enter Your Name...'} type={'text'} />
                                <Input value={email} setter={setEmail} placeholder={'Enter Your Email...'} type={'email'} />
                                <TextArea value={message} setter={setMessage} placeholder={'Enter Your Message...'} />
                                <Button btnText={'Submit'} loading={loading} className={styles.contactFormBtn} onClick={handleEmailSubmit} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default Contact;
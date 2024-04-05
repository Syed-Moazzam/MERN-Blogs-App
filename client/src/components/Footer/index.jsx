import React from 'react';
import styles from './Footer.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = ({ className }) => {
    const currentYear = new Date().getFullYear();

    return (
        <div className={[className && className, styles.footerContainer].join(' ')}>
            <Container fluid>
                <Row>
                    <div className={styles.footerContentContainer}>
                        <Col sm={12} md={12} lg={7}>
                            <h3>StoryStreamline</h3>
                        </Col>
                        <Col sm={12} md={12} lg={5}>
                            <Row className={styles.nestedRowOfFooter}>
                                <Col sm={4} md={4} lg={4} className={styles.colOfFooterContent}>
                                    <h6>About</h6>
                                    <p>Contact Us</p>
                                    <p>FAQs</p>
                                </Col>
                                <Col sm={4} md={4} lg={4} className={styles.colOfFooterContent}>
                                    <h6>Follow Us</h6>
                                    <p onClick={() => window.open('//www.linkedin.com/in/syed-moazzam', '_blank')}>Linkedin</p>
                                    <p onClick={() => window.open('//www.github.com/Syed-Moazzam', '_blank')}>GitHub</p>
                                </Col>
                                <Col sm={4} md={4} lg={4} className={styles.colOfFooterContent}>
                                    <h6>Legal</h6>
                                    <p>Privacy Policy</p>
                                    <p>Terms Of Use</p>
                                </Col>
                            </Row>
                        </Col>
                    </div>

                    <Col lg={12} className={styles.copyrightContainer}>
                        <p>&copy; Copyright {currentYear} StoryStreamline. All Rights Reserved</p>
                        <div className={styles.socialLinks}>
                            <Link to={'//www.linkedin.com/in/syed-moazzam'} target={'_blank'}><FaLinkedin /></Link>
                            <Link to={'//www.github.com/Syed-Moazzam'} target={'_blank'}><FaGithub /></Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer;
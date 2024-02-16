import React from 'react';
import HeroSection from '../../components/HeroSection';
import allImages from '../../constant/imagePath';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import styles from './About.module.css';
import { Col, Container, Row } from 'react-bootstrap';

const About = () => {
    return (
        <>
            <Header />
            <HeroSection img={allImages?.aboutImg} />
            <section className={styles.aboutDescriptionContainer}>
                <Container>
                    <Row>
                        <Col lg={9}>
                            <h2 className={styles.descriptionHeadingOfAbout}>StoryStreamline - A Blogging Website</h2>
                            <p className={styles.descriptionOfAbout}>Welcome to our vibrant blogging website, where words come to life and ideas find their voice. Our blogs app is more than just a platform; it's a space for individuals to express themselves, share their passions, and connect with like-minded creators from around the world. Whether you're a seasoned writer or a newcomer to the blogging scene, our user-friendly interface makes crafting and publishing your thoughts a seamless experience. Dive into a world of diverse content, spanning topics from lifestyle and travel to technology and beyond. We prioritize user engagement and interaction, fostering a supportive environment where comments and discussions flourish. Our intuitive design ensures that navigating through the rich tapestry of content is a pleasure, encouraging users to explore, discover, and engage with the stories that resonate with them.</p>

                            <p className={styles.descriptionOfAbout}>Our blogs app is built using MERN Stack Technologies to provide a seamless experience for our users and ensures speed, reliability, and responsiveness. After a quick and easy registration process, users unlock a plethora of features, including personalized profiles, and a comprehensive dashboard to manage their published content. Whether you're looking to build your audience, collaborate with other bloggers, or simply enjoy a curated feed of inspiring content, our blogs app is designed to cater to your unique needs. Join us on this journey of self-expression and discovery, where words have the power to create connections and inspire change.</p>
                        </Col>
                        <Col lg={3}>
                            <Row>
                                <Col lg={12}>
                                    <img src={allImages?.aboutImg2} alt="" className={styles.aboutPageDescriptionImg} />
                                </Col>
                                <Col lg={12}>
                                    <img src={allImages?.aboutImg3} alt="" className={styles.aboutPageDescriptionImg} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default About;
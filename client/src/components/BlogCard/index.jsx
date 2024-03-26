import React from 'react';
import styles from './BlogCard.module.css';
import Card from 'react-bootstrap/Card';

const BlogCard = ({ image, categoryName, blogTitle, authorEmail, blogDescription }) => {
    return (
        <Card className={styles.blogCardContainer}>
            <Card.Img variant="top" src={image} className={styles.blogCardImg} />
            <Card.Body className={styles.blogCardBody}>
                <Card.Text className={styles.blogCardText}>{categoryName}</Card.Text>
                <Card.Title className={styles.blogCardTitle}>{blogTitle}</Card.Title>
                <Card.Text className={styles.blogCardText}>Author: {authorEmail}</Card.Text>
                <Card.Text>{blogDescription}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default BlogCard;
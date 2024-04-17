import React from 'react';
import styles from './BlogCard.module.css';
import Card from 'react-bootstrap/Card';

const BlogCard = ({ image, categoryName, blogTitle, authorName, blogDescription, onClick }) => {
    let description = "";
    if (blogDescription?.length > 50) {
        description = blogDescription?.slice(0, 51) + '...';
    }
    else description = blogDescription;

    return (
        <Card className={styles.blogCardContainer} onClick={onClick}>
            <Card.Img variant="top" src={image} className={styles.blogCardImg} />
            <hr />
            <Card.Body>
                <Card.Text className={styles.blogCardText}>{categoryName}</Card.Text>
                <Card.Title className={styles.blogCardTitle}>{blogTitle}</Card.Title>
                <Card.Text className={styles.blogCardText}>Author: {authorName}</Card.Text>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default BlogCard;
import React from 'react';
import styles from './TextArea.module.css';

const TextArea = ({ value, setter, placeholder, className, disabled }) => {
    return (
        <div className={styles.containerDivOfTextArea}>
            <textarea value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder} className={[styles.textareaComponent, className && className].join(' ')} disabled={disabled}></textarea>
        </div>
    )
}

export default TextArea;
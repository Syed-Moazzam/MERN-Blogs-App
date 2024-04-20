import React from 'react';
import styles from './TextArea.module.css';

const TextArea = ({ value, setter, placeholder, className, disabled, maxCharCount, setCharacterCount }) => {
    const handleValueChange = (e) => {
        const textLength = (e.target.value)?.length;

        if (maxCharCount && setCharacterCount) {
            if (textLength <= maxCharCount) {
                setter(e.target.value);
                setCharacterCount(maxCharCount - textLength);
            }
            return;
        }
        setter(e.target.value);
    }

    return (
        <div className={styles.containerDivOfTextArea}>
            <textarea value={value} onChange={handleValueChange} placeholder={placeholder} className={[styles.textareaComponent, className && className].join(' ')} disabled={disabled}></textarea>
        </div>
    )
}

export default TextArea;
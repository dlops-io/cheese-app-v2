'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, CameraAltOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

// Styles
import styles from './ChatInput.module.css';

export default function ChatInput({
    addMessage
}) {
    // Component States
    const [message, setMessage] = useState('');
    const textAreaRef = useRef(null);

    const adjustTextAreaHeight = () => {
        const textarea = textAreaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    // Setup Component
    useEffect(() => {
        adjustTextAreaHeight();
    }, [message]);

    // Handlers
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                // Shift + Enter: add new line
                return;
            } else {
                // Enter only: submit
                e.preventDefault();
                handleSubmit();
            }
        }
    };
    const handleSubmit = () => {
        if (message.trim()) {
            console.log('Submitting message:', message);
            setMessage('');
            // Reset textarea height
            if (textAreaRef.current) {
                textAreaRef.current.style.height = 'auto';
            }

            // Chat details
            addMessage(true);
        }
    };

    return (
        <div className={styles.chatInputContainer}>
            <div className={styles.textareaWrapper}>
                <textarea
                    ref={textAreaRef}
                    className={styles.chatInput}
                    placeholder="How can Formaggio help you today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                    rows={1}
                />
                <button
                    className={`${styles.submitButton} ${message.trim() ? styles.active : ''}`}
                    onClick={handleSubmit}
                    disabled={!message.trim()}
                >
                    <Send />
                </button>
            </div>
            <div className={styles.inputControls}>
                <div className={styles.leftControls}>
                    <IconButton aria-label="camera" className={styles.iconButton}>
                        <CameraAltOutlined />
                    </IconButton>
                </div>
                <div className={styles.rightControls}>
                    <span className={styles.inputTip}>Use shift + return for new line</span>
                    <select className={styles.modelSelect}>
                        <option>Formaggio Assistant (Default)</option>
                        <option>Cheese Expert</option>
                        <option>Recipe Helper</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
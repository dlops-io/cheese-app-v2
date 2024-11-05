'use client';

import { useState, useRef, useEffect } from 'react';
import { Person, SmartToy } from '@mui/icons-material';
import ForumIcon from '@mui/icons-material/Forum';
import DataService from "../../services/MockDataService"; // Mock
//import DataService from "../../services/DataService";

// Styles
import styles from './ChatMessage.module.css';

export default function ChatMessage({
    chat
}) {
    // Component States
    const chatHistoryRef = useRef(null);

    const fetchChat = async (id) => {
        try {
            setChat(null);
            const response = await DataService.GetChat(id);
            setChat(response.data);
            console.log(chat);
        } catch (error) {
            console.error('Error fetching chat:', error);
            setChat(null);
        }
    };

    // Setup Component
    // Auto-scroll to bottom of chat history when new messages are added
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [chat]);

    // Helper function to format time
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            {chat &&
                <div className={styles.chatTitle}>
                    <div className={styles.chatTitleIcon}>
                        <ForumIcon sx={{ fontSize: 28 }} />
                    </div>
                    <h1 className={styles.chatTitleText}>
                        {chat.title}
                    </h1>
                </div>
            }
            <div className={styles.chatHistory} ref={chatHistoryRef}>
                {chat && chat.messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${styles.message} ${styles[msg.role]}`}
                    >
                        <div className={styles.messageIcon}>
                            {msg.role === 'assistant' ? (
                                <SmartToy sx={{ color: '#FFD700' }} />
                            ) : (
                                <Person sx={{ color: '#FFFFFF' }} />
                            )}
                        </div>
                        <div className={styles.messageContent}>
                            {msg.image && (
                                <div className={styles.messageImage}>
                                    <img
                                        src={msg.image}
                                        alt="Chat Image"
                                    />
                                </div>
                            )}
                            {msg.content && <div>{msg.content}</div>}
                        </div>
                        {msg.timestamp && (
                            <span className={styles.messageTime}>
                                {formatTime(msg.timestamp)}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

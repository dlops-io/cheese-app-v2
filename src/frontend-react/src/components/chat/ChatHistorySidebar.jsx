'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DataService from "../../services/MockDataService"; // Mock
//import DataService from "../../services/DataService";

// Styles
import styles from './ChatHistorySidebar.module.css';

export default function ChatHistorySidebar({
    setHasActiveChat,
    setSelectedChat,
    chat_id
}) {
    // Component States
    const [chatHistory, setChatHistory] = useState([]);
    const router = useRouter();

    // Setup Component
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await DataService.GetChats(20);
                setChatHistory(response.data);
            } catch (error) {
                console.error('Error fetching podcasts:', error);
                setChatHistory([]); // Set empty array in case of error
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h2>Chat History</h2>
                <button
                    className={styles.newChatButton}
                    onClick={() => setHasActiveChat(false)}
                >
                    New Chat
                </button>
            </div>
            <div className={styles.chatList}>
                {chatHistory.map((item) => (
                    <div
                        key={item.id}
                        className={`${styles.chatItem} ${chat_id === item.id ? styles.active : ''}`}
                        onClick={() => router.push('/chat?id=' + item.id)}
                    >
                        <div className={styles.chatItemContent}>
                            <span className={styles.chatTitle}>
                                {item.title}
                            </span>
                            <span className={styles.chatDate}>
                                {item.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
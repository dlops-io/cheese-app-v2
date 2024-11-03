'use client';
import { useState } from 'react';
import Link from 'next/link';

// Import the styles
import styles from "./styles.module.css";

export default function ChatPage() {
    const [hasActiveChat, setHasActiveChat] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className={styles.container}>
            {/* Welcome Section - Shown when no chat is active */}
            {!hasActiveChat && (
                <div className={styles.welcome}>
                    <h1>Cheese Chat Assistant</h1>
                    <p>Start a conversation about cheese or upload an image for identification</p>

                    <div className={styles.startOptions}>
                        <button
                            className={styles.startButton}
                            onClick={() => setHasActiveChat(true)}
                        >
                            Start New Chat
                        </button>

                        <div className={styles.uploadArea}>
                            <input
                                type="file"
                                id="imageUpload"
                                className={styles.fileInput}
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files[0]) {
                                        setHasActiveChat(true);
                                        // Handle image upload
                                    }
                                }}
                            />
                            <label htmlFor="imageUpload" className={styles.uploadButton}>
                                Upload Image
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* Active Chat Interface */}
            {hasActiveChat && (
                <div className={styles.chatInterface}>
                    {/* Chat History Sidebar */}
                    <div className={styles.sidebar}>
                        <div className={styles.sidebarHeader}>
                            <h2>Chat History</h2>
                            <button
                                className={styles.newChatButton}
                                onClick={() => setSelectedChat(null)}
                            >
                                New Chat
                            </button>
                        </div>

                        <div className={styles.chatList}>
                            {/* Sample chat history items */}
                            {[1, 2, 3].map((chat) => (
                                <div
                                    key={chat}
                                    className={`${styles.chatItem} ${selectedChat === chat ? styles.active : ''}`}
                                    onClick={() => setSelectedChat(chat)}
                                >
                                    <div className={styles.chatItemContent}>
                                        <span className={styles.chatTitle}>
                                            Chat {chat}
                                        </span>
                                        <span className={styles.chatDate}>
                                            2 hours ago
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className={styles.mainChat}>
                        <div className={styles.chatMessages}>
                            {/* Messages will be rendered here */}
                        </div>

                        {/* Chat Input */}
                        <div className={styles.chatInputArea}>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className={styles.chatInput}
                                />
                                <button className={styles.attachButton}>
                                    📎
                                </button>
                                <button className={styles.sendButton}>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
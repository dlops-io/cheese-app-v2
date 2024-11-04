'use client';
import { useState, useRef, useEffect } from 'react';
import { AttachFile, Send, ArrowForward, CameraAltOutlined, ArrowUpwardRounded } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

// Import the styles
import styles from "./styles.module.css";

const recentChats = [
    {
        id: 1,
        title: 'Exploring the World of Cheese Through AI',
        time: '29 minutes ago'
    },
    {
        id: 2,
        title: 'Next.js SSR Error: window is not defined',
        project: null,
        time: '1 hour ago'
    },
    {
        id: 3,
        title: 'Rebuilding a Website with Organized Code',
        time: '3 hours ago'
    },
    {
        id: 4,
        title: 'Troubleshooting Styles in Next.js React App',
        time: '21 hours ago'
    },
    {
        id: 5,
        title: 'Cheese Icon Request',
        time: '1 day ago'
    }
];

const exampleChat = {
    id: 1,
    title: 'Exploring the World of Cheese Through AI',
    project: 'formaggio.me',
    time: '29 minutes ago',
    messages: [
        { id: 1, role: 'user', content: 'What are some good cheese pairings for red wine?' },
        { id: 2, role: 'assistant', content: 'For red wine, I would recommend aged cheeses like Parmigiano-Reggiano, aged Gouda, or Pecorino Romano. The robust flavors complement the wine perfectly.' },
        { id: 3, role: 'user', content: 'Hello some more questions here...' },
        { id: 4, role: 'assistant', content: 'Ok some more answers here...' },
        { id: 5, role: 'user', content: 'Hello some more questions here...' },
        { id: 6, role: 'assistant', content: 'Ok some more answers here...' },
        { id: 7, role: 'user', content: 'Hello some more questions here...' },
        { id: 8, role: 'assistant', content: 'Ok some more answers here...' },
        { id: 9, role: 'user', content: 'Hello some more questions here...' },
        { id: 10, role: 'assistant', content: 'Ok some more answers here...' },
        { id: 11, role: 'user', content: 'Hello some more questions here...' },
        { id: 12, role: 'assistant', content: 'Ok some more answers here...' },
    ]
}

export default function ChatPage() {
    // Component States
    const [hasActiveChat, setHasActiveChat] = useState(false);
    const [selectedChat, setSelectedChat] = useState(exampleChat);
    const [message, setMessage] = useState('');
    const textAreaRef = useRef(null);
    const chatHistoryRef = useRef(null);
    const [currentChat, setCurrentChat] = useState(null);

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
            setHasActiveChat(true);
        }
    };

    return (
        <div className={styles.container}>

            {/* Hero Section */}
            {!hasActiveChat && (
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1>Cheese Assistant 🌟</h1>
                        {/* Main Chat Input */}
                        <div className={styles.mainInputContainer}>
                            <div className={styles.textareaWrapper}>
                                <textarea
                                    ref={textAreaRef}
                                    className={styles.mainInput}
                                    placeholder="How can Formaggio help you today?"
                                    value={message}
                                    onChange={handleMessageChange}
                                    onKeyDown={handleKeyPress}
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
                    </div>
                </section>
            )}

            {/* Chat History Section */}
            {!hasActiveChat && (
                <div className={styles.recentChats}>
                    <div className={styles.recentHeader}>
                        <h2>
                            <span className={styles.chatIcon}>💭</span>
                            Your recent chats
                        </h2>
                        <button className={styles.viewAllButton}>
                            View all <ArrowForward />
                        </button>
                    </div>

                    <div className={styles.chatGrid}>
                        {recentChats.map((chat) => (
                            <div key={chat.id} className={styles.chatCard}>
                                <h3 className={styles.chatTitle}>{chat.title}</h3>
                                <span className={styles.chatTime}>{chat.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Chat Block Header Section */}
            {hasActiveChat && (
                <div className={styles.chatHeader}>

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
                                onClick={() => setHasActiveChat(false)}
                            >
                                New Chat
                            </button>
                        </div>

                        <div className={styles.chatList}>
                            {/* Sample chat history items */}
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((chat) => (
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

                    {/* Main chat area */}
                    <div className={styles.mainContent}>
                        {selectedChat && (
                            <>
                                {/* Chat history */}
                                <div className={styles.chatHistory} ref={chatHistoryRef}>
                                    {selectedChat.messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`${styles.message} ${styles[msg.role]}`}
                                        >
                                            <div className={styles.messageContent}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Sticky chat input area */}
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
                    </div>
                </div>
            )}
        </div>
    );
}
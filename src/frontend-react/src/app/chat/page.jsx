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

export default function ChatPage() {
    // Component States
    const [hasActiveChat, setHasActiveChat] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
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
        }
    };

    return (
        <div className={styles.container}>
            {/* Welcome Header */}
            {/* <div className={styles.welcome}>
                <div className={styles.welcomeIcon}>🌟</div>
                <h1>Good afternoon, Guest</h1>
            </div> */}
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
        </div>
        // <div className={styles.container}>
        //     {/* Hero Section */}
        //     <section className={styles.hero}>
        //         <div className={styles.heroContent}>
        //             <h1>Cheese Assistant</h1>
        //             <p>Explore into the fascinating world of cheese with AI</p>
        //         </div>
        //     </section>

        //     {/* Welcome Section - Shown when no chat is active */}
        //     {!hasActiveChat && (
        //         <div className={styles.welcome}>
        //             <h1>Cheese Assistant</h1>
        //             <p>Start a conversation about cheese or upload an image for identification</p>

        //             <div className={styles.startOptions}>
        //                 <button
        //                     className={styles.startButton}
        //                     onClick={() => setHasActiveChat(true)}
        //                 >
        //                     Start New Chat
        //                 </button>

        //                 <div className={styles.uploadArea}>
        //                     <input
        //                         type="file"
        //                         id="imageUpload"
        //                         className={styles.fileInput}
        //                         accept="image/*"
        //                         onChange={(e) => {
        //                             if (e.target.files[0]) {
        //                                 setHasActiveChat(true);
        //                                 // Handle image upload
        //                             }
        //                         }}
        //                     />
        //                     <label htmlFor="imageUpload" className={styles.uploadButton}>
        //                         Upload Image
        //                     </label>
        //                 </div>
        //             </div>
        //         </div>
        //     )}

        //     {/* Active Chat Interface */}
        //     {hasActiveChat && (
        //         <div className={styles.chatInterface}>
        //             {/* Chat History Sidebar */}
        //             <div className={styles.sidebar}>
        //                 <div className={styles.sidebarHeader}>
        //                     <h2>Chat History</h2>
        //                     <button
        //                         className={styles.newChatButton}
        //                         onClick={() => setSelectedChat(null)}
        //                     >
        //                         New Chat
        //                     </button>
        //                 </div>

        //                 <div className={styles.chatList}>
        //                     {/* Sample chat history items */}
        //                     {[1, 2, 3].map((chat) => (
        //                         <div
        //                             key={chat}
        //                             className={`${styles.chatItem} ${selectedChat === chat ? styles.active : ''}`}
        //                             onClick={() => setSelectedChat(chat)}
        //                         >
        //                             <div className={styles.chatItemContent}>
        //                                 <span className={styles.chatTitle}>
        //                                     Chat {chat}
        //                                 </span>
        //                                 <span className={styles.chatDate}>
        //                                     2 hours ago
        //                                 </span>
        //                             </div>
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>

        //             {/* Main Chat Area */}
        //             <div className={styles.mainChat}>
        //                 <div className={styles.chatMessages}>
        //                     {/* Messages will be rendered here */}
        //                 </div>

        //                 {/* Chat Input */}
        //                 <div className={styles.chatInputArea}>
        //                     <div className={styles.inputWrapper}>
        //                         <input
        //                             type="text"
        //                             placeholder="Type your message..."
        //                             className={styles.chatInput}
        //                         />
        //                         <button className={styles.attachButton}>
        //                             📎
        //                         </button>
        //                         <button className={styles.sendButton}>
        //                             Send
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     )}
        // </div>
    );
}
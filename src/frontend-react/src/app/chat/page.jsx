'use client';
import { useState } from 'react';
import { AttachFile, Send, ArrowForward } from '@mui/icons-material';

// Import the styles
import styles from "./styles.module.css";

const recentChats = [
    {
        id: 1,
        title: 'Exploring the World of Cheese Through AI',
        project: 'formaggio.me',
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
        project: 'formaggio.me',
        time: '3 hours ago'
    },
    {
        id: 4,
        title: 'Troubleshooting Styles in Next.js React App',
        project: 'Next.JS + React APP',
        time: '21 hours ago'
    },
    {
        id: 5,
        title: 'Cheese Icon Request',
        project: null,
        time: '1 day ago'
    }
];

export default function ChatPage() {
    const [hasActiveChat, setHasActiveChat] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');

    return (
        <div className={styles.container}>
            {/* Welcome Header */}
            {/* <div className={styles.welcome}>
                <div className={styles.welcomeIcon}>🌟</div>
                <h1>Good afternoon, Guest</h1>
            </div> */}
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Cheese Assistant</h1>
                    {/* Main Chat Input */}
                    <div className={styles.mainInputContainer}>
                        <textarea
                            className={styles.mainInput}
                            placeholder="How can Formaggio help you today?"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={1}
                        />

                        <div className={styles.inputControls}>
                            <div className={styles.leftControls}>
                                {/* <button className={styles.iconButton}>
                                    <AttachFile />
                                </button> */}
                                <button className={styles.iconButton}>
                                    <span role="img" aria-label="camera">📷</span>
                                </button>
                            </div>

                            <div className={styles.rightControls}>
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



            {/* Recent Chats */}
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
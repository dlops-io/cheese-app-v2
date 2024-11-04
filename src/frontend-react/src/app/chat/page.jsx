'use client';

import { useState, use, useEffect } from 'react';
import { AttachFile, Send, ArrowForward, CameraAltOutlined, ArrowUpwardRounded } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import ChatInput from '@/components/chat/ChatInput';
import ChatHistory from '@/components/chat/ChatHistory';
import ChatHistorySidebar from '@/components/chat/ChatHistorySidebar';
import ChatMessage from '@/components/chat/ChatMessage';
import DataService from "../../services/MockDataService"; // Mock
//import DataService from "../../services/DataService";

// Import the styles
import styles from "./styles.module.css";


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

export default function ChatPage({ searchParams }) {
    const params = use(searchParams)
    const chat_id = params.id;
    console.log(chat_id);

    // Component States
    const [hasActiveChat, setHasActiveChat] = useState(false);
    const [selectedChat, setSelectedChat] = useState(exampleChat);


    // Setup Component
    useEffect(() => {
        if (chat_id) {
            setHasActiveChat(true);
        } else {
            setHasActiveChat(false);
        }
    }, [chat_id]);

    // Handlers
    const newChat = (message) => {

    };
    const appendChat = (message) => {

    };

    return (
        <div className={styles.container}>

            {/* Hero Section */}
            {!hasActiveChat && (
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1>Cheese Assistant 🌟</h1>
                        {/* Main Chat Input: ChatInput */}
                        <ChatInput setHasActiveChat={setHasActiveChat} className={styles.heroChatInputContainer}></ChatInput>
                    </div>
                </section>
            )}

            {/* Chat History Section: ChatHistory */}
            {!hasActiveChat && (
                <ChatHistory></ChatHistory>
            )}

            {/* Chat Block Header Section */}
            {hasActiveChat && (
                <div className={styles.chatHeader}></div>
            )}
            {/* Active Chat Interface */}
            {hasActiveChat && (
                <div className={styles.chatInterface}>
                    {/* Chat History Sidebar: ChatHistorySidebar */}
                    <ChatHistorySidebar setHasActiveChat={setHasActiveChat} setSelectedChat={setSelectedChat} chat_id={chat_id}></ChatHistorySidebar>

                    {/* Main chat area */}
                    <div className={styles.mainContent}>
                        {/* Chat message: ChatMessage */}
                        <ChatMessage chat_id={chat_id}></ChatMessage>
                        <div></div>
                        {/* Sticky chat input area: ChatInput */}
                        <ChatInput setHasActiveChat={setHasActiveChat} chat_id={chat_id}></ChatInput>
                    </div>
                </div>
            )}
        </div>
    );
}
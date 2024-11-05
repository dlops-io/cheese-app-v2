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

export default function ChatPage({ searchParams }) {
    const params = use(searchParams)
    const chat_id = params.id;
    console.log(chat_id);

    // Component States
    const [hasActiveChat, setHasActiveChat] = useState(false);
    const [chat, setChat] = useState(null);

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
    useEffect(() => {
        if (chat_id) {
            fetchChat(chat_id);
            setHasActiveChat(true);
        } else {
            setChat(null);
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
                        <ChatInput addMessage={newChat} className={styles.heroChatInputContainer}></ChatInput>
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
                    <ChatHistorySidebar setHasActiveChat={setHasActiveChat} chat={chat}></ChatHistorySidebar>

                    {/* Main chat area */}
                    <div className={styles.mainContent}>
                        {/* Chat message: ChatMessage */}
                        <ChatMessage chat={chat}></ChatMessage>
                        {/* Sticky chat input area: ChatInput */}
                        <ChatInput addMessage={appendChat} chat={chat}></ChatInput>
                    </div>
                </div>
            )}
        </div>
    );
}
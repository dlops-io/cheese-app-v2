'use client';

import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    const [chatId, setChatId] = useState(params.id);
    const [hasActiveChat, setHasActiveChat] = useState(false);
    const [chat, setChat] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const router = useRouter();

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
        console.log(message);
        // Start a new chat and submit to LLM
        const startChat = async (message) => {
            try {
                const response = await DataService.StartChatWithLLM(message);
                console.log(response.data);
                setChat(response.data);
                setChatId(response.data["id"]);
                setHasActiveChat(true);
                router.push('/chat?id=' + response.data["id"]);
            } catch (error) {
                console.error('Error fetching chat:', error);
                setChat(null);
                setChatId(null);
                setHasActiveChat(false);
                router.push('/chat')
            }
        };
        startChat(message);

    };
    const appendChat = (message) => {
        console.log(message);
        // Append message and submit to LLM

        const continueChat = async (id, message) => {
            try {
                const response = await DataService.ChatWithLLM(id, message);
                console.log(response.data);
                setChat(response.data);
                setHasActiveChat(true);
                forceRefresh();
            } catch (error) {
                console.error('Error fetching chat:', error);
                setChat(null);
                setHasActiveChat(false);
            }
        };
        continueChat(chat_id, message);
    };
    // Force re-render by updating the key
    const forceRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <div className={styles.container}>

            {/* Hero Section */}
            {!hasActiveChat && (
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1>Cheese Assistant 🌟</h1>
                        {/* Main Chat Input: ChatInput */}
                        <ChatInput onSendMessage={newChat} className={styles.heroChatInputContainer}></ChatInput>
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
                    <ChatHistorySidebar chat_id={chat_id}></ChatHistorySidebar>

                    {/* Main chat area */}
                    <div className={styles.mainContent}>
                        {/* Chat message: ChatMessage */}
                        <ChatMessage chat={chat} key={refreshKey}></ChatMessage>
                        {/* Sticky chat input area: ChatInput */}
                        <ChatInput onSendMessage={appendChat} chat={chat}></ChatInput>
                    </div>
                </div>
            )}
        </div>
    );
}
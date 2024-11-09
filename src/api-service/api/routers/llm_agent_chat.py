import os
from fastapi import APIRouter, Query, Body, HTTPException
from fastapi.responses import FileResponse
from typing import Dict, Any, List, Optional
import uuid
import time
from datetime import datetime
import mimetypes
from pathlib import Path
from api.utils.llm_utils import chat_sessions, create_chat_session, generate_chat_response, rebuild_chat_session
from api.utils.chat_utils import ChatHistoryManager


# Define Router
router = APIRouter()

# Initialize chat history manager and sessions
chat_manager = ChatHistoryManager(model="llm-agent")

@router.get("/chats")
async def get_chats(limit: Optional[int] = None):
    """Get all chats, optionally limited to a specific number"""
    return chat_manager.get_recent_chats(limit)

@router.get("/chats/{chat_id}")
async def get_chat(chat_id: str):
    """Get a specific chat by ID"""
    chat = chat_manager.get_chat(chat_id)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return chat

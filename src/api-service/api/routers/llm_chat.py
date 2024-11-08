import os
from fastapi import APIRouter, Query, Body, HTTPException
from typing import Dict, Any, List, Optional
import uuid
import time
from datetime import datetime
import vertexai
from vertexai.language_models import TextEmbeddingInput, TextEmbeddingModel
from vertexai.generative_models import GenerativeModel, ChatSession, Content, Part, GenerationConfig, ToolConfig
from api.chat_utils import ChatHistoryManager

# Define Router
router = APIRouter()

# Setup
GCP_PROJECT = os.environ["GCP_PROJECT"]
GCP_LOCATION = "us-central1"
EMBEDDING_MODEL = "text-embedding-004"
EMBEDDING_DIMENSION = 256
GENERATIVE_MODEL = "gemini-1.5-flash-002"

# Configuration settings for the content generation
generation_config = {
    "max_output_tokens": 3000,  # Maximum number of tokens for output
    "temperature": 0.1,  # Control randomness in output
    "top_p": 0.95,  # Use nucleus sampling
}
# Initialize the GenerativeModel with specific system instructions
SYSTEM_INSTRUCTION = """
You are an AI assistant specialized in cheese knowledge.

When answering a query:
1. Demonstrate expertise in cheese, including aspects like:
  - Production methods and techniques
  - Flavor profiles and characteristics
  - Aging processes and requirements
  - Regional varieties and traditions
  - Pairing recommendations
  - Storage and handling best practices
2. Always maintain a professional and knowledgeable tone, befitting a cheese expert.

Your goal is to provide accurate, helpful information about cheese for each query.
"""
generative_model = GenerativeModel(
	GENERATIVE_MODEL,
	system_instruction=[SYSTEM_INSTRUCTION]
)


# def generate_chat_response(input_prompt):
#      responses = generative_model.generate_content(
# 		[input_prompt],  # Input prompt
# 		generation_config=generation_config,  # Configuration settings
# 		stream=False,  # Enable streaming for responses
# 	)
#      return responses.text

# @router.post("/chat")
# async def get_chat_response(request: Dict[str, Any] = Body(...)) -> Dict[str, str]:
#     prompt = request.get("prompt")
#     if not prompt:
#         return {"error": "No prompt provided"}
#     response = generate_chat_response(prompt)
#     return {"response": response}

# In-memory storage for chats and their associated chat sessions
#recent_chats: List[Dict] = []
# Initialize chat history manager and sessions
chat_manager = ChatHistoryManager()
chat_sessions: Dict[str, ChatSession] = {}

def create_chat_session() -> ChatSession:
    """Create a new chat session with the model"""
    return generative_model.start_chat()

def generate_chat_response(chat_session: ChatSession, message: str) -> str:
    """Generate a response using the chat session to maintain history"""
    response = chat_session.send_message(
        message,
        generation_config=generation_config
    )
    return response.text

def rebuild_chat_session(chat_history: List[Dict]) -> ChatSession:
    """Rebuild a chat session with complete context"""
    new_session = create_chat_session()
    
    for message in chat_history:
        if message["role"] == "user":
            response = new_session.send_message(
                message["content"],
                generation_config=generation_config
            )
    
    return new_session


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

@router.post("/chats")
async def start_chat_with_llm(message: Dict):
    print("message:", message)
    """Start a new chat with an initial message"""
    chat_id = str(uuid.uuid4())
    current_time = int(time.time())
    
    # Create a new chat session
    chat_session = create_chat_session()
    chat_sessions[chat_id] = chat_session
    
    # Add ID and role to the user message
    message["message_id"] = str(uuid.uuid4())
    message["role"] = "user"
    
    # Generate response
    assistant_response = generate_chat_response(chat_session, message["content"])
    
    # Create chat response
    chat_response = {
        "chat_id": chat_id,
        "title": message["content"][:50] + "..." if len(message["content"]) > 50 else message["content"],
        "dts": current_time,
        "messages": [
            message,
            {
                "message_id": str(uuid.uuid4()),
                "role": "assistant",
                "content": assistant_response
            }
        ]
    }
    
    # Save chat
    chat_manager.save_chat(chat_response)
    return chat_response

@router.post("/chats/{chat_id}")
async def chat_with_llm(chat_id: str, message: Dict):
    print("message:", message)
    """Add a message to an existing chat"""
    chat = chat_manager.get_chat(chat_id)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    # Get or rebuild chat session
    chat_session = chat_sessions.get(chat_id)
    if not chat_session:
        chat_session = rebuild_chat_session(chat["messages"])
        chat_sessions[chat_id] = chat_session
    
    # Update timestamp
    current_time = int(time.time())
    chat["dts"] = current_time
    
    # Add message ID and role
    message["message_id"] = str(uuid.uuid4())
    message["role"] = "user"
    
    # Generate response
    assistant_response = generate_chat_response(chat_session, message["content"])
    
    # Add messages
    chat["messages"].append(message)
    chat["messages"].append({
        "message_id": str(uuid.uuid4()),
        "role": "assistant",
        "content": assistant_response
    })
    
    # Save updated chat
    chat_manager.save_chat(chat)
    return chat
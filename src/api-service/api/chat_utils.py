import json
import os
from typing import Dict, List, Optional
from datetime import datetime
import shutil

class ChatHistoryManager:
    def __init__(self, history_dir: str = "chat-history"):
        """Initialize the chat history manager with the specified directory"""
        self.history_dir = history_dir
        self.recent_chats: List[Dict] = []
        self._ensure_history_dir()
        self.load_chat_history()
    
    def _ensure_history_dir(self) -> None:
        """Ensure the chat history directory exists"""
        if not os.path.exists(self.history_dir):
            os.makedirs(self.history_dir)
    
    def _get_chat_filepath(self, chat_id: str) -> str:
        """Get the full file path for a chat JSON file"""
        return os.path.join(self.history_dir, f"{chat_id}.json")
    
    def load_chat_history(self) -> None:
        """Load all chat history from files into memory"""
        self.recent_chats.clear()
        
        if not os.path.exists(self.history_dir):
            return
        
        for filename in os.listdir(self.history_dir):
            if filename.endswith('.json'):
                filepath = os.path.join(self.history_dir, filename)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        chat_data = json.load(f)
                        self.recent_chats.append(chat_data)
                except Exception as e:
                    print(f"Error loading chat history from {filename}: {str(e)}")
        
        # Sort chats by timestamp (newest first)
        self.recent_chats.sort(key=lambda x: x.get('dts', 0), reverse=True)
    
    def save_chat(self, chat_data: Dict) -> None:
        """Save a chat to both memory and file"""
        # Update in memory
        existing_chat = next((chat for chat in self.recent_chats 
                            if chat['chat_id'] == chat_data['chat_id']), None)
        
        if existing_chat:
            # Update existing chat
            existing_index = self.recent_chats.index(existing_chat)
            self.recent_chats[existing_index] = chat_data
        else:
            # Add new chat
            self.recent_chats.append(chat_data)
        
        # Save to file
        filepath = self._get_chat_filepath(chat_data['chat_id'])
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(chat_data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error saving chat {chat_data['chat_id']}: {str(e)}")
            raise e
    
    def get_chat(self, chat_id: str) -> Optional[Dict]:
        """Get a specific chat by ID"""
        return next((chat for chat in self.recent_chats if chat['chat_id'] == chat_id), None)
    
    def get_recent_chats(self, limit: Optional[int] = None) -> List[Dict]:
        """Get recent chats, optionally limited to a specific number"""
        # Sort by dts
        self.recent_chats.sort(key=lambda x: x.get('dts', 0), reverse=True)
        if limit:
            return self.recent_chats[:limit]
        return self.recent_chats
        """Create a backup of the chat history"""
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            backup_path = f"{backup_dir}/chat_history_backup_{timestamp}"
            
            if os.path.exists(self.history_dir):
                shutil.copytree(self.history_dir, backup_path)
            
            return True
        except Exception as e:
            print(f"Error creating backup: {str(e)}")
            return False
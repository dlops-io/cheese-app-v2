import json
import os
from typing import Dict, List, Optional
from datetime import datetime
import shutil
import base64
import traceback
import io
        
class ChatHistoryManager:
    def __init__(self, model, history_dir: str = "chat-history"):
        """Initialize the chat history manager with the specified directory"""
        self.model = model
        self.history_dir = os.path.join(history_dir, model)
        self.images_dir = os.path.join(self.history_dir, "images")
        self.recent_chats: List[Dict] = []
        self._ensure_directories()
        self.load_chat_history()
    
    def _ensure_directories(self) -> None:
        """Ensure the chat history directory exists"""
        os.makedirs(self.history_dir, exist_ok=True)
        os.makedirs(self.images_dir, exist_ok=True)
    
    def _get_chat_filepath(self, chat_id: str) -> str:
        """Get the full file path for a chat JSON file"""
        return os.path.join(self.history_dir, f"{chat_id}.json")
    
    def _save_image(self, chat_id: str, message_id: str, image_data: str) -> str:
        """
        Save image data to a file and return the relative path.
        
        Args:
            chat_id: The chat ID
            message_id: The message ID
            image_data: Base64 encoded image data
        
        Returns:
            str: Relative path to the saved image
        """
        # Create chat-specific image directory
        chat_images_dir = os.path.join(self.images_dir, chat_id)
        os.makedirs(chat_images_dir, exist_ok=True)
        
        # Save image to file
        image_path = os.path.join(chat_images_dir, f"{message_id}.png")
        try:
            # Extract the actual base64 data and mime type
            base64_string = image_data
            if ',' in base64_string:
                header, base64_data = base64_string.split(',', 1)
                mime_type = header.split(':')[1].split(';')[0]
            else:
                base64_data = base64_string
                mime_type = 'image/jpeg'  # default to JPEG if no header
            
            # Decode base64 to bytes
            image_bytes = base64.b64decode(base64_data)
            
            with open(image_path, 'wb') as f:
                f.write(image_bytes)
            
            # Return relative path from chat history root
            return os.path.relpath(image_path, self.history_dir)
        except Exception as e:
            print(f"Error saving image: {str(e)}")
            traceback.print_exc()
            return ""

    def _load_image(self, relative_path: str) -> Optional[str]:
        """
        Load image data from file and return as base64.
        
        Args:
            relative_path: Relative path to the image from chat history root
        
        Returns:
            Optional[str]: Base64 encoded image data or None if loading fails
        """
        full_path = os.path.join(self.history_dir, relative_path)
        try:
            if os.path.exists(full_path):
                with open(full_path, 'rb') as f:
                    image_bytes = f.read()
                return base64.b64encode(image_bytes).decode('utf-8')
        except Exception as e:
            print(f"Error loading image: {str(e)}")
            traceback.print_exc()
        return None
     
    def load_chat_history_old(self) -> None:
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
                    traceback.print_exc()
        
        # Sort chats by timestamp (newest first)
        self.recent_chats.sort(key=lambda x: x.get('dts', 0), reverse=True)
    
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
                        
                        # Load images for each message
                        # for message in chat_data["messages"]:
                        #     if "image_path" in message:
                        #         image_data = self._load_image(message["image_path"])
                        #         if image_data:
                        #             message["image"] = image_data
                        #         del message["image_path"]
                        
                        self.recent_chats.append(chat_data)
                except Exception as e:
                    print(f"Error loading chat history from {filename}: {str(e)}")
                    traceback.print_exc()
        
        # Sort chats by timestamp
        self.recent_chats.sort(key=lambda x: x.get('dts', 0), reverse=True)
    
    def save_chat_old(self, chat_data: Dict) -> None:
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
            traceback.print_exc()
            raise e
    
    def save_chat(self, chat_to_save: Dict) -> None:
        """Save a chat to both memory and file, handling images separately"""
        # Create a copy of chat data to modify
        #chat_to_save = chat_data.copy()
        
        # Process messages to save images separately
        for message in chat_to_save["messages"]:
            if "image" in message and message["image"] is not None:
                print("image:",message["image"])
                # Save image and replace with path
                image_path = self._save_image(
                    chat_to_save["chat_id"],
                    message["message_id"],
                    message["image"]
                )
                if image_path:
                    message["image_path"] = image_path
                del message["image"]
        
        # Save chat data
        filepath = self._get_chat_filepath(chat_to_save["chat_id"])
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(chat_to_save, f, indent=2, ensure_ascii=False)
            
            # Update in memory
            # Need to keep the original with image data in memory
            existing_chat = next(
                (chat for chat in self.recent_chats 
                 if chat['chat_id'] == chat_to_save['chat_id']),
                None
            )
            
            if existing_chat:
                # Update existing chat
                existing_index = self.recent_chats.index(existing_chat)
                self.recent_chats[existing_index] = chat_to_save
            else:
                # Add new chat
                self.recent_chats.append(chat_to_save)
                
        except Exception as e:
            print(f"Error saving chat {chat_to_save['chat_id']}: {str(e)}")
            traceback.print_exc()
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
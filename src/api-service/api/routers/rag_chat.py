import os
from fastapi import APIRouter, Query, Body
from typing import Dict, Any
import vertexai
from vertexai.language_models import TextEmbeddingInput, TextEmbeddingModel
from vertexai.generative_models import GenerativeModel, ChatSession, Content, Part, GenerationConfig, ToolConfig


# Define Router
router = APIRouter()
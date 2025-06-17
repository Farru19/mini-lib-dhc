from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Book(BaseModel):
    id: int
    title: str
    author: str
    year: int
    created_at: datetime

class Library(BaseModel):
    id: int
    name: str
    books: List[Book]
    location: Optional[str] = None
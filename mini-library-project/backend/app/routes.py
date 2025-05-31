from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import List, Optional
from .models import Book
from datetime import datetime

router = APIRouter()

# Dummy data
books = [
    Book(id=1, title="1984", author="George Orwell", year=1949, created_at=datetime(2023, 1, 10, 14, 30), file_url=None),
    Book(id=2, title="Brave New World", author="Aldous Huxley", year=1932, created_at=datetime(2023, 2, 5, 9, 15), file_url=None),
    Book(id=3, title="To Kill a Mockingbird", author="Harper Lee", year=1960, created_at=datetime(2023, 3, 12, 16, 45), file_url="files/3_mockingbird.pdf"),
    Book(id=4, title="The Great Gatsby", author="F. Scott Fitzgerald", year=1925, created_at=datetime(2023, 4, 20, 11, 0), file_url=None),
    Book(id=5, title="Pride and Prejudice", author="Jane Austen", year=1813, created_at=datetime(2023, 5, 8, 13, 20), file_url="files/5_pride.pdf"),
    Book(id=6, title="The Catcher in the Rye", author="J.D. Salinger", year=1951, created_at=datetime(2023, 6, 18, 10, 5), file_url=None),
    Book(id=7, title="The Hobbit", author="J.R.R. Tolkien", year=1937, created_at=datetime(2023, 7, 22, 17, 40), file_url="files/7_hobbit.pdf"),
    Book(id=8, title="Fahrenheit 451", author="Ray Bradbury", year=1953, created_at=datetime(2023, 8, 30, 8, 55), file_url=None),
    Book(id=9, title="Moby-Dick", author="Herman Melville", year=1851, created_at=datetime(2023, 9, 14, 15, 10), file_url=None),
    Book(id=10, title="War and Peace", author="Leo Tolstoy", year=1869, created_at=datetime(2023, 10, 3, 12, 25), file_url="files/10_warpeace.pdf"),
]

@router.post("/books/", response_model=Book)
async def create_book(
    title: str = Form(...),
    author: str = Form(...),
    year: int = Form(...),
    file: Optional[UploadFile] = File(None)
):
    book_id = books[-1].id + 1 if books else 1
    file_url = None
    if file:
        file_location = f"files/{book_id}_{file.filename}"
        with open(file_location, "wb") as f:
            f.write(await file.read())
        file_url = file_location
    book = Book(
        id=book_id,
        title=title,
        author=author,
        year=year,
        created_at=datetime.now(),
        file_url=file_url
    )
    books.append(book)
    return book

@router.get("/books", response_model=List[Book])
def get_books():
    return books

@router.get("/books/{book_id}", response_model=Book)
def read_book(book_id: int):
    for book in books:
        if book.id == book_id:
            return book
    raise HTTPException(status_code=404, detail="Book not found")

@router.delete("/books/{book_id}", response_model=Book)
def delete_book(book_id: int):
    for index, book in enumerate(books):
        if book.id == book_id:
            return books.pop(index)
    raise HTTPException(status_code=404, detail="Book not found")

@router.get("/books/search/", response_model=List[Book])
def search_books(q: Optional[str] = None):
    if not q:
        return books
    q_lower = q.lower()
    return [
        book for book in books
        if q_lower in book.title.lower() or q_lower in book.author.lower()
    ]
# Mini Library Backend

This is the FastAPI backend for the Mini Library project.

## Features

- Provides a REST API for managing books.
- Supports listing, adding, editing, and deleting books.
- Each book has: `id`, `title`, `author`, `year`, `created_at`, and optional `file_url`.
- `created_at` dates are generated dynamically.
- No reading status field is present.

## Endpoints

### `GET /books`

Returns a list of all books.

### `POST /books/`

Add a new book.

- **Form fields:** `title` (str), `author` (str), `year` (int), `file` (optional file upload)
- Example using `curl`:

  ```sh
  curl -X POST "http://localhost:8000/books/" -F "title=Book Title" -F "author=Author Name" -F "year=2024"
  ```

### `PUT /books/{id}`

Update an existing book (if implemented).

### `DELETE /books/{id}`

Delete a book by ID (if implemented).

## Book Model

```python
Book(
    id: int,
    title: str,
    author: str,
    year: int,
    created_at: datetime,
    file_url: Optional[str] = None
)
```

## Running the Backend

1. Install dependencies:

    ```sh
    pip install fastapi uvicorn
    ```

2. Start the server:

    ```sh
    uvicorn app.main:app --reload
    ```

## Notes

- The backend uses in-memory data; changes are not persisted after restart.
- The `created_at` field is set dynamically when the backend starts or when a book is added.
- There is **no status field** in the book data.

---

For the frontend, see the `frontend/README.md`.

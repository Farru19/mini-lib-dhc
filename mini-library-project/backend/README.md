# Backend

FastAPI backend for the Mini Library Project.

This backend provides a RESTful API for managing a mini library, including listing, searching, adding, and deleting books. It is designed to work seamlessly with the SAPUI5 frontend.

## Project Structure

- **app/**: Contains the main application code.
  - **main.py**: Entry point of the FastAPI application, sets up CORS and includes API routes.
  - **models.py**: Defines the data models (`Book`, `Library`) using Pydantic.
  - **routes.py**: Contains route definitions for the API, including dummy in-memory book data and endpoints for CRUD operations.
  - **`__init__.py`**: Marks the directory as a Python package.

## Installation

To set up the backend, ensure you have Python 3.7 or higher installed. Then, install the required dependencies using pip:

```bash
pip install -r requirements.txt
```

## Running the Application

To run the FastAPI application, use the following command from the `backend` directory:

```bash
uvicorn app.main:app --reload
```

This will start the server at `http://127.0.0.1:8000`.  
You can access the interactive API documentation at `http://127.0.0.1:8000/docs`.

## How It Works

- **FastAPI** is used to create a high-performance REST API.
- **CORS** is enabled to allow the SAPUI5 frontend (running on a different port) to communicate with the backend.
- **In-memory database**: The backend uses a Python list to store book data for demonstration. Each book includes fields like `title`, `author`, `year`, `created_at`, and optional `file_url`.
- **Endpoints**:
  - `GET /books`: List all books.
  - `GET /books/{book_id}`: Get details of a specific book.
  - `POST /books/`: Add a new book (with optional file upload).
  - `DELETE /books/{book_id}`: Delete a book.
  - `GET /books/search/?q=...`: Search books by title or author.
- **File uploads**: When adding a book, you can upload a file (e.g., PDF), which will be saved in the `files/` directory and its path stored in the book's `file_url`.

## Endpoints

The backend provides various endpoints for managing library operations.  
Refer to the `routes.py` file for detailed information on available endpoints and their usage, or use the `/docs` Swagger UI for interactive exploration.

## Contributing

If you wish to contribute to the project, please fork the repository and submit a pull request with your changes.

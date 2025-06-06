# Mini Library Project

This project is a mini library application that utilizes **SAPUI5** for the frontend and **FastAPI** for the backend. The application allows users to manage a collection of books, providing functionalities such as adding, viewing, searching, and deleting books. The frontend is written in TypeScript and compiled to JavaScript for browser use.

---

## Project Structure

```text
mini-library-project
├── backend
│   ├── app
│   │   ├── main.py          # Entry point for the FastAPI application, sets up CORS and includes API routes
│   │   ├── models.py        # Data models for the application (Book, Library)
│   │   ├── routes.py        # Route definitions for the API, dummy in-memory book data, CRUD endpoints
│   │   └── __init__.py      # Marks the directory as a Python package
│   ├── requirements.txt     # Python dependencies for the backend
│   └── README.md            # Documentation for the backend
├── frontend
│   ├── index.html           # Main HTML file that loads SAPUI5 and bootstraps the app
│   ├── src
│   │   ├── index.ts         # Entry point for the SAPUI5 application
│   │   ├── controllers
│   │   │   └── Library.controller.ts # Logic for fetching book data from the backend
│   │   ├── views
│   │   │   └── Library.view.ts       # UI components for the library interface (SAPUI5 Table)
│   │   └── types
│   │       ├── index.ts             # Type definitions for Book and related types
│   │       └── global.d.ts          # Global type fixes for SAPUI5 and jQuery compatibility
│   ├── dist                        # Compiled JavaScript files
│   ├── package.json                # npm configuration for the frontend
│   ├── tsconfig.json               # TypeScript configuration
│   └── README.md                   # Documentation for the frontend
└── README.md                       # Overall documentation for the mini library project
```

---

## Getting Started

### Prerequisites

- Python 3.7 or higher
- Node.js (v16 or higher recommended) and npm

---

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install the required Python packages:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the FastAPI application:**

   ```bash
   uvicorn app.main:app --reload
   ```

   - The server will start at `http://127.0.0.1:8000`
   - Interactive API docs available at `http://127.0.0.1:8000/docs`

#### Backend Features

- **FastAPI** provides a high-performance REST API.
- **CORS** is enabled for frontend-backend communication.
- **In-memory database**: Book data is stored in a Python list for demonstration.
- **Endpoints**:
  - `GET /books`: List all books.
  - `GET /books/{book_id}`: Get details of a specific book.
  - `POST /books/`: Add a new book (with optional file upload).
  - `DELETE /books/{book_id}`: Delete a book.
  - `GET /books/search/?q=...`: Search books by title or author.
- **File uploads**: When adding a book, you can upload a file (e.g., PDF), which is saved in the `files/` directory.
- **No reading status**: The backend and API do not include any reading status field.

---

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install the required npm packages:**

   ```bash
   npm install
   ```

3. **Build the TypeScript files:**

   ```bash
   npm run build
   ```

4. **Serve the application:**

   ```bash
   npm start
   ```

   - This will serve `index.html` and compiled files at [http://localhost:8080](http://localhost:8080).

#### Frontend Features

- **SAPUI5** UI built in TypeScript, compiled to JavaScript.
- **index.html** loads SAPUI5 from CDN and bootstraps the app.
- **Library.view.ts** creates a SAPUI5 table showing books with columns for Title, Author, Created On, Created By, and Edit/Delete buttons.
- **Library.controller.ts** fetches book data from the backend.
- **TypeScript types** for SAPUI5 and jQuery are included for type safety.
- **Development server** (`http-server` or npm start) serves the frontend for local development.
- **No status column**: The UI does not display or manage any reading status.

---

## Usage

- Open your browser and go to [http://localhost:8080](http://localhost:8080).
- The SAPUI5 UI will display a table of books fetched from the backend.
- Make sure the backend FastAPI server is running at `http://localhost:8000` for the frontend to fetch data.
- Do **not** open `index.html` directly with `file://` in your browser; always use the HTTP server.

---

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

--- 

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

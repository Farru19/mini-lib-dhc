# Frontend

SAPUI5 frontend for the Mini Library Project.

This frontend is built using SAPUI5 and TypeScript. It connects to the FastAPI backend to display, search, and manage books in a mini library.

## Project Structure

- **index.html**: Main HTML file that loads SAPUI5 and bootstraps the app.
- **src/**: Contains the TypeScript source files.
  - **index.ts**: Entry point for the SAPUI5 application.
  - **controllers/**: Contains controller files that manage the logic for different views.
    - **Library.controller.ts**: Controller for fetching book data from the backend.
  - **views/**: Contains view files that define the UI components.
    - **Library.view.ts**: View for the library interface, builds the SAPUI5 table and renders book data.
  - **types/**: Contains TypeScript type definitions.
    - **index.ts**: Type definitions for Book and related types.
    - **global.d.ts**: Global type fixes for SAPUI5 and jQuery compatibility.
- **dist/**: Contains the compiled JavaScript files generated from the TypeScript source code.

## Requirements

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)
- TypeScript
- SAPUI5 (loaded via CDN in `index.html`)
- Type definitions:
  - `@openui5/ts-types`
  - `@types/jquery`
- Static server for development (e.g., `http-server`)

## Setup Instructions

1. **Install Dependencies**:  
   Navigate to the `frontend` directory and run:

   ```bash
   npm install
   ```

2. **Build the Project**:  
   To compile the TypeScript files into JavaScript, run:

   ```bash
   npm run build
   ```

3. **Serve the Application**:  
   To start the application with a local server, run:

   ```bash
   npm start
   ```

   This will serve `index.html` and the compiled files at [http://localhost:8080](http://localhost:8080).

## Usage

- Open your browser and go to [http://localhost:8080](http://localhost:8080).
- The SAPUI5 UI will display a table of books fetched from the backend.
- The UI supports listing books with columns for Title, Author, Created On, Created By, and an Edit button.
- Make sure the backend FastAPI server is running at `http://localhost:8000` for the frontend to fetch data.

## Notes

- Do **not** open `index.html` directly with `file://` in your browser; always use the HTTP server.
- If you add or change TypeScript files, re-run `npm run build` before refreshing the browser.
- The frontend expects the backend API to be available and CORS enabled.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Your feedback and contributions are welcome!

namespace mini.library.controllers {
    export class LibraryController {
        async fetchBooks() {
            const response = await fetch("http://localhost:8000/books");
            return response.json();
        }
    }
}
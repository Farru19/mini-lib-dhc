namespace mini.library.controllers {
    export class LibraryController {
        async fetchBooks() {
            const response = await fetch("https://mini-lib-dhc.onrender.com/books");
            return response.json();
        }
    }
}
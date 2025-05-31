export {}; // Make this file an external module

// @ts-ignore
const LibraryView = mini.library.views.LibraryView;

// Define Book, Library, and User interfaces in the global namespace for SAPUI5 compatibility

declare global {
    interface Book {
        id: number;
        title: string;
        author: string;
        year: number;
    }

    interface Library {
        id: number;
        name: string;
        location: string;
        books: Book[];
    }

    interface User {
        id: number;
        name: string;
        email: string;
        borrowedBooks: Book[];
    }
}

// No export statements needed; interfaces are now globally available.
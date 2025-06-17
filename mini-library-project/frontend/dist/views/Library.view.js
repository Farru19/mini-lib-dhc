"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var mini;
(function (mini) {
    var library;
    (function (library) {
        var views;
        (function (views) {
            class LibraryView {
                constructor() {
                    this.controller = new mini.library.controllers.LibraryController();
                    this.allBooks = [];
                    this.createView();
                    this.loadBooks();
                }
                createView() {
                    this.oTable = new sap.m.Table({
                        headerToolbar: new sap.m.Toolbar({
                            design: sap.m.ToolbarDesign.Transparent,
                            content: [
                                new sap.m.Title({
                                    text: "📚 Mini Library",
                                    level: sap.ui.core.TitleLevel.H1,
                                }),
                                new sap.m.ToolbarSpacer(),
                                new sap.m.SearchField({
                                    width: "300px",
                                    placeholder: "Search books...",
                                    liveChange: (oEvent) => {
                                        const query = oEvent.getParameter("newValue").toLowerCase();
                                        this.filterBooks(query);
                                    }
                                }),
                                new sap.m.Button({
                                    text: "Add Book",
                                    type: sap.m.ButtonType.Emphasized,
                                    press: () => this.onAddBook()
                                })
                            ]
                        }),
                        columns: [
                            new sap.m.Column({ header: new sap.m.Label({ text: "Title" }) }),
                            new sap.m.Column({ header: new sap.m.Label({ text: "Author" }) }),
                            new sap.m.Column({ header: new sap.m.Label({ text: "Created On" }) }),
                            new sap.m.Column({ header: new sap.m.Label({ text: "Created By" }) }),
                            new sap.m.Column({ header: new sap.m.Label({ text: "Edit" }) })
                        ]
                    });
                }
                loadBooks() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const books = yield this.controller.fetchBooks();
                        this.allBooks = books;
                        this.renderBooks(books);
                    });
                }
                renderBooks(books) {
                    this.oTable.removeAllItems();
                    books.forEach((book) => {
                        const createdOn = new Date(book.created_at).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        });
                        const row = new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: book.title }),
                                new sap.m.Text({ text: book.author }),
                                new sap.m.Text({ text: createdOn }),
                                new sap.m.Text({ text: "Admin" }),
                                new sap.m.HBox({
                                    items: [
                                        new sap.m.Button({
                                            text: "Edit",
                                            type: sap.m.ButtonType.Default,
                                            press: () => this.onEditBook(book)
                                        }),
                                        new sap.m.Button({
                                            text: "Delete",
                                            type: sap.m.ButtonType.Reject,
                                            press: () => this.onDeleteBook(book)
                                        })
                                    ]
                                })
                            ]
                        });
                        this.oTable.addItem(row);
                    });
                }
                filterBooks(query) {
                    if (!query) {
                        this.renderBooks(this.allBooks);
                        return;
                    }
                    const filtered = this.allBooks.filter(book => book.title.toLowerCase().includes(query) ||
                        book.author.toLowerCase().includes(query));
                    this.renderBooks(filtered);
                }
                onEditBook(book) {
                    const titleInput = new sap.m.Input({ value: book.title, width: "100%" });
                    const authorInput = new sap.m.Input({ value: book.author, width: "100%" });
                    const dialog = new sap.m.Dialog({
                        title: "Edit Book",
                        content: [
                            new sap.m.Label({ text: "Title" }),
                            titleInput,
                            new sap.m.Label({ text: "Author" }),
                            authorInput
                        ],
                        beginButton: new sap.m.Button({
                            text: "Save",
                            type: sap.m.ButtonType.Emphasized,
                            press: () => {
                                book.title = titleInput.getValue();
                                book.author = authorInput.getValue();
                                this.renderBooks(this.allBooks);
                                dialog.close();
                            }
                        }),
                        endButton: new sap.m.Button({
                            text: "Cancel",
                            press: () => dialog.close()
                        }),
                        afterClose: () => dialog.destroy()
                    });
                    dialog.open();
                }
                onAddBook() {
                    const titleInput = new sap.m.Input({ placeholder: "Book Title", width: "100%" });
                    const authorInput = new sap.m.Input({ placeholder: "Author", width: "100%" });
                    const dialog = new sap.m.Dialog({
                        title: "Add Book",
                        content: [
                            new sap.m.Label({ text: "Title" }),
                            titleInput,
                            new sap.m.Label({ text: "Author" }),
                            authorInput
                        ],
                        beginButton: new sap.m.Button({
                            text: "Add",
                            type: sap.m.ButtonType.Emphasized,
                            press: async () => {
                                const title = titleInput.getValue().trim();
                                const author = authorInput.getValue().trim();
                                if (!title || !author) {
                                    sap.m.MessageToast.show("Please enter both title and author.");
                                    return;
                                }
                                // Send POST request to backend
                                try {
                                    const response = await fetch("http://localhost:8000/books/", {
                                        method: "POST",
                                        body: new URLSearchParams({
                                            title,
                                            author,
                                            year: new Date().getFullYear().toString()
                                        })
                                    });
                                    if (!response.ok) {
                                        throw new Error("Failed to add book");
                                    }
                                    const newBook = await response.json();
                                    this.allBooks.push(newBook);
                                    this.renderBooks(this.allBooks);
                                    dialog.close();
                                } catch (error) {
                                    sap.m.MessageToast.show("Error adding book: " + error.message);
                                }
                            }
                        }),
                        endButton: new sap.m.Button({
                            text: "Cancel",
                            press: () => dialog.close()
                        }),
                        afterClose: () => dialog.destroy()
                    });
                    dialog.open();
                }
                onDeleteBook(book) {
                    const dialog = new sap.m.Dialog({
                        title: "Delete Book",
                        type: sap.m.DialogType.Message,
                        content: new sap.m.Text({ text: `Are you sure you want to delete "${book.title}"?` }),
                        beginButton: new sap.m.Button({
                            text: "Delete",
                            type: sap.m.ButtonType.Reject,
                            press: () => {
                                this.allBooks = this.allBooks.filter(b => b.id !== book.id);
                                this.renderBooks(this.allBooks);
                                dialog.close();
                            }
                        }),
                        endButton: new sap.m.Button({
                            text: "Cancel",
                            press: () => dialog.close()
                        }),
                        afterClose: () => dialog.destroy()
                    });
                    dialog.open();
                }
                getView() {
                    return this.oTable;
                }
            }
            views.LibraryView = LibraryView;
        })(views = library.views || (library.views = {}));
    })(library = mini.library || (mini.library = {}));
})(mini || (mini = {}));

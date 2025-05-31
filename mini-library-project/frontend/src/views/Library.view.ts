namespace mini.library.views {
    export class LibraryView {
        private oTable!: sap.m.Table;
        private controller = new mini.library.controllers.LibraryController();
        private allBooks: any[] = [];

        constructor() {
            this.createView();
            this.loadBooks();
        }

        private createView(): void {
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
                            liveChange: (oEvent: any) => {
                                const query = (oEvent.getParameter("newValue") as string).toLowerCase();
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

        private async loadBooks(): Promise<void> {
            const books = await this.controller.fetchBooks();
            this.allBooks = books;
            this.renderBooks(books);
        }

        private renderBooks(books: any[]): void {
            this.oTable.removeAllItems();
            books.forEach((book: any) => {
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

        private filterBooks(query: string): void {
            if (!query) {
                this.renderBooks(this.allBooks);
                return;
            }
            const filtered = this.allBooks.filter(book =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)
            );
            this.renderBooks(filtered);
        }

        private onEditBook(book: any): void {
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

        private onAddBook(): void {
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
                    press: () => {
                        const title = titleInput.getValue().trim();
                        const author = authorInput.getValue().trim();
                        if (!title || !author) {
                            (sap.m as any).MessageToast.show("Please enter both title and author.");
                            return;
                        }
                        // Add the new book to the list
                        const newBook = {
                            id: this.allBooks.length ? Math.max(...this.allBooks.map(b => b.id)) + 1 : 1,
                            title,
                            author,
                            year: new Date().getFullYear(),
                            created_at: new Date().toISOString(),
                            file_url: null,
                            status: "Want to Read" // Default status
                        };
                        this.allBooks.push(newBook);
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

        private onDeleteBook(book: any): void {
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

        public getView(): sap.ui.core.Control {
            return this.oTable;
        }
    }
}
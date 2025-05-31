namespace mini.library.views {
    export class LibraryView {
        private oTable!: sap.m.Table;
        private controller = new mini.library.controllers.LibraryController();

        constructor() {
            this.createView();
            this.loadBooks();
        }

        private createView(): void {
            this.oTable = new sap.m.Table({
                headerToolbar: new sap.m.Toolbar({
                    content: [
                        new sap.m.Title({ text: "Mini Library" }),
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
            books.forEach((book: any) => {
                const createdOn = new Date(book.created_at).toISOString();
                const row = new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({ text: book.title }),
                        new sap.m.Text({ text: book.author }),
                        new sap.m.Text({ text: createdOn }),
                        new sap.m.Text({ text: "Admin" }), // Or book.created_by if available
                        new sap.m.Button({ text: "Edit", type: sap.m.ButtonType.Default })
                    ]
                });
                this.oTable.addItem(row);
            });
        }

        public getView(): sap.ui.core.Control {
            return this.oTable;
        }
    }
}
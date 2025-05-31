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
                    this.createView();
                    this.loadBooks();
                }
                createView() {
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
                loadBooks() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const books = yield this.controller.fetchBooks();
                        books.forEach((book) => {
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
                    });
                }
                getView() {
                    return this.oTable;
                }
            }
            views.LibraryView = LibraryView;
        })(views = library.views || (library.views = {}));
    })(library = mini.library || (mini.library = {}));
})(mini || (mini = {}));

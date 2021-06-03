sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
    (Controller, MessageToast) => {
        "use strict"
        return Controller.extend("org.ubb.books.controller.Books", {
            read: function() {
                const book = {
                    BooksAvailable: parseInt(this.byId("available").getValue()),
                    TotalNumberBooks: parseInt(this.byId("total").getValue()),
                    DatePublished: this.byId("datepublished").getValue(),
                    Language: this.byId("language").getValue(),
                    Author: this.byId("author").getValue(),
                    Title: this.byId("title").getValue(),
                    Isbn: this.byId("isbn").getValue()
                };
                return book
            },
            create: function () {
                const book = this.read()
                console.log("hello")
                if (book.available > book.total) {
                    MessageToast.show("More books available than total")
                    return
                }
                this.getView().getModel().create("/BookSet", book, {
                    success: () => {
                        MessageToast.show("Created successfully")
                    },
                    error: () => {
                        MessageToast.show("Could not create")
                    }
                })
            },
            update: function () {
                const book = this.read()
                if (book.available > book.total) {
                    MessageToast.show("More books available than total")
                    return
                }
                this.getView().getModel().update("/BookSet('" + book.Isbn + "')", book, {
                    success: () => {
                        MessageToast.show("Updated successfully")
                    },
                    error: () => {
                        MessageToast.show("Could not update")
                    }
                })
            },
            delete: function () {
                console.log("am intart")
                const book = this.read()
                console.log(book.Isbn)
                this.getView().getModel().remove("/BookSet('" + book.Isbn + "')", null, {
                    success: () => {
                        MessageToast.show("Delete successfully")
                    },
                    error: () => {
                        MessageToast.show("Could not delete")
                    }
                })
                console.log("am iesit")
            },

            onSelect(oEvent){
                var oCurrentBook=  this.getView().byId("idBooksTable").getSelectedItem();
                var isbn = oCurrentBook.getBindingContext().getProperty("Isbn");
                var author = oCurrentBook.getBindingContext().getProperty("Author");
                var title = oCurrentBook.getBindingContext().getProperty("Title");
                var publishDate = oCurrentBook.getBindingContext().getProperty("DatePublished");
                var language = oCurrentBook.getBindingContext().getProperty("Language");
                var available = oCurrentBook.getBindingContext().getProperty("BooksAvailable");  
                var total = oCurrentBook.getBindingContext().getProperty("TotalNumberBooks");

                this.getView().byId("isbn").setValue(isbn);
                this.getView().byId("author").setValue(author);
                this.getView().byId("title").setValue(title);
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-ddTHH:mm:ss" });   
                var dateFormatted = dateFormat.format(publishDate)
                this.getView().byId("datepublished").setValue(dateFormatted);
                this.getView().byId("language").setValue(language);
                this.getView().byId("available").setValue(available);
                this.getView().byId("total").setValue(total);

            },

            borrow(oEvent){
                console.log("press")
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("borrow");
            },
            search(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("search");
            },
            getRouter : function () {
                console.log("router")
                return UIComponent.getRouterFor(this);
            },
            // onNavBack: function () {
            //     var oHistory = History.getInstance();
            //     var sPreviousHash = oHistory.getPreviousHash();
    
            //     if (sPreviousHash !== undefined) {
            //         window.history.go(-1);
            //     } else {
            //         var oRouter = this.getOwnerComponent().getRouter();
            //         oRouter.navTo("books", {}, true);
            //     }
            // }
    
        })
    }
)
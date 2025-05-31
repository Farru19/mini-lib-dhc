const LibraryView = mini.library.views.LibraryView;

const init = () => {
    const oShell = new sap.m.Shell({
        app: new LibraryView().getView()
    });
    oShell.placeAt("content");
};

sap.ui.getCore().attachInit(init);
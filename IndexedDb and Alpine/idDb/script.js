const indexedDB = window.indexedDB;

const notesData = [
    { chapter: "equation", note: "a+b=3"},
    { chapter: "equation", note: "a+b=3"},
];

if (!indexedDB) {
    console.log("IndexedDB could not be found in this browser.");
}



const request1 = indexedDB.open("NotesDB");

request1.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
};

request1.onupgradeneeded = function () {
    const db = request1.result;

    const store = db.createObjectStore("Notes", { keyPath: "id" });

    store.createIndex("chapter", "chapter", { unique: false });

    store.createIndex("note", "note", { unique: false });
};

request1.onsuccess = function () {
    console.log("Notes Opened Successfully.");

    const db = request1.result;
    const transaction = db.transaction("Notes", "readwrite");
    const store = transaction.objectStore("Notes");

    store.put({ id: 1, chapter:"equation", note: "a+b=c" });
    store.put({ id: 2, chapter:"area", note: "l*b" });

    const getItem2 = store.get(2);

    const getItems = store.getAll();

    getItem2.onsuccess = function () {
        console.log("Item 2 data",getItem2.result);
    }
    getItems.onsuccess = function () {
        console.log("Items data",getItems.result);
    }
};





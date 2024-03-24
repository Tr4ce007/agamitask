const indexedDB = window.indexedDB;

let update = false;

if (!indexedDB) {
    console.log("IndexedDB could not be found in this browser.");
}

async function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("UserDB");
        request.onerror = function (event) {
            console.error("An error occurred with IndexedDB");
            console.error(event);
            reject(event);
        };
        request.onupgradeneeded = function () {
            const db = request.result;
            db.createObjectStore("Users", { keyPath: "id",autoIncrement:true });
        };
        request.onsuccess = function () {
            console.log("Connection to UserDB Successful.");
            const db = request.result;
            const transaction = db.transaction("Users", "readwrite");
            const store = transaction.objectStore("Users");
            resolve({ db, store });
        };
    });
}

async function fetchData() {
    console.log("fetching Data");
    try {
        const { store } = await openDatabase();
        const getItems = store.getAll();
        getItems.onsuccess = function () {
            const usersList = getItems.result;
            console.log("Fetched items from IndexedDB:", usersList);
            this.usersList = usersList; // Explicitly bind 'this'
            this.loading = false; // Explicitly bind 'this'
        }.bind(this); // Bind 'this' to the current component instance
        getItems.onerror = function (event) {
            console.error("Error fetching items from IndexedDB");
            console.error(event);
            this.error = "Error fetching data"; // Explicitly bind 'this'
            this.loading = false; // Explicitly bind 'this'
        }.bind(this); // Bind 'this' to the current component instance
    } catch (error) {
        console.error("Error fetching data:", error);
        this.error = "Error fetching data"; // Explicitly bind 'this'
        this.loading = false; // Explicitly bind 'this'
    }
}

const onAdd = async (user) => {
    try {
        const { db, store } = await openDatabase();
        if (update) {
            const updateUserRequest = store.put({name:user, id:update});
            update = false;
            updateUserRequest.onsuccess = function () {
                console.log("updated successfully.")
                window.location.reload();
            }
        }
        else {
            console.log('----------',user,update);
            const addUserRequest = store.add({ name: user });
            addUserRequest.onsuccess = function () {
                console.log("New user added to IndexedDB:", user);
                window.location.reload()
            }.bind(this);
        }
        addUserRequest.onerror = function (event) {
            console.error("Error adding new user to IndexedDB");
            console.error(event);
        };
    } catch (error) {
        console.error("Error adding new user:", error);
    }
}

const onEdit = async (id) => {
    update = id;
}

const onDelete = async (id) => {
    try {
        const { db, store } = await openDatabase();
        const deleteUserRequest = store.delete(id);
        deleteUserRequest.onsuccess = function () {
            console.log("User deleted from IndexedDB with ID:", id);
            if (!update) window.location.reload();
        }.bind(this); // Bind 'this' to the current component instance
        deleteUserRequest.onerror = function (event) {
            console.error("Error deleting user from IndexedDB");
            console.error(event);
        };
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}


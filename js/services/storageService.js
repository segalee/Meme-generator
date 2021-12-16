function saveToStorage(key, value) {
    var item = JSON.stringify(value);
    localStorage.setItem(key, item);
}

function loadFromStorage(key) {
    var item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
    return null;
}
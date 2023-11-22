function setLocalStorage(userData) {
    for (const key in userData) {
        localStorage.setItem(key, userData[key])
    }
}

export default setLocalStorage
function clearUserDataInLocalStorage() {
    const keys = [
        'id', 'access_token', 'username', 'email', 'profilePicture', 'role'
    ]
    keys.forEach(key => {
        localStorage.removeItem(key)
    })
}

export default clearUserDataInLocalStorage
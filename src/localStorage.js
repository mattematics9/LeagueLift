export const addLocalStorage = (user, userFirestore) => {
    if(user){
        localStorage.setItem('user', JSON.stringify(user));
    }
    if(userFirestore){
        localStorage.setItem('userFirestore', JSON.stringify(userFirestore));
    }
}

export const removeLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userFirestore');
}
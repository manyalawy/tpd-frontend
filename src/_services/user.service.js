import { API } from "#Helpers";

const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    return API.post(`auth/signIn`, { user_name: username, password }).then((data) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (!data.error) localStorage.setItem("user", JSON.stringify(data.token));

        return data.token;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
}

function getAll() {
    return API.get(`users`);
}

function getById(id) {
    return API.get(`users/${id}`);
}

function register(user) {
    return API.post(`users/register`, user);
}

function update(user) {
    return API.put(`users/${user.id}`, user);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return API.delete(`users/${id}`);
}

export default userService;

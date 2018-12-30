import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
};

function login(username, password) {
    var data = JSON.stringify({ username: username, password: password });
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    };
    return new Promise(function (resolve, reject) {
        fetch(`${config.apiUrl}/user/login`, requestOptions)
            .then(res => {
                let error;
                if (res.status == 200) {
                    res.json().then(
                        resJSON => {
                            if (resJSON.token) {
                                localStorage.setItem('token', JSON.stringify(resJSON.token));
                                localStorage.setItem('user', JSON.stringify(resJSON.user));
                                let user = resJSON.user;
                                resolve(user);
                            }
                            else {
                                error = "Cant get token!"
                                reject(error);
                            }
                        }
                    )
                }
                else {
                    error = "Server is not working";
                    reject(error);
                }
            });
    })


}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

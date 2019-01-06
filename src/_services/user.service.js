import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    signup,
    loginStaff
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
                                localStorage.setItem('refresh_token', JSON.stringify(resJSON.refresh_token));
                                let user = resJSON.user;
                                resolve(user);
                            }
                            else {
                                error = "Log in failed! Try again"
                                reject(resJSON);
                            }
                        }
                    )
                }
                else {
                    error = "Server is not working";
                    reject(resJSON);
                }
            });
    })
}

function loginStaff(username, password) {
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
        fetch(`${config.apiUrl}/staff/login`, requestOptions)
            .then(res => {
                let error;
                if (res.status == 200) {
                    res.json().then(
                        resJSON => {
                            if (resJSON.token) {
                                localStorage.setItem('token', JSON.stringify(resJSON.token));
                                localStorage.setItem('staff', JSON.stringify(resJSON.staff));
                                localStorage.setItem('refresh_token', JSON.stringify(resJSON.refresh_token));
                                let staff = resJSON.staff;
                                resolve(staff);
                            }
                            else {
                                error = "Log in failed! Try again"
                                reject(resJSON);
                            }
                        }
                    )
                }
                else {
                    error = "Server is not working";
                    reject(resJSON);
                }
            });
    })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('staff');

}


function signup(fullname, username, password, email, phone, token) {
    var data = JSON.stringify({name: fullname, username: username, password: password, email: email, phone: phone });
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        },
        body: data
    };
    return new Promise(function (resolve, reject) {
        fetch(`${config.apiUrl}/user`, requestOptions)
            .then(res => {
                let error;
                if (res.status == 200) {
                    resolve(res.data);
                }
                else {
                    error = "Server is not working";
                    reject(error);
                }
            });
    })
}
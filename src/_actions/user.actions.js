import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import config from 'config';

export const userActions = {
    login,
    logout,
    signup,
    loginStaff
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    console.log('user');
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function loginStaff(username, password) {
    return dispatch => {

        userService.loginStaff(username, password)
            .then(
                staff => {
                    console.log('staff');
                    dispatch(success(staff));
                    history.push('/listUserPage');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function success(staff) { return { type: userConstants.STAFF_LOGIN_SUCCESS, staff } }
    function failure(error) { return { type: userConstants.STAFF_LOGIN_FAILURE, error } }
}


function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


function signup(username, password, email, phone) {
    return dispatch => {
        dispatch(request({ username }));

        userService.signup(username, password, email, phone)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(user) { return { type: userConstants.SIGNUP_REQUEST, user } }
    function success(user) { return { type: userConstants.SIGNUP_SUCCESS, user } }
    function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}

export function fetchUserList(token) {
    return dispatch => {
        fetch(`${config.apiUrl}/user`, {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        }).then((response) => {
            if (response.status == 200) {
                response.json().then((responseJSON) => {
                    console.log(responseJSON);
                    dispatch(fetchUserListSuccess(responseJSON));
                })
            }
            else { return; }
        }).catch(error => console.log(error));
    };
}

export function fetchUserListSuccess(list) {
    return {
        type: "FETCH_USER_LIST_SUCCESS",
        list,
    };
}
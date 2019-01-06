import config from 'config';
import { accountService } from '../_services';
import { userConstants } from '../_constants';
import { history } from '../_helpers';
import { alertActions } from '../_actions/alert.actions'

export const accountActions = {
    signup,
    addMoney,
    addReminder,
    updateReminder,
    deleteReminder
};

export function fetchAccountList(user_id, token) {
    return dispatch => {
        fetch(`${config.apiUrl}/account/` + user_id, {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        }).then((response) => {
            if (response.status == 200) {
                response.json().then((responseJSON) => {
                    dispatch(fetchAccountListSuccess(responseJSON));
                })
            }
            else { return; }
        }).catch(error => console.log(error));
    };
}

export function fetchAccountListSuccess(list) {
    return {
        type: "FETCH_ACCOUNT_LIST_SUCCESS",
        list,
    };
}

function signup(userId, account_number, balance, token) {
    return dispatch => {
        dispatch(request({ userId }));

        accountService.signup(userId, account_number, balance, token)
            .then(
                account => {
                    dispatch(success(account));
                    history.push({
                        pathname: '/listAccount',  
                        state: { userId: userId } 
                    });
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(account) { return { type: userConstants.SIGNUP_REQUEST, account } }
    function success(account) { return { type: userConstants.SIGNUP_SUCCESS, account } }
    function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}

function addMoney(userId, account_number, balance, add_money, token) {
    return dispatch => {
        dispatch(request({ account_number }));

        accountService.addMoney(account_number, balance, add_money, token)
            .then(
                account => {
                    dispatch(success(account));
                    history.push({
                        pathname: '/listAccount',  
                        state: { userId: userId } 
                    });
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(account) { return { type: userConstants.SIGNUP_REQUEST, account } }
    function success(account) { return { type: userConstants.SIGNUP_SUCCESS, account } }
    function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}

function addReminder(userId, name, account_number, reminder_name, token) {
    return dispatch => {
        dispatch(request({ userId }));

        accountService.addReminder(userId, name, account_number, reminder_name, token)
            .then(
                reminder => {
                    dispatch(success(reminder));
                    history.push({
                        pathname: '/reminder'
                        //state: { userId: userId } 
                    });
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(reminder) { return { type: userConstants.SIGNUP_REQUEST, reminder } }
    function success(reminder) { return { type: userConstants.SIGNUP_SUCCESS, reminder } }
    function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}

function updateReminder(account_number, reminder_name, token) {
    return dispatch => {
        dispatch(request({ account_number }));

        accountService.updateReminder(account_number, reminder_name, token)
            .then(
                reminder => {
                    dispatch(success(reminder));
                    history.push({
                        pathname: '/reminder'
                    });
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(reminder) { return { type: userConstants.SIGNUP_REQUEST, reminder } }
    function success(reminder) { return { type: userConstants.SIGNUP_SUCCESS, reminder } }
    function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}

function deleteReminder(account_number, reminder_name, token) {
    return dispatch => {
        dispatch(request({ account_number }));

        accountService.deleteReminder(account_number, reminder_name, token)
            .then(
                reminder => {
                    dispatch(success(reminder));
                    history.push({
                        pathname: '/reminder'
                    });
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(reminder) { return { type: userConstants.SIGNUP_REQUEST, reminder } }
    function success(reminder) { return { type: userConstants.SIGNUP_SUCCESS, reminder } }
    function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}
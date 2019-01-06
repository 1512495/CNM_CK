import config from 'config';
import { authHeader } from '../_helpers';

export const accountService = {
    signup,
    addMoney,
    addReminder,
    updateReminder,
    deleteReminder
};

function signup(userId, account_number, balance, token) {
    var data = JSON.stringify({user_id: userId, account_number: account_number, balance: balance});
    console.log(token);
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
        fetch(`${config.apiUrl}/account`, requestOptions)
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

function addMoney(account_number, balance, add_money, token) {
    let balanceNumber = parseInt(balance);
    let moneyNumber = parseInt(add_money);
    let total = balanceNumber + moneyNumber;

    var data = JSON.stringify({balance: total});
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    };
    return new Promise(function (resolve, reject) {
        fetch(`${config.apiUrl}/account/`+ account_number, requestOptions)
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

function addReminder(userId, name, account_number, reminder_name, token) {
    if (reminder_name == '') {
        reminder_name = name;
    }
    var data = JSON.stringify({reminder_name: reminder_name});
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    };
    return new Promise(function (resolve, reject) {
        fetch(`${config.apiUrl}/reminder/`+account_number, requestOptions)
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

function updateReminder(account_number, reminder_name, token) {
    var data = JSON.stringify({reminder_name: reminder_name});
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    };
    return new Promise(function (resolve, reject) {
        fetch(`${config.apiUrl}/reminder/`+account_number, requestOptions)
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

function deleteReminder(account_number, reminder_name, token) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };
    return new Promise(function (resolve, reject) {
        fetch(`${config.apiUrl}/reminder/`+account_number, requestOptions)
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
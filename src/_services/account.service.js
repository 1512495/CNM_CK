import config from 'config';
import { authHeader } from '../_helpers';

export const accountService = {
    signup,
    addMoney
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
    //var accountId = JSON.stringify({account_number: account_number});
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
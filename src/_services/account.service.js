import config from 'config';
import { authHeader } from '../_helpers';

export const accountService = {
    signup
};

function signup(userId, account_number, balance) {
    var data = JSON.stringify({user_id: userId, account_number: account_number, balance: balance});
    const requestOptions = {
        method: 'POST',
        headers: {
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
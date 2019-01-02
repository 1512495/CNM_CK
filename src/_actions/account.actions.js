import config from 'config';

export function fetchAccountList(user_id, token) {
    return dispatch => {
        fetch(`${config.apiUrl}/account/` + user_id, {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + token
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
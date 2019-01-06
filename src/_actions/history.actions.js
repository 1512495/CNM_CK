import config from 'config';

export function fetchHistoryList(user_id, token) {
    return dispatch => {
        fetch(`${config.apiUrl}/transaction/` + user_id, {
            method: 'GET',
            headers: {
                'Authorization':  token
            },
        }).then((response) => {
            if (response.status == 200) {
                response.json().then((responseJSON) => {
                    dispatch(fetchHistoryListSuccess(responseJSON));
                })
            }
            else { return; }
        }).catch(error => console.log(error));
    };
}

export function fetchHistoryListSuccess(list) {
    return {
        type: "FETCH_HISTORY_LIST_SUCCESS",
        list,
    };
}
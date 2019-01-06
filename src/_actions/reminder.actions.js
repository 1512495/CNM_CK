import config from 'config';

export function fetchReminderList(user_id, token) {
    return dispatch => {
        fetch(`${config.apiUrl}/reminder/` + user_id, {
            method: 'GET',
            headers: {
                'Authorization':  token
            },
        }).then((response) => {
            if (response.status == 200) {
                response.json().then((responseJSON) => {
                    dispatch(fetchReminderListSuccess(responseJSON));
                })
            }
            else { return; }
        }).catch(error => console.log(error));
    };
}

export function fetchReminderListSuccess(list) {
    return {
        type: "FETCH_REMINDER_LIST_SUCCESS",
        list,
    };
}
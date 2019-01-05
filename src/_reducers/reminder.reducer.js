const initialState = {
    list: [],
};
//Export state khi da dung action dua du lieu vao state
export function reminderList(state = initialState, action) {
    if (action.type === "FETCH_REMINDER_LIST_SUCCESS") {
        return {
            ...state,
            list: action.list,
        };
    }
    return state;
}
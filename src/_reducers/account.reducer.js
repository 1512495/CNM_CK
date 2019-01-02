const initialState = {
    list: [],
};
//Export state khi da dung action dua du lieu vao state
export function accountList(state = initialState, action) {
    if (action.type === "FETCH_ACCOUNT_LIST_SUCCESS") {
        return {
            ...state,
            list: action.list,
        };
    }
    return state;
}
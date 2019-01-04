import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}

export function userList(state = [], action) {
  if (action.type === "FETCH_USER_LIST_SUCCESS") {
      return {
          ...state,
          list: action.list,
      };
  }
  return state;
}
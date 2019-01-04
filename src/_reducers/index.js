import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users, userList } from './users.reducer';
import { alert } from './alert.reducer';
import { accountList } from './account.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  accountList,
  userList,
});

export default rootReducer;
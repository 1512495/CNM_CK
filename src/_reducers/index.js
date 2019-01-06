import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users, userList } from './users.reducer';
import { alert } from './alert.reducer';
import { accountList } from './account.reducer';
import { reminderList } from './reminder.reducer';
import { historyList } from './history.reducer';



const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  accountList,
  userList,
  reminderList,
  historyList
});

export default rootReducer;
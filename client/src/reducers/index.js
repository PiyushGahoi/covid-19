import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import requestReducer from './requestReducer';
import userReducer from './usersReducer';
import hospitalReducer from './hospitalReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  requests: requestReducer,
  hospitals: hospitalReducer,
  users: userReducer,
});

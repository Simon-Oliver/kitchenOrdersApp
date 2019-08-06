import { combineReducers } from 'redux';
import authreducer from './authreducer';
import statusreducer from './statusreducer';

const appReducer = combineReducers({
  auth: authreducer,
  status: statusreducer
});

// Returns all states to default when user logs out
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

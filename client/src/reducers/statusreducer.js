const INITIAL_STATE = {
  error: null,
  success: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ERROR':
      return { ...state, error: action.payload, success: null };
    case 'SUCCESS':
      return { ...state, success: action.payload, error: null };
    case 'CLEAR_STATUS':
      return { ...state, success: null, error: null };
    default:
      return state;
  }
};

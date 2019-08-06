const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  userRole: null,
  userName: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      const { id, name, role } = action.payload;
      return { ...state, isSignedIn: true, userId: id, userRole: role, userName: name };
    default:
      return state;
  }
};

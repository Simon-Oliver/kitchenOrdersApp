export const signIn = (id, role, name) => {
  return { type: 'SIGN_IN', payload: { id, role, name } };
};

export const signOut = () => {
  return { type: 'USER_LOGOUT' };
};

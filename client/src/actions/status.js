export const isError = error => {
  return { type: 'ERROR', payload: error };
};

export const isSuccess = success => {
  return { type: 'SUCCESS', payload: success };
};

export const clearStatus = () => {
  return { type: 'CLEAR_STATUS' };
};

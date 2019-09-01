const actions = {
  GET_SCAN_DATA_REQUEST: 'GET_SCAN_DATA_REQUEST',
  GET_SCAN_DATA_SUCCESS: 'GET_SCAN_DATA_SUCCESS',
  getScanData: (success, fail) => ({
    type: actions.GET_SCAN_DATA_REQUEST,
    success,
    fail
  }),
  EDIT_SCAN_DATA_REQUEST: 'EDIT_SCAN_DATA_REQUEST',
  EDIT_SCAN_DATA_SUCCESS: 'EDIT_SCAN_DATA_SUCCESS',
  edit: (params, success, fail) => ({
    type: actions.EDIT_SCAN_DATA_REQUEST,
    params,
    success,
    fail
  }),

  DELETE_SCAN_DATA_REQUEST: 'DELETE_SCAN_DATA_REQUEST',
  DELETE_SCAN_DATA_SUCCESS: 'DELETE_SCAN_DATA_SUCCESS',
  delete: (id, success, fail) => ({
    type: actions.DELETE_SCAN_DATA_REQUEST,
    id,
    success,
    fail
  }),
};
export default actions;
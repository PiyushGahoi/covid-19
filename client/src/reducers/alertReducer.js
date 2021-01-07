const initialState = {
    error: [],
    success: [],
  };
  export default function alertReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case 'LOGIN_SUCCESS_ALERT':
        return {
          ...state,
          success: payload,
        };
      case 'REGISTER_SUCCESS_ALERT':
        return {
          ...state,
          success: payload,
        };
      case 'LOGIN_FAILED_ALERT':
        return {
          ...state,
          error: payload,
        };
      case 'REGISTER_FAILED_ALERT':
        return {
          ...state,
          error: payload,
        };
      case 'LOGOUT_ALERT':
        return {
          ...state,
          success: payload,
        };
      default:
        return state;
    }
  }
  
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};
export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_USER':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
        role: payload.role,
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        error: null,
        isAuthenticated: true,
        loading: false,
      };
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        error: null,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGIN_FAILED':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        error: payload,
        isAuthenticated: false,
        loading: false,
      };
    case 'REGISTER_FAILED':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        error: payload,
        isAuthenticated: false,
        loading: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}

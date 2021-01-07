const initialState = {
    fetching: false,
  };
  
  export default function userReducer(currentState = initialState, action) {
    switch (action.type) {
      case 'FETCHING_USERS':
        return { ...currentState, fetching: true };
      case 'USERS_FETCHED':
        return { ...currentState, data: action.payload, fetching: false };
      default:
        return currentState;
    }
  }
  
const initialState = {
    fetching: false,
  };
  
  export default function hospitalReducer(currentState = initialState, action) {
    switch (action.type) {
      case 'FETCHING_HOSPITALS':
        return { ...currentState, fetching: true };
      case 'HOSPITALS_FETCHED':
        return { ...currentState, data: action.payload, fetching: false };
      default:
        return currentState;
    }
  }
  
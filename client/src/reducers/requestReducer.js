const initialState = {
    fetching: false,
  };
  
  export default function callTypeReducer(currentState = initialState, action) {
    switch (action.type) {
      case 'ADDING_REQUEST':
        return { ...currentState, fetching: true };
      case 'ADDED_REQUEST':
        return { ...currentState, fetching: false };
      case 'FETCHING_REQUESTS':
        return { ...currentState, fetching: true };
      case 'REQUESTS_FETCHED':
        return { ...currentState, data: action.payload, fetching: false };
      default:
        return currentState;
    }
  }
  
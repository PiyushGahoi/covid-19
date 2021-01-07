const initialState = {
  fetching: false,
};

export default function callTypeReducer(currentState = initialState, action) {
  switch (action.type) {
    case 'ADDING_CALL_TYPE':
      return { ...currentState, fetching: true };
    case 'EDITING_CALL_TYPE':
      return { ...currentState, fetching: true };
    case 'CALL_TYPE_ADDED':
      return { ...currentState, fetching: false };
    case 'CALL_TYPE_EDITED':
      return { ...currentState, fetching: false };
    case 'FETCHING_CALL_TYPES':
      return { ...currentState, fetching: true };
    case 'CALL_TYPES_FETCHED':
      return { ...currentState, data: action.payload.data, fetching: false };
    default:
      return currentState;
  }
}

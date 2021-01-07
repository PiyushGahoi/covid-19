import * as Axios from '../api/axios';

export const loadUser = () => {
  return (dispatch) => {
    return Axios.loadUser().then((resData) => {
      dispatch({
        type: 'LOAD_USER',
        payload: resData,
      });
    }, (error) => {
      dispatch({
        type: 'LOGIN_FAILED',
      });
    });
  };
};

// export function loginsuccess(){
//   dispatch({
//     type: 'LOGIN_SUCCESS_ALERT',
//     payload: ["Successfully logged in!"],
//   });
// }
// export function signupSuccess(){
//   dispatch({
//     type: 'REGISTER_SUCCESS_ALERT',
//     payload: ["Successfully Registered!"],
//   });
// }

export function userSignIn(data) {
  return (dispatch) => {
    return Axios.userSignIn(data).then((resData) => {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: resData,
      });
      // loginsuccess();
    }, (error) => {
      dispatch({
        type: 'LOGIN_FAILED',
        payload: error.response && error.response.data && error.response.data.errors,
      });
      dispatch({
        type: 'LOGIN_FAILED_ALERT',
        payload: error.response && error.response.data && error.response.data.errors,
      });
    });
  };
}

export function userSignup(data) {
  return (dispatch) => {
    return Axios.userSignup(data).then((resData) => {
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: resData,
      });
      // signupSuccess();
    }, (error) => {
      dispatch({
        type: 'REGISTER_FAILED',
        payload: error.response && error.response.data && error.response.data.errors,
      });
      dispatch({
        type: 'REGISTER_FAILED_ALERT',
        payload: error.response && error.response.data && error.response.data.errors,
      });
    });
  };
}

export function hospitalSignIn(data) {
  return (dispatch) => {
    return Axios.hospitalSignIn(data).then((resData) => {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: resData,
      });
      // loginsuccess();
    }, (error) => {
      dispatch({
        type: 'LOGIN_FAILED',
        payload: error.response && error.response.data && error.response.data.errors,
      });
      // loginfailed();
    });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    });
  };
}

export function getUserRequests(data) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_REQUESTS',
    });
    return Axios.getUserRequests(data).then((resData) => {
      dispatch({
        type: 'REQUESTS_FETCHED',
        payload: resData,
      });
    }, (err) => {
      console.log(err);
      // alert("Something went wrong");
      // loginfailed();
    });
  };
}

export function getHospitalRequests(data) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_REQUESTS',
    });
    return Axios.getHospitalRequests(data).then((resData) => {
      dispatch({
        type: 'REQUESTS_FETCHED',
        payload: resData,
      });
    }, (err) => {
      console.log(err);
      // alert("Something went wrong");
      // loginfailed();
    });
  };
}


export function fetchUsers(data) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_USERS',
    });
    return Axios.fetchUsers(data).then((resData) => {
      dispatch({
        type: 'USERS_FETCHED',
        payload: resData,
      });
    }, (err) => {
      console.log(err);
      // alert("Something went wrong");
      // loginfailed();
    });
  };
}


export function fetchHospitals(data) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_HOSPITALS',
    });
    return Axios.fetchHospitals(data).then((resData) => {
      dispatch({
        type: 'HOSPITALS_FETCHED',
        payload: resData,
      });
    }, (err) => {
      console.log(err);
      // alert("Something went wrong");
      // loginfailed();
    });
  };
}

export function addRequest(data) {
  return (dispatch) => {
    dispatch({
      type: 'ADDING_REQUEST',
    });
    return Axios.addRequest(data).then((resData) => {
      dispatch({
        type: 'REQUEST_ADDED',
        payload: resData,
      });
    }, (err) => {
      console.log(err);
      // alert("Something went wrong");
      // loginfailed();
    });
  };
}

export function editRequest(data) {
  return (dispatch) => {
    dispatch({
      type: 'EDITING_REQUEST',
    });
    return Axios.editRequest(data).then((resData) => {
      dispatch({
        type: 'REQUEST_EDITED',
        payload: resData,
      });
    }, (err) => {
      console.log(err);
    });
  };
}


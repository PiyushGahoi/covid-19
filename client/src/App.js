import React, { useEffect } from 'react';
import './App.css';
import Body from './routes/Body';
import Drawer from './components/Drawer';
import store from './config/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/actions';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Drawer>
        <Body />
      </Drawer>
    </div>
  );
}

export default App;

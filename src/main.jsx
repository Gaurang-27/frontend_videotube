import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import axios from 'axios';
import { clearUser, setUser } from './Redux/UserSlice';

const getLoginStatus = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL_BACKEND}/users/user-detail`,
      { withCredentials: true }
    );
    store.dispatch(setUser(response.data.data)); // ✅ use store.dispatch
  } catch (error) {
    try {
      const revalidate = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/users/revalidate-token`,
        {},
        { withCredentials: true }
      );
      store.dispatch(setUser(revalidate.data.data)); // ✅
    } catch (error) {
      store.dispatch(clearUser()); // ✅
    }
  }
};

getLoginStatus().finally(() => {
  createRoot(document.getElementById('root')).render(
    // <StrictMode> optional
    <Provider store={store}>
      <App />
    </Provider>
    // </StrictMode>
  );
});

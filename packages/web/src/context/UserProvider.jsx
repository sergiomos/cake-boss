import React, { useState } from 'react';
import { element } from 'prop-types';
import axios from 'axios';

import UserContext from './UserContext';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3333/';

const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(200);

  const [user, setUser] = useState({
    _id: '',
    role: '',
  });

  const singIn = async (userEmail, userPassword) => {
    try {
      const requestBody = {
        email: userEmail,
        password: userPassword,
      };

      const { status, data } = await axios
        .post('/login', requestBody);

      setLoginStatus(status);
      setUser(data);
    } catch (error) {
      const { response } = error;
      setLoginStatus(response.status);
    }
  };

  const store = {
    user,
    email,
    password,
    loginStatus,
    singIn,
    setUser,
    setEmail,
    setPassword,
    setLoginStatus,
  };

  return (
    <UserContext.Provider value={store}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: element,
}.isRequired;

export default UserProvider;

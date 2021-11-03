import React, { useState } from 'react';
import { element } from 'prop-types';
import axios from 'axios';

import UserContext from './UserContext';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3333/';

const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [singInUpRequestStatus, setSingInUpRequestStatus] = useState('');

  const [user, setUser] = useState({});

  const singIn = async (userEmail, userPassword) => {
    try {
      setSingInUpRequestStatus('loading');

      const requestBody = {
        email: userEmail,
        password: userPassword,
      };

      const { status, data } = await axios
        .post('/login', requestBody);

      setSingInUpRequestStatus(status);
      setUser(data);
    } catch (error) {
      const { response } = error;
      setSingInUpRequestStatus(response.status);
    }
  };

  const singUp = async (newUser) => {
    try {
      const requestBody = {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      };

      const { data: { _id, role }, status } = await axios
        .post('/manager', requestBody);

      setUser({ _id, role });
      setSingInUpRequestStatus(status);
    } catch (error) {
      const { response } = error;
      setSingInUpRequestStatus(response.status);
    }
  };

  const store = {
    user,
    email,
    password,
    singInUpRequestStatus,
    singIn,
    singUp,
    setUser,
    setEmail,
    setPassword,
    setSingInUpRequestStatus,
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

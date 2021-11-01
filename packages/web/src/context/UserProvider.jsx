import React, { useState } from 'react';
import { element } from 'prop-types';

import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState({
    id: '',
    role: '',
  });

  const store = {
    user,
    email,
    password,
    setUser,
    setEmail,
    setPassword,
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

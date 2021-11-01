import React, { useEffect, useState } from 'react';

import useUserContext from '../../hooks/useUserContext';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  const { singIn, loginStatus, setLoginStatus } = useUserContext();
  const [loginStatusMessage, setLoginStatusMessage] = useState('');

  const handleUserLogin = async (userEmail, userPassword) => {
    setLoginStatus('loading');
    await singIn(userEmail, userPassword);

    switch (loginStatus) {
      case 401:
        setLoginStatusMessage('Email ou senha inválidos, verifique as informações e tente novamente');
        break;
      case 200:
        setLoginStatusMessage('Login realizado com sucesso');
        break;
      default:
    }
  };

  useEffect(() => {
    const time = 5000;
    setTimeout(() => {
      setLoginStatusMessage('');
    }, time);
  }, [loginStatusMessage]);

  return (
    <div>
      {loginStatusMessage}
      <LoginForm
        handleUserLogin={handleUserLogin}
      />
    </div>
  );
};

export default Login;

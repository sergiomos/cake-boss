import React, { useEffect, useState } from 'react';

import useUserContext from '../../hooks/useUserContext';
import LoginForm from '../../components/LoginForm';

import { Container, Box, StatusMessage } from './style';

const Login = () => {
  const { singIn, loginStatus, setLoginStatus } = useUserContext();
  const [loginStatusMessage, setLoginStatusMessage] = useState('Ola eu sou uma mensagem');

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
    const time = 500055550;
    setTimeout(() => {
      setLoginStatusMessage('');
    }, time);
  }, [loginStatusMessage]);

  return (
    <Container>
      <Box>
        <StatusMessage
          loginStatus={loginStatus}
        >
          {loginStatusMessage}
        </StatusMessage>
        <LoginForm
          handleUserLogin={handleUserLogin}
        />
      </Box>
    </Container>
  );
};

export default Login;

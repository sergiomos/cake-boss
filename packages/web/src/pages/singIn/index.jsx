import React, { useEffect, useState } from 'react';

import useUserContext from '../../hooks/useUserContext';
import LoginForm from '../../components/LoginForm';

import {
  Container,
  StatusMessage,
  RegisterMessage,
  RegisterMessageLink,
} from './style';

const Login = () => {
  const { singIn, loginStatus, setLoginStatus } = useUserContext();
  const [loginStatusMessage, setLoginStatusMessage] = useState('');

  const handleUserLogin = async (userEmail, userPassword) => {
    setLoginStatus('loading');
    await singIn(userEmail, userPassword);
  };

  useEffect(() => {
    switch (loginStatus) {
      case 401:
        setLoginStatusMessage('Email ou senha inválidos, verifique as informações e tente novamente');
        break;
      case 200:
        setLoginStatusMessage('Login realizado com sucesso');
        break;
      default:
    }
  }, [loginStatus]);

  useEffect(() => {
    const time = 5000;
    setTimeout(() => {
      setLoginStatusMessage('');
    }, time);
  }, [loginStatusMessage]);

  return (
    <Container>
      <StatusMessage
        loginStatus={loginStatus}
      >
        {loginStatusMessage}
      </StatusMessage>
      <LoginForm
        handleUserLogin={handleUserLogin}
      />

      <RegisterMessage>
        Ainda não é cadastrado?
        {' '}
        <RegisterMessageLink href="/singUp">Cadastre-se aqui</RegisterMessageLink>
      </RegisterMessage>
    </Container>
  );
};

export default Login;
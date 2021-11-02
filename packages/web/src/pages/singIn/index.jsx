import React, { useEffect, useState } from 'react';

import useUserContext from '../../hooks/useUserContext';
import LoginForm from '../../components/LoginForm';
import H1 from '../../components/Titles/H1';
import StatusMessage from '../../components/StatusMessage';

import {
  Container,
  RegisterMessage,
  RegisterMessageLink,
} from './style';

const Login = () => {
  const { singIn, singInUpRequestStatus, setSingInUpRequestStatus } = useUserContext();
  const [loginStatusMessage, setLoginStatusMessage] = useState('');

  const handleUserLogin = async (userEmail, userPassword) => {
    setSingInUpRequestStatus('loading');
    await singIn(userEmail, userPassword);
  };

  useEffect(() => {
    switch (singInUpRequestStatus) {
      case 401:
        setLoginStatusMessage('Email ou senha inválidos, verifique as informações e tente novamente');
        break;
      case 200:
        setLoginStatusMessage('Login realizado com sucesso');
        break;
      default:
    }
  }, [singInUpRequestStatus]);

  useEffect(() => {
    const time = 5000;
    setTimeout(() => {
      setLoginStatusMessage('');
    }, time);
  }, [loginStatusMessage]);

  return (
    <Container>
      <H1>Login</H1>
      <StatusMessage
        status={singInUpRequestStatus}
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

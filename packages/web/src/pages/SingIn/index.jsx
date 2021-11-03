import React, { useEffect, useState } from 'react';

import { Redirect } from 'react-router-dom';
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
  const {
    singIn, singInUpRequestStatus, user,
  } = useUserContext();
  const [loginStatusMessage, setLoginStatusMessage] = useState('');

  const handleUserLogin = async (userEmail, userPassword) => {
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

    setTimeout(() => {
      setLoginStatusMessage('');
    }, 3000);
  }, [singInUpRequestStatus]);

  if (user.role) return (<Redirect to={`/${user.role}`} />);

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

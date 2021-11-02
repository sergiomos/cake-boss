import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';

import SingUpForm from '../../components/SingUpForm';
import StatusMessage from '../../components/StatusMessage';
import H1 from '../../components/Titles/H1';

import { Container } from './style';

const SingUp = () => {
  const { singUp, singInUpRequestStatus, setSingInUpRequestStatus } = useUserContext();
  const [shouldRedirectToHome, setShouldRedirectToHome] = useState(false);
  const [singUpStatusMessage, setSingUpStatusMessage] = useState('');

  const handleUserSingUp = async (event, newUser) => {
    setSingInUpRequestStatus('loading');
    event.preventDefault();
    await singUp(newUser);
  };

  useEffect(() => {
    switch (singInUpRequestStatus) {
      case 403:
        setSingUpStatusMessage('Usuário já cadastrado');
        break;
      case 201:
        setSingUpStatusMessage('Usuário cadastrado com sucesso');
        setTimeout(() => {
          setShouldRedirectToHome(true);
        }, 2000);
        break;
      default:
    }
  }, [singInUpRequestStatus]);

  useEffect(() => {
    const time = 1500;
    setTimeout(() => {
      setSingUpStatusMessage('');
    }, time);
  }, [singInUpRequestStatus]);

  if (shouldRedirectToHome) return <Redirect to="/manager" />;

  return (
    <Container>
      <H1>Registrar</H1>
      <StatusMessage status={singInUpRequestStatus}>
        {singUpStatusMessage}
      </StatusMessage>
      <SingUpForm
        handleUserSingUp={handleUserSingUp}
      />
    </Container>
  );
};

export default SingUp;

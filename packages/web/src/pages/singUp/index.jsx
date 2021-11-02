import React, { useEffect, useState } from 'react';
import useUserContext from '../../hooks/useUserContext';

import SingUpForm from '../../components/SingUpForm';
import StatusMessage from '../../components/StatusMessage';
import H1 from '../../components/Titles/H1';

import { Container } from './style';

const SingUp = () => {
  const { singUp, singInUpRequestStatus, setSingInUpRequestStatus } = useUserContext();
  const [singUpStatusMessage, setSingUpStatusMessage] = useState('menssagem');

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
      case 200:
        setSingUpStatusMessage('Usuário cadastrado com sucesso');
        break;
      default:
    }
  }, [singInUpRequestStatus]);
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

import React from 'react';
import useUserContext from '../../hooks/useUserContext';

import SingUpForm from '../../components/SingUpForm';
import { Container } from './style';

const SingUp = () => {
  const { singUp } = useUserContext();

  const handleUserSingUp = (event, newUser) => {
    event.preventDefault();
    singUp(newUser);
  };
  return (
    <Container>
      <SingUpForm
        handleUserSingUp={handleUserSingUp}
      />
    </Container>
  );
};

export default SingUp;

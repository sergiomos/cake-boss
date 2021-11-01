import React, { useContext } from 'react';
import { Container, Form } from './style';

import TextInput from '../TextInput';
import SubmitButton from '../SubmitButton';

const LoginForm = () => {
  const {
    email, password, setEmail, setPassword,
  } = useContext();
  return (
    <Container>
      <Form>
        <TextInput
          type="text"
          placeholder="Email"
        />
        <TextInput
          type="password"
          placeholder="Senha"
        />

        <SubmitButton
          type="submit"
          bgColor="#1BA29D"
        >
          Entrar
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default LoginForm;

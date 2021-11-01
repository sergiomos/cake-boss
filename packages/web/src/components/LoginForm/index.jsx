import React from 'react';
import { func } from 'prop-types';
import useUserContext from '../../hooks/useUserContext';

import TextInput from '../TextInput';
import SubmitButton from '../SubmitButton';

import { Container, Form } from './style';

const LoginForm = ({ handleUserLogin }) => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    loginStatus,
  } = useUserContext();

  const handleInputChange = ({ target }, callback) => {
    callback(target.value);
  };

  return (
    <Container>
      <Form onSubmit={(e) => {
        e.preventDefault();
        handleUserLogin(email, password);
      }}
      >
        <TextInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleInputChange(e, setEmail)}
          required
        />
        <TextInput
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => handleInputChange(e, setPassword)}
          required
        />

        <SubmitButton
          type="submit"
          bgColor="#1BA29D"
          disabled={loginStatus === 'loading'}
        >
          {loginStatus === 'loading' ? 'Carregando' : 'Entrar'}
        </SubmitButton>

      </Form>
    </Container>
  );
};

LoginForm.propTypes = {
  handleUserLogin: func,
}.isRequired;

export default LoginForm;

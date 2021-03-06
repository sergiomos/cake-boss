import React from 'react';
import { func } from 'prop-types';
import useUserContext from '../../hooks/useUserContext';

import TextInput from '../TextInput';
import SubmitButton from '../Button';

import { Container, Form } from './style';

const LoginForm = ({ handleUserLogin }) => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    singInUpRequestStatus,
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
          disabled={singInUpRequestStatus === 'loading'}
        >
          {singInUpRequestStatus === 'loading' ? 'Carregando' : 'Entrar'}
        </SubmitButton>

      </Form>
    </Container>
  );
};

LoginForm.propTypes = {
  handleUserLogin: func,
}.isRequired;

export default LoginForm;

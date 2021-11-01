import React from 'react';
// import { func } from 'prop-types';

import TextInput from '../TextInput';
import SubmitButton from '../SubmitButton';

import { Container, Form } from './style';

const LoginForm = () => (
  <Container>
    <Form onSubmit={(e) => {
      e.preventDefault();
    }}
    >
      <TextInput
        type="text"
        placeholder="Seu nome"
        required
        minLength={3}
      />
      <TextInput
        type="email"
        placeholder="Email"
        required
      />
      <TextInput
        type="password"
        placeholder="Senha"
        required
        minLength={6}
      />

      <SubmitButton
        type="submit"
        bgColor="#1BA29D"
        // disabled={loginStatus === 'loading'}
      >
        Registrar
        {/* {loginStatus === 'loading' ? 'Carregando' : 'Entrar'} */}
      </SubmitButton>

    </Form>
  </Container>
);

// LoginForm.propTypes = {
//   handleUserLogin: func,
// }.isRequired;

export default LoginForm;

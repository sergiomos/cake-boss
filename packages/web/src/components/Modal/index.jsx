import { element } from 'prop-types';
import React from 'react';

import { Container, ModalContainer } from './style';

const Modal = ({ children }) => (
  <Container>
    <ModalContainer>
      {children}
    </ModalContainer>
  </Container>
);

Modal.propTypes = {
  children: element,
}.isRequired;

export default Modal;

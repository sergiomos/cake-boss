import React from 'react';
import { element, func } from 'prop-types';

import { Container, ModalContainer, CloseBtn } from './style';

const Modal = ({ children, close }) => (
  <Container>
    <ModalContainer>
      <CloseBtn
        type="button"
        onClick={close}
      >
        X

      </CloseBtn>
      {children}
    </ModalContainer>
  </Container>
);

Modal.propTypes = {
  children: element,
  close: func,
}.isRequired;

export default Modal;

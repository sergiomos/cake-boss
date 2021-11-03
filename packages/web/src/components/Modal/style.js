import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  background-color: rgba(37, 37, 37, 0.45);

  padding: 0 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  top: 0;
  left: 0;
  position: absolute;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 35rem;
  background-color: #fafafa;
  padding: 4rem 2rem;
  color: #252525;
  position: relative;
  border-radius: 0.8rem;
`;

export const CloseBtn = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  top: 10px;
  right: 16px;
  font-size: 1.8rem;
  cursor: pointer;
`;

import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StatusMessage = styled.strong`
  width: 100%;

  padding: 0.8rem 0;

  margin-bottom: 1.6rem;
  opacity: 80%;

  font-size: 1.4rem;
  font-weight: 400;

  text-align: center;
  display: ${({ loginStatus }) => (loginStatus === 'loading' || !loginStatus ? 'none' : 'block')};

`;

export const RegisterMessage = styled.p`
  font-size: 1.4rem;
  text-align: center;
  margin-top: 2.4rem;
`;

export const RegisterMessageLink = styled.a`
  color: #1BA29D;
  font-weight: 500;
  text-decoration: none;
`;

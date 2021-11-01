import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Box = styled.div`
  width: 100%;
  margin: auto;
  align-self: center;

  @media(min-width: 350px) {
    width: 350px;
  }
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

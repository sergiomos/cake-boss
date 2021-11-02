import styled from 'styled-components';

const StatusMessage = styled.strong`
  width: 100%;

  padding: 0.8rem 0;

  margin-bottom: 1.6rem;
  opacity: 80%;

  font-size: 1.4rem;
  font-weight: 400;

  text-align: center;
  display: ${({ status }) => (status === 'loading' || !status ? 'none' : 'block')};

`;

export default StatusMessage;

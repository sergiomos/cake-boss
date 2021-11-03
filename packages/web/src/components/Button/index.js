import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 5rem;

  border-radius: 0.5rem;
  border: none;
  background-color: ${(props) => props.bgColor || '#1BA29D'} ;

  color: #fafafa;
  font-size: 1.6rem;
  font-weight: 700;
  
  padding: 0 0.8rem;
  cursor: pointer;

  :hover {
    opacity: 80%;
  }

  :disabled {
    background-color: silver;
  }

  @media(min-width: 350px) {
    max-width: 350px;
  }
`;

export default Button;

import styled from 'styled-components';

const SubmitButton = styled.button`
  width: 100%;
  height: 5rem;

  border-radius: 0.5rem;
  border: none;
  background-color: ${(props) => props.bgColor} ;

  color: #fafafa;
  font-size: 1.6rem;
  font-weight: 700;
  
  padding: 0 0.8rem;
  cursor: pointer;

  :disabled {
    background-color: silver;
  }

  @media(min-width: 350px) {
    width: 350px;
  }
`;

export default SubmitButton;

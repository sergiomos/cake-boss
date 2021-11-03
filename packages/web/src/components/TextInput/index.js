import styled from 'styled-components';

const TextInput = styled.input`
  width: 100%;
  height: 5rem;

  border-radius: 0.5rem;
  border: none;
  background-color: silver;
  
  padding: 0 0.8rem;

  @media(min-width: 350px) {
    max-width: 350px;
  }
`;

export default TextInput;

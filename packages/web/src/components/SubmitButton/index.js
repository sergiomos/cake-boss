import styled from 'styled-components';

const SubmitButton = styled.button`
  width: 100%;
  height: 5rem;

  border-radius: 0.5rem;
  border: none;
  background-color: ${(props) => props.bgColor} ;

  color: #fafafa;
  
  padding: 0 0.8rem;
`;

export default SubmitButton;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  align-items: center;

  button {
    margin-top: 1.6rem ;
  }
`;

export const RolesSelect = styled.select`
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

export const RoleOption = styled.option``;

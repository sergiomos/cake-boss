import styled from 'styled-components';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

export const Container = styled.div`
  padding-top: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media(min-width: 500) {
    display: block
  }
`;

export const FlexBox = styled.div`
  width: 100%;
  display: flex
`;

export const SearchBar = styled(TextInput)`
  background-color: transparent;
  border: 2px solid #1BA29D;
  margin-right: 0.8rem;
`;

export const SearchBtn = styled(Button)`
  width: auto;
  padding: 0 1.6rem;
`;

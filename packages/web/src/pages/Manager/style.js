import styled from 'styled-components';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const FlexBox = styled.div`
  width: 100%;
  display: flex;
  margin: 1.6rem 0;
  justify-content: center;
  
  @media(min-width: 730px) {
    justify-content: left;
    width: 50vw;
  }
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

export const CreateEmployeeBtn = styled(Button)`
  margin-bottom: 2.4rem;

  @media(min-width: 730px) {
    width: auto;
    margin: 0;
    padding: 0 1.6rem;
  }
`;

export const ResponsiveBox = styled(FlexBox)`
   width: 100%;
   justify-content: space-between;

   align-items: center;
   @media(max-width: 730px) {
   flex-direction: column ;
  }
`;

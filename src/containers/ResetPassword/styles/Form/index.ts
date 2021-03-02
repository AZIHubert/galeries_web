import styled from 'styled-components';

const Form = styled.form.attrs(
  () => ({
    'data-testid': 'form',
  }),
)`
  width: 100%;
`;

export default Form;

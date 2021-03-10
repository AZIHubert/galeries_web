import * as React from 'react';

import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

import {
  Container,
} from './styles';

const Edit = () => (
  <Container>
    <ChangePassword />
    <ChangeEmail />
    <DeleteAccount />
  </Container>
);

export default Edit;

import * as React from 'react';

import Footer from '#containers/Footer';

import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import Part from './Part';

import {
  Container,
} from './styles';

const Edit = () => (
  <Container>
    <Part
      title='Change your password'
    >
      <ChangePassword />
    </Part>
    <Part
      title='Change your email'
    >
      <ChangeEmail />
    </Part>
    <Part
      danger
      title='Delete your account'
    >
      <DeleteAccount />
    </Part>
    <Footer />
  </Container>
);

export default Edit;

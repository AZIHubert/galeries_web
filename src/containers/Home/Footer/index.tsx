import * as React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  font-size: 0.65rem;
  font-weight: lighter;
`;

const Footer = () => (
  <footer>
    <Text>
      Allan Aoudji @2021
    </Text>
  </footer>
);

export default Footer;

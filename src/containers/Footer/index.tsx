import * as React from 'react';

import Text from '#components/Text';

const Footer = () => (
  <Text
    fontWeight='lighter'
    styles={{
      fontSize: 0.65,
      marginBottom: 10,
    }}
    stylesMobile={{
      fontSize: 0.7,
    }}
    stylesLaptopL={{
      fontSize: 0.9,
    }}
  >
    Allan Aoudji @2021
  </Text>
);

export default Footer;

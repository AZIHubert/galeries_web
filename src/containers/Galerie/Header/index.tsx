import * as React from 'react';

import Button from '#components/Button';
import Text from '#components/Text';

import {
  Container,
  CoverPicture,
  TitleContainer,
} from './styles';

interface HeaderI {
  galerie: GalerieI;
}

const Header = ({
  galerie,
}: HeaderI) => (
  <Container>
    <CoverPicture
      backgroundColor={galerie.defaultCoverPicture}
    >

    </CoverPicture>
    <TitleContainer>
      <div>
        <Text
          fontWeight='bold'
          styles={{
            fontSize: 1.9,
            lineHeight: 2.3,
          }}
        >
          {galerie.name}
        </Text>
        <Text>
          {galerie.users.length} member{galerie.users.length > 1 ? 's' : ''}
        </Text>
      </div>
      {galerie.role !== 'user' ? (
        <div>
          <Button.Default
            variant='secondary'
            title='create an invitation'
          />
        </div>
      ) : null}
    </TitleContainer>
  </Container>
);

export default Header;

import * as React from 'react';
import styled from 'styled-components';

import Image from '#components/Image';
import Text from '#components/Text';
import mediaQueries from '#helpers/mediaQueries';

import {
  selectProfilPicture,
} from '#store/helpers';

interface GalerieComponentI {
  galerie: GalerieI
}

const Container = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  height: ${({ theme }) => (
    `${theme.galerie.smallest.card.size * 0.7 - theme.galerie.smallest.card.margin * 2}px`
  )};
  width: ${({ theme }) => (
    `${theme.galerie.smallest.card.size - theme.galerie.smallest.card.margin * 2}px`
  )};
  overflow: hidden;
  border-radius: 12px;
  margin: ${({ theme }) => `${theme.galerie.smallest.card.margin}px`};
  @media ${mediaQueries.mobileL} {
    height: ${({ theme }) => (
    `${theme.galerie.small.card.size * 0.7 - theme.galerie.small.card.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.galerie.small.card.margin}px`};
    width: ${({ theme }) => (
    `${theme.galerie.small.card.size - theme.galerie.small.card.margin * 2}px`
  )};
  }
  @media ${mediaQueries.tablet} {
    height: ${({ theme }) => (
    `${theme.galerie.medium.card.size * 0.7 - theme.galerie.medium.card.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.galerie.medium.card.margin}px`};
    width: ${({ theme }) => (
    `${theme.galerie.medium.card.size - theme.galerie.medium.card.margin * 2}px`
  )};
  }
  @media ${mediaQueries.laptop} {
    height: ${({ theme }) => (
    `${theme.galerie.large.card.size * 0.7 - theme.galerie.large.card.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.galerie.large.card.margin}px`};
    width: ${({ theme }) => (
    `${theme.galerie.large.card.size - theme.galerie.large.card.margin * 2}px`
  )};
  }
  @media ${mediaQueries.laptopL} { 
    height: ${({ theme }) => (
    `${theme.galerie.largest.card.size * 0.7 - theme.galerie.largest.card.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.galerie.largest.card.margin}px`};
    width: ${({ theme }) => (
    `${theme.galerie.largest.card.size - theme.galerie.largest.card.margin * 2}px`
  )};
  }
`;

interface GalerieCoverPictureI {
  backgroundColor: string;
}

const GalerieCoverPicture = styled.div<GalerieCoverPictureI>`
  background-image: ${({ backgroundColor }) => backgroundColor};
  height: ${({ theme }) => (
    `${
      theme.galerie.smallest.card.size * 0.7 * 0.85
      - theme.galerie.smallest.card.margin * 2
    }px`
  )};
  width: 100%;
  @media ${mediaQueries.mobileL} {
    height: ${({ theme }) => (
    `${
      theme.galerie.small.card.size * 0.7 * 0.85
      - theme.galerie.small.card.margin * 2
    }px`
  )};
  }
  @media ${mediaQueries.tablet} {
    height: ${({ theme }) => (
    `${
      theme.galerie.medium.card.size * 0.7 * 0.85
      - theme.galerie.medium.card.margin * 2
    }px`
  )};
  }
  @media ${mediaQueries.laptop} {
    height: ${({ theme }) => (
    `${
      theme.galerie.large.card.size * 0.7 * 0.85
      - theme.galerie.large.card.margin * 2
    }px`
  )};
  }
  @media ${mediaQueries.laptopL} { 
    height: ${({ theme }) => (
    `${
      theme.galerie.largest.card.size * 0.7 * 0.85
      - theme.galerie.largest.card.margin * 2
    }px`
  )};
  }
`;

const Information = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  padding: 3px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const ProfilePictureImage = styled.div`
  height: 22px;
  width: 22px;
  border: ${({ theme }) => (
    `2px solid ${theme.colors.white}`
  )};
  border-radius: 50%;
  overflow: hidden;
  margin-right: -6px;
`;

const Galerie = ({
  galerie,
}: GalerieComponentI) => (
  <Container>
    <GalerieCoverPicture
      backgroundColor={galerie.defaultCoverPicture}
    />
    <Information>
      <Text
        fontWeight='bold'
        styles={{
          fontSize: 0.75,
        }}
      >
        {galerie.name}
      </Text>
      <ProfilePictureContainer>
        {galerie.users.map((user) => (
          <ProfilePictureImage
            key={user.id}
          >
            <Image
              alt={`${user.userName}'s profile picture`}
              original={selectProfilPicture(user).croped}
            />
          </ProfilePictureImage>
        ))}
      </ProfilePictureContainer>
    </Information>
  </Container>
);

export default Galerie;

import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

import Button from '#components/Button';
import Text from '#components/Text';

import {
  fetchGalerie,
} from '#store/actions';
import {
  galeriesSelector,
  galerieStatusSelector,
} from '#store/selectors';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.smallest}px`
  )};
  min-height: 100vh;
  padding-top: ${({ theme }) => (
    `${theme.header.dashboard.height.small}px`
  )};
  @media ${mediaQueries.mobileL} {
    margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.small}px`
  )};
  }
  @media ${mediaQueries.laptop} {
    margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.medium}px`
  )};
    padding-top: ${({ theme }) => (
    `${theme.header.dashboard.height.medium}px`
  )};
  }
  @media ${mediaQueries.laptopL} { 
    margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.large}px`
  )};
    padding-top: ${({ theme }) => (
    `${theme.header.dashboard.height.large}px`
  )};
  }
`;

interface CoverPictureI {
  backgroundColor: string;
}

const CoverPicture = styled.div<CoverPictureI>`
  background-image: ${({ backgroundColor }) => backgroundColor};
  width: 75%;
  height: 320px;
  border-radius: 0 0 10px 10px;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  border-radius: 0 0 10px 10px;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-left: ${({ theme }) => (`2px solid ${theme.colors.primary}`)};
  border-right: ${({ theme }) => (`2px solid ${theme.colors.primary}`)};
  border-bottom: ${({ theme }) => (`2px solid ${theme.colors.primary}`)};
`;

const HeaderText = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
`;

const Galerie = () => {
  const dispatch = useDispatch();
  const galeries = useSelector(galeriesSelector);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [galerie, setGalerie] = React.useState<GalerieI | null>(null);
  const [hasFetch, setHasFetch] = React.useState<boolean>(false);
  const status = useSelector(galerieStatusSelector);

  React.useEffect(() => {
    if (id) {
      const currentGalerie = galeries[id];
      if (currentGalerie) {
        setGalerie(galeries[id]);
      } else {
        setHasFetch(true);
        dispatch(
          fetchGalerie({ id }),
        );
      }
    }
  }, [id]);

  React.useEffect(() => {
    if (hasFetch && id) {
      if (status === 'success') {
        setGalerie(galeries[id]);
      }
      if (status === 'error') {
        history.push('/profile');
      }
    }
  }, [
    hasFetch,
    id,
    status,
  ]);

  // If galerie fetch, then error, history.push('/dashboard')
  if (!galerie) {
    return null;
  }

  return (
    <Container>
      <Header>
        <CoverPicture
          backgroundColor={galerie.defaultCoverPicture}
        />
        <HeaderText>
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
            10 members
            </Text>
          </div>
          <div>
            <Button.Default
              variant='secondary'
              title='create an invitation'
            />
          </div>
        </HeaderText>
      </Header>
    </Container>
  );
};

export default Galerie;

import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  fetchGaleries,
} from '#store/actions';
import {
  galeriesSelector,
} from '#store/selectors';

import Galerie from './Galerie';

import {
  Container,
  InnerContainer,
} from './styles';

const GaleriesContainer = () => {
  const dispatch = useDispatch();
  const galeries = useSelector(galeriesSelector);

  React.useEffect(() => {
    dispatch(
      fetchGaleries(),
    );
  }, []);

  return (
    <Container>
      <InnerContainer>
        {Object.keys(galeries).sort(
          (a, b) => (
            new Date(galeries[b].createdAt).getTime()
            - new Date(galeries[a].createdAt).getTime()
          ),
        ).map((index) => (
          <Galerie
            key={galeries[index].id}
            galerie={galeries[index]}
          />
        ))}
      </InnerContainer>
    </Container>
  );
};

export default GaleriesContainer;

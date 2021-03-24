import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import useReachBottom from '#hooks/useReachBottom';
import {
  fetchGaleries,
} from '#store/actions';
import {
  galeriesSelector,
  galeriesStatusSelector,
  galeriesEndSelector,
} from '#store/selectors';

import Galerie from './Galerie';

import {
  Container,
  InnerContainer,
} from './styles';

const GaleriesContainer = () => {
  const dispatch = useDispatch();
  const bottomReach = useReachBottom(40);
  const end = useSelector(galeriesEndSelector);
  const galeries = useSelector(galeriesSelector);
  const galeriesStatus = useSelector(galeriesStatusSelector);

  React.useEffect(() => {
    if (galeriesStatus === 'pending') {
      dispatch(
        fetchGaleries(),
      );
    }
  }, [galeriesStatus]);

  React.useEffect(() => {
    if (
      bottomReach
      && !end
      && galeriesStatus !== 'fetching'
    ) {
      dispatch(fetchGaleries());
    }
  }, [
    bottomReach,
    end,
  ]);

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

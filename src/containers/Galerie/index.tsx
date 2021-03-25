import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  useHistory,
  useParams,
} from 'react-router-dom';

import {
  fetchGalerie,
  fetchGalerieUsers,
  resetGalerie,
} from '#store/actions';
import {
  galeriesSelector,
  galerieStatusSelector,
  loadingSelector,
} from '#store/selectors';

import Body from './Body';
import Header from './Header';

import {
  Container,
} from './styles';

const Galerie = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const galeries = useSelector(galeriesSelector);
  const loading = useSelector(loadingSelector);
  const status = useSelector(galerieStatusSelector);

  const [hasFetch, setHasFetch] = React.useState<boolean>(false);
  const [galerie, setGalerie] = React.useState<GalerieI | null>(null);

  React.useEffect(() => {
    if (id) {
      const currentGalerie = galeries[id];
      if (currentGalerie) {
        dispatch(
          fetchGalerieUsers({ id }),
        );
      } else {
        setHasFetch(true);
        dispatch(
          fetchGalerie({ id }),
        );
      }
    }
  }, [
    id,
  ]);

  React.useEffect(() => {
    if (!loading) {
      dispatch(
        resetGalerie(),
      );
      setGalerie(galeries[id]);
    }
  }, [loading, id]);

  React.useEffect(() => {
    if (hasFetch && id) {
      if (status === 'success') {
        dispatch(
          fetchGalerieUsers({ id }),
        );
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

  if (!galerie) {
    return null;
  }

  return (
    <Container>
      <Header
        galerie={galerie}
      />
      <Body
        galerie={galerie}
      />
    </Container>
  );
};

export default Galerie;

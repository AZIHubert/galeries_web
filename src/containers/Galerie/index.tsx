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
} from '#store/actions';
import {
  galeriesSelector,
  galerieStatusSelector,
} from '#store/selectors';

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

  return (
    <div style={{ marginTop: 100 }}>
      {galerie ? galerie.name : 'loading'}
    </div>
  );
};

export default Galerie;

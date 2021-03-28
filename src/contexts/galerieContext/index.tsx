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
  fetchFrames,
  fetchGalerie,
  fetchGalerieUsers,
  resetGalerie,
} from '#store/actions';
import {
  framesStatusSelector,
  galeriesSelector,
  galerieStatusSelector,
  loadingSelector,
} from '#store/selectors';

export const GalerieContext = React.createContext<{
  galerie: GalerieI | null;
}>({
  galerie: null,
});

export const GalerieProvider: React.FC<{}> = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const galeries = useSelector(galeriesSelector);
  const [galerie, setGalerie] = React.useState<GalerieI | null>(null);
  const loading = useSelector(loadingSelector);
  const status = useSelector(galerieStatusSelector);
  const framesStatus = useSelector(framesStatusSelector(id));

  const [hasFetch, setHasFetch] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (framesStatus === 'success') {
      setGalerie(galeries[id]);
    }
  }, [
    framesStatus,
    id,
  ]);

  // Fetch galerie's users and frames
  // if galerie[id] was not present in store's frame when page load.
  // if failed to load galeries => push to /dashboard
  React.useEffect(() => {
    if (hasFetch && id) {
      if (status === 'success') {
        dispatch(
          fetchGalerieUsers({ id }),
        );
        dispatch(
          fetchFrames({ galerieId: id }),
        );
      }
      if (status === 'error') {
        history.push('/dashboard');
      }
    }
  }, [
    hasFetch,
    id,
    status,
  ]);

  // check if galeries[id] is present in state
  // if true, fetch galerie's users and frames
  // else fetch galeries[id]
  React.useEffect(() => {
    if (id) {
      const currentGalerie = galeries[id];
      if (currentGalerie) {
        dispatch(
          fetchGalerieUsers({ id }),
        );
        dispatch(
          fetchFrames({ galerieId: id }),
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

  // when finish loading
  // reset galerie reducer (status = pending)
  // and set galerie
  React.useEffect(() => {
    if (!loading) {
      dispatch(
        resetGalerie(),
      );
      setGalerie(galeries[id]);
    }
  }, [loading, id]);

  // when unmout set galerie to null
  React.useEffect(() => () => {
    setGalerie(null);
  }, []);

  return (
    <GalerieContext.Provider
      value={{
        galerie,
      }}
    >
      {children}
    </GalerieContext.Provider>
  );
};

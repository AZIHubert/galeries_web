import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  useHistory,
  useParams,
} from 'react-router-dom';

import useReachBottom from '#hooks/useReachBottom';

import {
  fetchFrames,
  fetchGalerie,
  fetchGalerieUsers,
  resetGalerie,
} from '#store/actions';
import {
  framesStatusSelector,
  framesEndSelector,
  galeriesSelector,
  galerieStatusSelector,
  loadingSelector,
} from '#store/selectors';

export const GalerieContext = React.createContext<{
  galerie: GalerieI | null;
  page: 'frames' | 'users' | 'options';
  setPage: React.Dispatch<React.SetStateAction<'frames' | 'users' | 'options'>>;
}>({
  galerie: null,
  page: 'frames',
  setPage: () => {},
});

export const GalerieProvider: React.FC<{}> = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const bottomReach = useReachBottom(40);
  const galeries = useSelector(galeriesSelector);
  const [galerie, setGalerie] = React.useState<GalerieI | null>(null);
  const loading = useSelector(loadingSelector);
  const status = useSelector(galerieStatusSelector);
  const framesEnd = useSelector(framesEndSelector(id));
  const framesStatus = useSelector(framesStatusSelector(id));
  const [page, setPage] = React.useState<'frames' | 'users' | 'options'>('frames');

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

  React.useEffect(() => {
    if (bottomReach) {
      if (
        page === 'frames'
        && !framesEnd
        && framesStatus !== 'fetching'
        && framesStatus !== 'pending'
      ) {
        dispatch(
          fetchFrames({ galerieId: id }),
        );
      }
    }
  }, [
    bottomReach,
    framesEnd,
    page,
    framesStatus,
  ]);

  // when unmout set galerie to null
  // and page to frames
  React.useEffect(() => () => {
    setGalerie(null);
    setPage('frames');
  }, []);

  return (
    <GalerieContext.Provider
      value={{
        galerie,
        page,
        setPage,
      }}
    >
      {children}
    </GalerieContext.Provider>
  );
};

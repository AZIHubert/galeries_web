import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import styled from 'styled-components';

import {
  fetchGaleries,
} from '#store/actions';
import {
  galeriesSelector,
} from '#store/selectors';

import Galerie from './Galerie';

const Container = styled.div`
  display: flex;
  margin-top: 100px;
  flex-wrap: wrap;
`;

const Desktop = () => {
  const dispatch = useDispatch();
  const galeries = useSelector(galeriesSelector);

  React.useEffect(() => {
    dispatch(
      fetchGaleries(),
    );
  }, []);

  return (
    <Container>
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
    </Container>
  );
};

export default Desktop;

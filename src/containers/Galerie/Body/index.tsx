import * as React from 'react';

import ScrollToTop from '#components/ScrollToTop';

import { GalerieContext } from '#contexts/galerieContext';

import FramesPage from './FramesPage';
import OptionsPage from './OptionsPage';
import UsersPage from './UsersPage';

import {
  ButtonMenu,
  Container,
  Menu,
  PageContainer,
} from './styles';

const Body = () => {
  const {
    galerie,
    page,
    setPage,
  } = React.useContext(GalerieContext);

  if (!galerie) {
    return null;
  }

  const currentPage = (() => {
    switch (page) {
      case 'frames':
        return <FramesPage />;
      case 'options':
        return <OptionsPage />;
      case 'users':
        return <UsersPage />;
      default:
        return <FramesPage />;
    }
  })();

  return (
    <Container>
      <Menu>
        <ButtonMenu
          current={page === 'frames'}
          onClick={() => setPage('frames')}
          margin
        >
          Frames
        </ButtonMenu>
        <ButtonMenu
          current={page === 'users'}
          onClick={() => setPage('users')}
          margin
        >
          Users
        </ButtonMenu>
        {galerie.role !== 'user' ? (
          <ButtonMenu
            current={page === 'options'}
            onClick={() => setPage('options')}
          >
            Options
          </ButtonMenu>
        ) : null}
      </Menu>
      <PageContainer>
        {currentPage}
      </PageContainer>
      <ScrollToTop />
    </Container>
  );
};

export default Body;

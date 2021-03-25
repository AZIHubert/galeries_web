import * as React from 'react';

import FramesPage from './FramesPage';
import OptionsPage from './OptionsPage';
import UsersPage from './UsersPage';

import {
  ButtonMenu,
  Container,
  Menu,
  PageContainer,
} from './styles';

interface BodyI {
  galerie: GalerieI;
}

const Body = ({
  galerie,
}: BodyI) => {
  const [page, setPage] = React.useState<'frames' | 'users' | 'options'>('frames');

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
    </Container>
  );
};

export default Body;

import * as React from 'react';

import FieldPage from './FieldPage';
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
  const [page, setPage] = React.useState<'field' | 'users' | 'options'>('field');

  const currentPage = (() => {
    switch (page) {
      case 'field':
        return <FieldPage />;
      case 'options':
        return <OptionsPage />;
      case 'users':
        return <UsersPage />;
      default:
        return <FieldPage />;
    }
  })();

  return (
    <Container>
      <Menu>
        <ButtonMenu
          current={page === 'field'}
          onClick={() => setPage('field')}
          margin
        >
            Field
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

import * as React from 'react';

import {
  ButtonMenu,
  Container,
  Menu,
} from './styles';

interface BodyI {
  galerie: GalerieI;
}

const Body = ({
  galerie,
}: BodyI) => {
  const [page, setPage] = React.useState<'field' | 'users' | 'options'>('field');

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
    </Container>
  );
};

export default Body;

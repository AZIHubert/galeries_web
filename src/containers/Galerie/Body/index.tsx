import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import ScrollToTop from '#components/ScrollToTop';
import Text from '#components/Text';

import { GalerieContext } from '#contexts/galerieContext';

import FramesPage from './FramesPage';
import OptionsPage from './OptionsPage';
import UsersPage from './UsersPage';

import {
  ButtonMenu,
  CoverPicture,
  Container,
  Fader,
  GalerieInformationContainer,
  Menu,
  InnerMenu,
  PageContainer,
} from './styles';

interface BodyI {
  fixedMenu: boolean;
}

const Body = ({
  fixedMenu,
}: BodyI) => {
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
      <Menu
        fixed={fixedMenu}
      >
        <InnerMenu
          fixed={fixedMenu}
        >
          <div>
            <CSSTransition
              classNames='fade'
              in={fixedMenu}
              timeout={200}
              unmountOnExit
            >
              <Fader>
                <GalerieInformationContainer>
                  <CoverPicture
                    backgroundColor={galerie.defaultCoverPicture}
                  />
                  <Text
                    fontWeight='bold'
                    styles={{
                      fontSize: 0.85,
                    }}
                  >
                    {galerie.name}
                  </Text>
                </GalerieInformationContainer>
              </Fader>
            </CSSTransition>
          </div>
          <div>
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
          </div>
        </InnerMenu>
      </Menu>
      {fixedMenu && (
        <div style={{ height: 45 }} />
      )}
      <PageContainer>
        {currentPage}
      </PageContainer>
      <ScrollToTop />
    </Container>
  );
};

export default Body;

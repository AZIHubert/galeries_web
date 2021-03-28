import * as React from 'react';

import Button from '#components/Button';
import Text from '#components/Text';

import { GalerieContext } from '#contexts/galerieContext';

import theme from '#helpers/theme';

import useWindowSize from '#hooks/useWindowSize';

import {
  Container,
  CoverPicture,
  TitleContainer,
} from './styles';

interface HeaderI {
  setFixedMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({
  setFixedMenu,
}: HeaderI) => {
  const { galerie } = React.useContext(GalerieContext);
  const headerRef = React.useRef<HTMLElement | null>(null);
  const [
    headerHeight,
    setHeaderHeight,
  ] = React.useState<number>(theme.header.dashboard.height.small);
  const { width } = useWindowSize();

  React.useEffect(() => {
    const { current } = headerRef;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFixedMenu(!entry.isIntersecting);
      }, {
        rootMargin: `-${headerHeight}px`,
      },
    );
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [
    headerHeight,
    headerRef,
    galerie,
  ]);

  React.useEffect(() => {
    if (width && width < 425) {
      console.log('small');
      setHeaderHeight(theme.header.dashboard.height.small);
    } else if (width && width < 1440) {
      console.log('medium');
      setHeaderHeight(theme.header.dashboard.height.medium);
    } else {
      console.log('large');
      setHeaderHeight(theme.header.dashboard.height.large);
    }
  }, [width]);

  if (!galerie) {
    return null;
  }

  return (
    <Container
      ref={headerRef}
    >
      <CoverPicture
        backgroundColor={galerie.defaultCoverPicture}
      >
      </CoverPicture>
      <TitleContainer>
        <div>
          <Text
            fontWeight='bold'
            styles={{
              fontSize: 1.8,
              lineHeight: 2.3,
            }}
          >
            {galerie.name}
          </Text>
          <Text
            styles={{
              fontSize: 0.9,
            }}
          >
            {galerie.users.length} member{galerie.users.length > 1 ? 's' : ''}
          </Text>
        </div>
        {galerie.role !== 'user' ? (
          <div>
            <Button.Default
              variant='secondary'
              title='create an invitation'
            />
          </div>
        ) : null}
      </TitleContainer>
    </Container>
  );
};

export default Header;

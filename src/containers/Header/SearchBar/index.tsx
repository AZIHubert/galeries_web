import * as React from 'react';

import search from '#ressources/svg/search.svg';

import {
  Container,
  Input,
  Logotype,
} from './styles';

interface SearchBarI {
  containerTestId?: string;
  inputTestId?: string;
}

const SearchBar = ({
  containerTestId,
  inputTestId,
}: SearchBarI) => {
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);
  const [searchBarIsFocused, setSearchBarIsFocused] = React.useState<boolean>(false);

  return (
    <Container
      focused={searchBarIsFocused}
      onClick={() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }}
      testId={containerTestId}
    >
      <Logotype
        alt='search pictogram'
        focused={searchBarIsFocused}
        src={search}
      />
      <Input
        onBlur={() => setSearchBarIsFocused(false)}
        onFocus={() => setSearchBarIsFocused(true)}
        placeholder={searchBarIsFocused ? '' : 'search on Galeries'}
        ref={searchInputRef}
        testId={inputTestId}
      />
    </Container>
  );
};

export default SearchBar;

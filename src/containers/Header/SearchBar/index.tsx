import * as React from 'react';

import search from '#ressources/svg/search.svg';

import {
  Container,
  Input,
  Logotype,
} from './styles';

const SearchBar = () => {
  const [searchBarIsFocused, setSearchBarIsFocused] = React.useState<boolean>(false);
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);
  return (
    <Container
      focused={searchBarIsFocused}
      onClick={() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }}
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
      />
    </Container>
  );
};

export default SearchBar;

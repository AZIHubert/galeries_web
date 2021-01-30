import * as React from 'react';

import logo from '#ressources/svg/logoG.svg';

import PopupProfile from './PopupProfile';

const Header = () => {
  const [openPopupProfil, setOpenPopupProfile] = React.useState<boolean>(false);
  return (
    <header>
      <div>
        <img src={logo} alt="header logo" />
        <img
          alt='search pictogram'
        />
        <input
          placeholder='search on Galeries'
        />
      </div>
      <button>
        <img
          alt='home pictogram'
        />
      </button>
      <button>
        <img
          alt='create new galerie pictogram'
        />
      </button>
      <button>
        <img
          alt='notification pictogram'
        />
      </button>
      <button
        data-testid='profilButton'
        onClick={() => setOpenPopupProfile((lastState) => !lastState)}
      >
        <img
          alt='profile picture'
        />
        userName
      </button>
      {openPopupProfil && <PopupProfile />}
      <button>
        logout
      </button>
    </header>
  );
};

export default Header;

import * as React from 'react';

import createGalerie from '#ressources/svg/createGalerie.svg';
import defaultProfilePicture from '#ressources/svg/defaultProfilePicture.svg';
import home from '#ressources/svg/home.svg';
import logo from '#ressources/svg/logoG.svg';
import notification from '#ressources/svg/notification.svg';
import search from '#ressources/svg/search.svg';

import PopupProfile from './PopupProfile';

const Header = () => {
  const [openPopupProfil, setOpenPopupProfile] = React.useState<boolean>(false);
  return (
    <header>
      <div>
        <img
          src={logo}
          alt="header logo"
        />
        <img
          alt='search pictogram'
          src={search}
        />
        <input
          placeholder='search on Galeries'
        />
      </div>
      <button>
        <img
          alt='home pictogram'
          src={home}
        />
      </button>
      <button>
        <img
          alt='create new galerie pictogram'
          src={createGalerie}
        />
      </button>
      <button>
        <img
          alt='notification pictogram'
          src={notification}
        />
      </button>
      <button
        data-testid='profilButton'
        onClick={() => setOpenPopupProfile((lastState) => !lastState)}
      >
        <img
          alt='profile picture'
          src={defaultProfilePicture}
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

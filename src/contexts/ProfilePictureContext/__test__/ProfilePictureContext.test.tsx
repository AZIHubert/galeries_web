import {
  cleanup,
  render,
} from '@testing-library/react';
import * as React from 'react';
import reactRedux, { Provider } from 'react-redux';
import { createStore } from 'redux';

import useReachBottom from '#hooks/useReachBottom';

import reducers from '#store/reducers';
import {
  profilePicturesEndSelector,
  profilePicturesSelector,
  profilePictureCurrentSelector,
  profilePicturesStatusSelector,
  profilePictureStatusSelector,
  userSelector,
} from '#store/selectors';

import {
  ProfilePictureContext,
  ProfilePictureProvider,
} from '../index';

const mockedStore = createStore(reducers);

// const defaultValue = {
//   profilePicture: {
//     croped: '',
//     original: '',
//     pending: '',
//   },
//   isPosting: false,
//   isPutting: false,
//   profilePictures: {},
//   puttingImage: null,
//   setPuttingImage: () => {},
// };

const Container = () => (
  <Provider store={mockedStore}>
    <ProfilePictureProvider>
      <Children />
    </ProfilePictureProvider>
  </Provider>
);

const Children = () => {
  const {
    profilePicture,
    profilePictures,
    isPosting,
    isPutting,
  } = React.useContext(ProfilePictureContext);
  const hasProfilePictures = Object.keys(profilePictures).length > 0;
  return (
    <>
      {hasProfilePictures && <p>has profile picture</p>}
      {isPosting && <p>is posting</p>}
      {isPutting && <p>is putting</p>}
      {profilePicture.croped}
    </>
  );
};

jest.useFakeTimers();
const mockedDispatch = jest.fn();
const mockedFetchProfilePictures = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux') as typeof reactRedux,
  useDispatch: () => mockedDispatch,
}));

jest.mock('#store/actions/profilePictures.actions', () => ({
  fetchProfilePictures: () => mockedFetchProfilePictures,
}));
jest.mock('#store/selectors/profilePicturesEnd.selector', () => jest.fn());
jest.mock('#store/selectors/profilePicturesStatus.selector', () => jest.fn());
jest.mock('#store/selectors/profilePictureStatus.selector', () => jest.fn());
jest.mock('#store/selectors/profilePictures.selector', () => jest.fn());
jest.mock('#store/selectors/user.selector', () => jest.fn());
jest.mock('#store/selectors/profilePictureCurrent.selector', () => jest.fn());
jest.mock('#hooks/useReachBottom', () => jest.fn());

describe('ProfilePictureContext', () => {
  beforeEach(() => {
    (profilePicturesSelector as jest.Mock).mockImplementation(() => ({}));
    (profilePictureCurrentSelector as jest.Mock).mockImplementation(() => ({
      croped: '',
      original: '',
      pending: '',
    }));
  });
  afterEach(cleanup);
  it('should dispatch fetchProfilePictures if profile pictures is pending and user is defined', () => {
    (profilePicturesStatusSelector as jest.Mock).mockImplementation(() => 'pending');
    (userSelector as jest.Mock).mockImplementation(() => ({}));
    render(<Container />);
    expect(mockedDispatch).toHaveBeenCalledWith(mockedFetchProfilePictures);
  });
  it('should not dispatch fetchProfilePictures if profile pictures is not pending', () => {
    (profilePicturesStatusSelector as jest.Mock).mockImplementation(() => 'success');
    (userSelector as jest.Mock).mockImplementation(() => ({}));
    render(<Container />);
    expect(mockedDispatch).not.toHaveBeenCalled();
  });
  it('should not dispatch fetchProfilePictures if user is not defined', () => {
    (profilePicturesStatusSelector as jest.Mock).mockImplementation(() => 'pending');
    (userSelector as jest.Mock).mockImplementation(() => null);
    render(<Container />);
    expect(mockedDispatch).not.toHaveBeenCalled();
  });
  it('should setProfilePictures if profile pictures status is success', () => {
    (profilePicturesStatusSelector as jest.Mock).mockImplementation(() => 'success');
    (profilePicturesSelector as jest.Mock).mockImplementation(() => ({ profilePicture: 'profilePicture' }));
    const { getByText } = render(<Container />);
    expect(getByText('has profile picture')).toBeTruthy();
  });

  it('should dispatch fetchProfilePictures if bottomReach, is not the end of profile pictures and profile pictures is fetching', () => {
    (useReachBottom as jest.Mock).mockImplementation(() => true);
    (profilePicturesEndSelector as jest.Mock).mockImplementation(() => false);
    (profilePicturesStatusSelector as jest.Mock).mockImplementation(() => 'error');
    render(<Container />);
    expect(mockedDispatch).toHaveBeenCalledWith(mockedFetchProfilePictures);
  });
  it('should not dispatch fetProfilePictures if not bottomReach', () => {
    (useReachBottom as jest.Mock).mockImplementation(() => false);
    (profilePicturesEndSelector as jest.Mock).mockImplementation(() => false);
    (profilePicturesStatusSelector as jest.Mock).mockImplementation(() => 'error');
    render(<Container />);
    expect(mockedDispatch).not.toHaveBeenCalled();
  });
  it('should not dispatch fetchProfilePictures if is the end of profile pictures request', () => {
    (useReachBottom as jest.Mock).mockImplementation(() => true);
    (profilePicturesEndSelector as jest.Mock).mockImplementation(() => true);
    (profilePicturesStatusSelector as jest.Mock).mockImplementation(() => 'error');
    render(<Container />);
    expect(mockedDispatch).not.toHaveBeenCalled();
  });
  it('should not dispatch fetchProfilePictures if profile pictures is fetching', () => {
    (useReachBottom as jest.Mock).mockImplementation(() => true);
    (profilePicturesEndSelector as jest.Mock).mockImplementation(() => true);
    (profilePicturesStatusSelector as jest.Mock).mockImplementation(() => 'fetching');
    render(<Container />);
    expect(mockedDispatch).not.toHaveBeenCalled();
  });
  it('should not dispatch fetchProfilePictures if profile pictures is pending', () => {
    (useReachBottom as jest.Mock).mockImplementation(() => true);
    (profilePicturesEndSelector as jest.Mock).mockImplementation(() => true);
    (profilePicturesStatusSelector as jest.Mock).mockImplementation(() => 'pending');
    render(<Container />);
    expect(mockedDispatch).not.toHaveBeenCalled();
  });

  it('should clear timer on unmount if timer current is set', () => {
    (profilePictureStatusSelector as jest.Mock).mockImplementation(() => 'posting');
    spyOn(window, 'clearTimeout');
    const { unmount } = render(<Container />);
    unmount();
    expect(clearTimeout).toHaveBeenCalled();
  });

  it('should set isPosting to true if profile picture is posting', () => {
    (profilePictureStatusSelector as jest.Mock).mockImplementation(() => 'posting');
    const { getByText } = render(<Container />);
    expect(getByText('is posting')).toBeTruthy();
  });
  it('should set is putting to true if profile picture is putting', () => {
    (profilePictureStatusSelector as jest.Mock).mockImplementation(() => 'putting');
    const { getByText } = render(<Container />);
    expect(getByText('is putting')).toBeTruthy();
  });
  it('should set profile picture, if not waiting profile picture is success', () => {
    (profilePictureStatusSelector as jest.Mock).mockImplementation(() => 'success');
    const { queryByText } = render(<Container />);
    expect(queryByText('is putting')).toBeFalsy();
  });
  it('should set profile pictures, after delay if profile picture is success', () => {
    (profilePictureStatusSelector as jest.Mock).mockImplementation(() => 'success');
    (profilePictureCurrentSelector as jest.Mock).mockImplementation(() => ({
      croped: 'croped',
      original: 'original',
      pending: 'pending',
    }));
    const { getByText } = render(<Container />);
    expect(getByText('croped')).toBeTruthy();
  });
});

import {
  render,
  fireEvent,
} from '@testing-library/react';
import * as React from 'react';
import reactRedux, { Provider } from 'react-redux';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import {
  defaultValue,
  ProfilePictureContext,
} from '#contexts/ProfilePictureContext';

import theme from '#helpers/theme';

import reducers from '#store/reducers';
import { userSelector } from '#store/selectors';

import PutButton from '../index';

const defaultId = 'defaultId';
const currentId = 'currentId';

const mockedStore = createStore(reducers);

const Container = ({
  id = defaultId,
  puttingImage = null,
}: {
  id?: string;
  puttingImage?: string | null;
}) => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ProfilePictureContext.Provider
        value={{
          ...defaultValue,
          puttingImage,
          setPuttingImage: mockedSetPuttingImage,
        }}
      >
        <PutButton
          id={id}
        />
      </ProfilePictureContext.Provider>
    </ThemeProvider>
  </Provider>
);

const mockedDispatch = jest.fn();
const mockedSetPuttingImage = jest.fn();
const mockedPutProfilePicture = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux') as typeof reactRedux,
  useDispatch: () => mockedDispatch,
}));

jest.mock('#store/selectors/user.selector', () => jest.fn());
jest.mock('#store/actions/profilePicture.actions', () => ({
  putProfilePicture: () => mockedPutProfilePicture,
}));

describe('PutButton', () => {
  beforeEach(() => {
    (userSelector as jest.Mock).mockImplementation(() => ({
      currentProfilePictureId: currentId,
    }));
  });
  it('should dispatch putProfilePicture and call setPuttingImage onClick', () => {
    const { getByRole } = render(<Container />);
    fireEvent.click(getByRole('button'));
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(mockedPutProfilePicture);
    expect(mockedSetPuttingImage).toHaveBeenCalledTimes(1);
    expect(mockedSetPuttingImage).toHaveBeenLastCalledWith(defaultId);
  });
  it('should not dispatch and not call setPuttingImage onClick if puttingImage is not null', () => {
    const {
      getByRole,
    } = render(
      <Container
        puttingImage='id'
      />,
    );
    fireEvent.click(getByRole('button'));
    expect(mockedDispatch).toHaveBeenCalledTimes(0);
    expect(mockedSetPuttingImage).toHaveBeenCalledTimes(0);
  });
  it('should have secondary background if is not current', () => {
    const {
      getByRole,
    } = render(
      <Container />,
    );
    expect(getByRole('button')).toHaveStyle(`background: ${theme.colors.secondary}`);
  });
  it('should have primary background if is current', () => {
    const {
      getByRole,
    } = render(
      <Container
        id={currentId}
      />,
    );
    expect(getByRole('button')).toHaveStyle(`background: ${theme.colors.primary}`);
  });
});

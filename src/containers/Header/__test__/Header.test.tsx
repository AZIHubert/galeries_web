import * as React from 'react';
import renderer from 'react-test-renderer';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import Header from '../index';

describe('Header', () => {
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should open popup profile', async () => {
    const { getByTestId } = render(<Header />);
    const profilButton = getByTestId('profilButton');
    fireEvent.click(profilButton);
    const popupProfil = await screen.findByTestId('popupProfil');
    expect(popupProfil).not.toBeNull();
  });
  it('should close popup profile', async () => {
    const { getByTestId } = render(<Header />);
    const profilButton = getByTestId('profilButton');
    fireEvent.click(profilButton);
    fireEvent.click(profilButton);
    const popupProfil = screen.queryByTestId('popupProfil');
    expect(popupProfil).toBeNull();
  });
});

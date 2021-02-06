import * as React from 'react';
import renderer from 'react-test-renderer';

import ModalVerifyAccount from '../index';

describe('Home', () => {
  it('renders without crashing', () => {
    const mockedSetLoading = jest.fn;
    const tree = renderer.create(
      <ModalVerifyAccount
        loading={false}
        setLoading={mockedSetLoading}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

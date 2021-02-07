import * as React from 'react';
import renderer from 'react-test-renderer';

import ModalValidateResetPassword from '../index';

describe('ModalValidateResetPassword', () => {
  const mockedSetLoading = jest.fn;
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ModalValidateResetPassword
        loading={false}
        setLoading={mockedSetLoading}
        currentEmail='mockedEmail@email.com'
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

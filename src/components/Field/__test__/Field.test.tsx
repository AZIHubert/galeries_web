import { render } from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import theme from '#helpers/theme';

import Field from '../index';

const Component = ({
  error,
  label,
  marginBottom,
  marginBottomL,
  marginTop,
  marginTopL,
  required,
  touched,
}: {
  error?: string;
  label?: string;
  marginBottom?: number;
  marginBottomL?: number;
  marginTop?: number;
  marginTopL?: number;
  required?: boolean;
  touched?: boolean;
}) => (
  <ThemeProvider>
    <Field
      containerTestId='container'
      error={error}
      errorTestId='error'
      fieldTestId='field'
      id='id'
      label={label}
      labelTestId='label'
      marginBottom={marginBottom}
      marginBottomL={marginBottomL}
      marginTop={marginTop}
      marginTopL={marginTopL}
      onChange={() => {}}
      required={required}
      touched={touched}
      value=''
    />
  </ThemeProvider>
);

describe('Field', () => {
  it('should have label', () => {
    const { getByText } = render(
      <Component
        label='label'
      />,
    );
    expect(getByText('label')).toBeTruthy();
  });
  it('should not have label', () => {
    const { queryByTestId } = render(
      <Component />,
    );
    expect(queryByTestId('label')).toBeFalsy();
  });
  it('label have asterisque', () => {
    const { getByText } = render(
      <Component
        label='label'
        required
      />,
    );
    expect(getByText('*')).toBeTruthy();
  });
  it('should not have error if not touched', () => {
    const {
      getByTestId,
      queryByTestId,
    } = render(
      <Component
        error='error'
      />,
    );
    expect(queryByTestId('error')).toBeFalsy();
    expect(getByTestId('field')).toHaveStyle(`border: 2px solid ${theme.colors.primary}`);
  });
  it('should have error', () => {
    const {
      getByTestId,
      getByText,
    } = render(
      <Component
        error='error'
        touched
      />,
    );
    expect(getByText('error')).toBeTruthy();
    expect(getByTestId('field')).toHaveStyle(`border: 2px solid ${theme.colors.danger}`);
  });
});

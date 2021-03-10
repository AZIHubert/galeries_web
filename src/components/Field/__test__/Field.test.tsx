import { render } from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import theme from '#helpers/theme';

import Field from '../index';

const Component = ({
  disabled = false,
  error,
  label,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  required,
  touched,
}: {
  disabled?: boolean;
  error?: string;
  label?: string;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  required?: boolean;
  touched?: boolean;
}) => (
  <ThemeProvider>
    <Field
      containerTestId='container'
      disabled={disabled}
      error={error}
      errorTestId='error'
      fieldTestId='field'
      id='id'
      label={label}
      labelTestId='label'
      onChange={() => {}}
      required={required}
      styles={{
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      }}
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
  it('should be disabled', () => {
    const {
      getByTestId,
    } = render(
      <Component
        disabled
      />,
    );
    const field = getByTestId('field');
    expect(field).toHaveStyle('opacity: 0.7');
    expect(field).toHaveAttribute('disabled');
  });
});

import * as React from 'react';

import {
  Container,
  Error,
  Input,
  Label,
  TextArea,
} from './styles';

interface StylesI {
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}
interface FieldI {
  containerTestId?: string;
  disabled?: boolean;
  error?: string | undefined
  errorTestId?: string;
  fieldTestId?: string;
  id: string;
  label?: string;
  labelTestId?: string;
  multiline?: boolean;
  onBlur?: ((event: any) => void) | undefined;
  onChange?: ((event: any) => void) | undefined;
  required?: boolean;
  styles?: StylesI;
  stylesMobile?: StylesI;
  stylesTablet?: StylesI;
  stylesLaptop?: StylesI;
  stylesLaptopL?: StylesI;
  touched?: boolean | undefined;
  type?: 'password' | 'text';
  value: string;
}

const Field = ({
  containerTestId,
  disabled = false,
  error,
  errorTestId,
  fieldTestId,
  id,
  label,
  labelTestId,
  multiline = false,
  onBlur,
  onChange,
  required = false,
  styles,
  stylesMobile,
  stylesTablet,
  stylesLaptop,
  stylesLaptopL,
  touched,
  type = 'text',
  value,
}: FieldI) => (
  <Container
    styles={styles}
    stylesMobile={stylesMobile}
    stylesLaptop={stylesLaptop}
    stylesLaptopL={stylesLaptopL}
    stylesTablet={stylesTablet}
    testId={containerTestId}
  >
    {label ? (
      <Label
        htmlFor={id}
        testId={labelTestId}
      >
        <p>
          {label}
        </p>
        {required && (
          <p>
            *
          </p>
        )}
      </Label>
    ) : null}
    {multiline ? (
      <TextArea
        disabled={disabled}
        error={!!error && touched}
        id={id}
        name={id}
        onBlur={onBlur}
        onChange={onChange}
        testId={fieldTestId}
        value={value}
      />
    ) : (
      <Input
        disabled={disabled}
        error={!!error && touched}
        id={id}
        name={id}
        onBlur={onBlur}
        onChange={onChange}
        testId={fieldTestId}
        type={type}
        value={value}
      />
    )}
    {error && touched && (
      <Error
        testId={errorTestId}
      >
        {error}
      </Error>
    )}
  </Container>
);

export default Field;

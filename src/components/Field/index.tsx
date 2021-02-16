import * as React from 'react';

import {
  Container,
  Error,
  Input,
  Label,
  TextArea,
} from './styles';

interface FieldI {
  disabled?: boolean;
  error?: string | undefined
  errorTestId?: string;
  fieldTestId?: string;
  id: string;
  label?: string;
  marginBottom?: number;
  marginBottomL?: number;
  marginTop?: number;
  marginTopL?: number;
  multiline?: boolean;
  onBlur?: ((event: any) => void) | undefined;
  onChange?: ((event: any) => void) | undefined;
  required?: boolean;
  touched?: boolean | undefined;
  type?: 'password' | 'text';
  value: string;
}

const Field = ({
  disabled = false,
  error,
  errorTestId,
  fieldTestId,
  id,
  label,
  marginBottom = 0,
  marginBottomL = 0,
  marginTop = 0,
  marginTopL = 0,
  multiline = false,
  onBlur,
  onChange,
  required = false,
  touched,
  type = 'text',
  value,
}: FieldI) => (
  <Container
    marginBottom={marginBottom}
    marginBottomL={marginBottomL}
    marginTop={marginTop}
    marginTopL={marginTopL}
  >
    {label ? (
      <Label
        htmlFor={id}
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

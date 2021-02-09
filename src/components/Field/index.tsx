import * as React from 'react';
import {
  Container,
  Error,
  Input,
  Label,
} from './styles';

interface FieldI {
  disabled?: boolean;
  error?: string | undefined
  errorTestId?: string;
  fieldTestId?: string;
  id: string;
  label?: string;
  marginBottom?: number;
  marginTop?: number;
  onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
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
  marginTop = 0,
  onBlur,
  onChange,
  required = false,
  touched,
  type = 'text',
  value,
}: FieldI) => (
  <Container
    marginBottom={marginBottom}
    marginTop={marginTop}
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
    <Input
      testId={fieldTestId}
      disabled={disabled}
      error={!!error && touched}
      id={id}
      name={id}
      onBlur={onBlur}
      onChange={onChange}
      type={type}
      value={value}
    />
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

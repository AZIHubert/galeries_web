import * as React from 'react';

interface LabelI {
  disabled?: boolean;
  id: string;
  label: string;
}

const Field = ({
  disabled = false,
  id,
  label,
}: LabelI) => (
  <>
    <label
      htmlFor={id}
    >
      {label}
    </label>
    <input
      disabled={disabled}
      id={id}
      name={id}
    />
  </>
);

export default Field;

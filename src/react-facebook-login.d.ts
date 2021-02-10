import * as React from 'react';

declare module 'react-facebook-login' {

  export interface ReactFacebookLoginProps {
    render: React.FC<{ onClick: () => void }>;
  }
}

import * as React from 'react';

interface PopupSigninI {
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const signinOriginalValues = {
  userNameOrEmail: '',
  password: '',
};

const PopupSignin = ({ loading, setLoading }: PopupSigninI) => {
  const [signinValues, setSigninValues] = React.useState(signinOriginalValues);

  const timer: React.MutableRefObject<null | number> = React.useRef(null);

  React.useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      timer.current = setInterval(() => setLoading(false), 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!loading) {
      setSigninValues({
        ...signinValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          data-testid='userNameOrEmailField'
          disabled={loading}
          name='userNameOrEmail'
          onChange={handleChange}
          type='text'
          value={signinValues.userNameOrEmail}
        />
        <input
          data-testid='passwordField'
          disabled={loading}
          name='password'
          onChange={handleChange}
          type='password'
          value={signinValues.password}
        />
        <button
          data-testid='loginLogin'
          disabled={loading}
          type='submit'
        >
          {loading ? 'loading' : 'login'}
        </button>
      </form>
    </div>
  );
};

export default PopupSignin;

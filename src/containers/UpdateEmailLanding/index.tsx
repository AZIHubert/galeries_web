import * as React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
  useHistory,
} from 'react-router-dom';

import FullPageForm from '#components/FullPageForm';

import {
  userSelector,
  updateEmailValidateStatusSelector,
} from '#store/selectors';

import Updater from './Updater';
import Logger from './Logger';

import {
  Fader,
  InnerContainer,
} from './styles';

const UpdateEmailLanding = () => {
  const user = useSelector(userSelector);
  const updateEmailValidateStatus = useSelector(updateEmailValidateStatusSelector);
  const history = useHistory();

  React.useEffect(() => {
    if (updateEmailValidateStatus === 'success') {
      history.push('/dashboard');
    }
  }, [updateEmailValidateStatus]);

  return (
    <FullPageForm>
      <CSSTransition
        classNames='fade'
        in={!!user}
        timeout={300}
        unmountOnExit
      >
        <Fader>
          <InnerContainer>
            <Updater />
          </InnerContainer>
        </Fader>
      </CSSTransition>
      <CSSTransition
        classNames='fade'
        in={!user}
        timeout={300}
        unmountOnExit
      >
        <Fader>
          <InnerContainer>
            <Logger />
          </InnerContainer>
        </Fader>
      </CSSTransition>
    </FullPageForm>
  );
};

export default UpdateEmailLanding;

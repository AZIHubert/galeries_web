import * as React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import theme from '#helpers/theme';

import {
  Button,
} from './styles';

interface AddFrameButtonI {
  onClick: () => void;
}

const AddFrameButton = ({
  onClick,
}: AddFrameButtonI) => (
  <Button
    onClick={onClick}
  >
    <AiOutlinePlus
      color={theme.colors.secondary}
      size={20}
    />
  </Button>
);

export default AddFrameButton;

import * as React from 'react';

import Frame from './Frame';

interface FramesContainerI {
  frames: { [name: string]: FrameI }
}

const FramesContainer = ({
  frames,
}: FramesContainerI) => (
  <>
    {Object.keys(frames).sort(
      (a, b) => (
        new Date(frames[b].createdAt).getTime()
        - new Date(frames[a].createdAt).getTime()
      ),
    ).map((index) => (
      <Frame
        key={frames[index].id}
        frame={frames[index]}
      />
    ))}
  </>
);

export default FramesContainer;

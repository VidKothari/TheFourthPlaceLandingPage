import React from 'react';
import { Composition } from 'remotion';
import { AddFlow } from './AddFlow';
import { Recs } from './Recs';
import { InCommon } from './InCommon';
import { Tastemap } from './Tastemap';
import { LoopClose } from './LoopClose';

// -Loop variants close back to frame 0 so the clips loop seamlessly on the page.
const AddFlowLoop: React.FC = () => (
  <LoopClose>
    <AddFlow />
  </LoopClose>
);
const RecsLoop: React.FC = () => (
  <LoopClose>
    <Recs />
  </LoopClose>
);
const InCommonLoop: React.FC = () => (
  <LoopClose>
    <InCommon />
  </LoopClose>
);
const TastemapLoop: React.FC = () => (
  <LoopClose>
    <Tastemap />
  </LoopClose>
);

export const Root: React.FC = () => (
  <>
    <Composition id="AddFlow" component={AddFlow} durationInFrames={180} fps={30} width={900} height={1125} />
    <Composition id="Recs" component={Recs} durationInFrames={130} fps={30} width={900} height={1125} />
    <Composition id="InCommon" component={InCommon} durationInFrames={145} fps={30} width={900} height={1125} />
    <Composition id="Tastemap" component={Tastemap} durationInFrames={150} fps={30} width={900} height={1125} />
    <Composition id="AddFlowLoop" component={AddFlowLoop} durationInFrames={180} fps={30} width={900} height={1125} />
    <Composition id="RecsLoop" component={RecsLoop} durationInFrames={130} fps={30} width={900} height={1125} />
    <Composition id="InCommonLoop" component={InCommonLoop} durationInFrames={145} fps={30} width={900} height={1125} />
    <Composition id="TastemapLoop" component={TastemapLoop} durationInFrames={150} fps={30} width={900} height={1125} />
  </>
);

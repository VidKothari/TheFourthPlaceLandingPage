import React from 'react';
import { Composition } from 'remotion';
import { AddFlow } from './AddFlow';
import { Recs } from './Recs';
import { InCommon } from './InCommon';
import { Tastemap } from './Tastemap';

export const Root: React.FC = () => (
  <>
    <Composition id="AddFlow" component={AddFlow} durationInFrames={180} fps={30} width={900} height={1125} />
    <Composition id="Recs" component={Recs} durationInFrames={130} fps={30} width={900} height={1125} />
    <Composition id="InCommon" component={InCommon} durationInFrames={145} fps={30} width={900} height={1125} />
    <Composition id="Tastemap" component={Tastemap} durationInFrames={150} fps={30} width={900} height={1125} />
  </>
);

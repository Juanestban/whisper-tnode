import { whisper } from './index';

import { type TranscriptLine } from './models';

describe('testing whisper library node', () => {
  it('when send audio file', () => {});
  const [result] = whisper('./samples/jfk.wav', {
    modelName: 'small',
  }) as unknown as TranscriptLine[];

  expect(result.start).toBeInstanceOf(String);
  expect(result.end).toBeInstanceOf(String);
  expect(result.speech).toBeInstanceOf(String);
});

import { whisper } from './index';

import { type TranscriptLine } from './models';

describe('testing whisper library node', () => {
  it('when send audio file', async () => {
    const [result] = (await whisper('./samples/jfk.wav', {
      modelName: 'small',
    })) as unknown as TranscriptLine[];

    expect(typeof result.start).toBe('string');
    expect(typeof result.end).toBe('string');
    expect(typeof result.speech).toBe('string');
  }, 10000);
});

import { whisper } from './index';

describe('testing whisper library node', () => {
  it('when send audio file', async () => {
    const [result] = await whisper({
      filePath: './samples/jfk.wav',
      options: { modelName: 'small' },
    });

    expect(typeof result.start).toBe('string');
    expect(typeof result.end).toBe('string');
    expect(typeof result.speech).toBe('string');
  }, 10000);
});

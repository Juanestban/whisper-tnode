import path from 'node:path';
import { whisper } from '../src/index';

describe('testing whisper library node', () => {
  it('when send audio file', async () => {
    const transcript = await whisper({
      filePath: path.join(process.cwd(), 'src/samples/jfk.wav'),
      options: { modelName: 'tiny' },
    });

    expect(transcript.length).toBe(1);

    const [result] = transcript;

    expect(typeof result.start).toBe('string');
    expect(typeof result.end).toBe('string');
    expect(typeof result.speech).toBe('string');
  }, 60000);
});

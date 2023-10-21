import { type TranscriptLine } from '@whispernode/models';

export default function parseTranscript(vtt: string): TranscriptLine[] {
  const lines: string[] = vtt.split('[');

  const finalLines = lines.slice(1);

  return finalLines.map((line) => {
    let [timestamp, speech] = line.split('] ');
    const [start, end] = timestamp.split(' --> ');

    speech = speech.replace(/\n/g, '');

    return { start, end, speech };
  });
}

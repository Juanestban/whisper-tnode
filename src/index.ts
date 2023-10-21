import path from 'node:path';
import pc from 'picocolors';

import { type Options, type ShellOptions } from '@whispernode/models';
import shell from '@whispernode/utils/shell';
import { createCppCommand } from '@whispernode/utils/whisper';
import tanscriptToArray from '@whispernode/utils/tsToArray';
import { println } from './utils/print';

export const whisper = async (filePath: string, options: Options<ShellOptions>) => {
  try {
    const { modelName, whisperOptions, shellOptions } = options;
    const cmd = await createCppCommand({
      filePath: path.normalize(filePath),
      modelName,
      options: whisperOptions,
    });
    const transcript = await shell(cmd, shellOptions);
    return tanscriptToArray(transcript);
  } catch (error) {
    println(pc.bgRed(pc.white('WHISPERNODE_ERROR')), pc.red(`Problem: ${error as any}`));
    return [];
  }
};

import fs from 'node:fs';
import path from 'node:path';
import shelljs from 'shelljs';
import pc from 'picocolors';

import {
  WHISPER_CPP,
  DEFAULT_MODEL,
  MODELS_LIST_FILENAMES,
  WHISPER_MODELS_PATH,
  WHISPER_CPP_MAIN_PATH,
} from '@whispernode/config/constants';
import { type OnlyModel, type CppCommandProps, type FlagOption } from '@whispernode/models';
import { println } from './print';

export const createCppCommand = async ({
  filePath,
  modelName,
  options,
}: CppCommandProps): Promise<string> => {
  const model = await modelPathOrName(modelName);

  return `${WHISPER_CPP_MAIN_PATH} ${getFlags(options)} -m ${model} -f ${filePath}`;
};

const modelPathOrName = async (model?: OnlyModel): Promise<string> => {
  const modelPath = `models/${MODELS_LIST_FILENAMES[model ?? (DEFAULT_MODEL as OnlyModel)]}`;
  const finalPath = path.join(process.cwd(), WHISPER_CPP, modelPath);

  if (!fs.existsSync(finalPath)) {
    const scriptName = 'download-ggml-model';
    let scriptPath = `${scriptName}.sh`;

    println(
      pc.bgYellow(pc.black('WARNING')),
      pc.yellow('missing library whisper.cpp, run next command'),
    );

    if (process.platform === 'win32') {
      scriptPath = `${scriptName}.cmd`;
    }

    await new Promise((resolve, reject) => {
      shelljs.exec(
        `${path.join(process.cwd(), WHISPER_MODELS_PATH, scriptPath)} ${model}`,
        { async: true, silent: true },
        (code, stdout, stderr) => {
          if (code === 0) resolve(stdout);
          else reject(stderr);
        },
      );
    });
  }

  return finalPath;
};

const getFlags = (flags?: FlagOption): string => {
  let s = '';

  // output files
  if (flags?.gen_file_txt) s += ' -otxt';
  if (flags?.gen_file_subtitle) s += ' -osrt';
  if (flags?.gen_file_vtt) s += ' -ovtt';
  // timestamps
  if (flags?.timestamp_size) s += ' -ml ' + (flags as any)['timestamp-size'];
  if (flags?.word_timestamps) s += ' -ml 1';

  return s;
};

import fs from 'node:fs';
import path from 'node:path';
import pc from 'picocolors';
import shell from 'shelljs';

import { type ShellOptions } from '@whispernode/models';
import { WHISPER_CPP, WHISPER_CPP_MAIN_PATH } from '@whispernode/config/constants';
import { println } from '@whispernode/utils/print';

const WHISPER_CPP_PATH = path.join(process.cwd(), WHISPER_CPP);

const defaultShellOptions: ShellOptions = {
  silent: true /** clean all console.logs */,
  async: false,
};

export default async function whisperShell(
  cmd: string,
  options: ShellOptions = defaultShellOptions,
): Promise<string> {
  try {
    if (!fs.existsSync(`${WHISPER_CPP_PATH}/${WHISPER_CPP_MAIN_PATH}`)) {
      println(
        pc.bgYellow(
          pc.black(
            `Problem, not found '${WHISPER_CPP_MAIN_PATH}' file from directory whisper.cpp, maybe you don't have repo`,
          ),
        ),
      );
      println(
        pc.bgYellow(
          pc.black(
            `[+] Try use cli for download correctly whisper.cpp repo and download the model`,
          ),
        ),
      );
    }
  } catch (error) {
    println(pc.bgRed(pc.black('ERROR')), pc.red('error caught in try catch block.'));
  }

  return new Promise((resolve, reject) => {
    shell.exec(
      `${WHISPER_CPP_PATH}/${cmd}`,
      options,
      (code: number, stdout: string, stderr: string) => {
        if (code === 0) {
          resolve(stdout);
        } else reject(stderr);
      },
    );
  });
}

import fs from 'node:fs';
import path from 'node:path';
import pc from 'picocolors';
import shell from 'shelljs';
import { execSync } from 'node:child_process';

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
    const mainFolder = path.join(WHISPER_CPP_PATH, WHISPER_CPP_MAIN_PATH);
    if (!fs.existsSync(mainFolder)) {
      println(
        pc.bgYellow(
          pc.black(
            `Problem, not found '${WHISPER_CPP_MAIN_PATH}' file from directory whisper.cpp, maybe you don't have repo`,
          ),
        ),
      );
      const isWindows = process.platform === 'win32';
      const proc = isWindows ? 'prowershell.exe' : 'sh';

      println(pc.bgBlue(pc.white(`[+] building makefile`)));
      execSync(`${proc} make ${path.join(WHISPER_CPP_PATH, 'Makefile')}`);
    }
  } catch (error) {
    println(pc.bgRed(pc.black('ERROR')), pc.red('error caught in try catch block.'));
  }

  return new Promise((resolve, reject) => {
    shell.exec(
      path.join(WHISPER_CPP_PATH, cmd),
      options,
      (code: number, stdout: string, stderr: string) => {
        if (code === 0) {
          resolve(stdout);
        } else reject(stderr);
      },
    );
  });
}

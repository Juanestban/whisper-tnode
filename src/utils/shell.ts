import path from 'node:path';
import pc from 'picocolors';
import shell from 'shelljs';

import { type ShellOptions } from '@whispernode/models';
import { WHISPER_CPP } from '@whispernode/config/constants';
import { println } from '@whispernode/utils/print';

const WHISPER_CPP_PATH = path.join(process.cwd(), WHISPER_CPP);
const WHISPER_CPP_MAIN_PATH = './main';

const defaultShellOptions: ShellOptions = {
  silent: true /** clean all console.logs */,
  async: false,
};

export default async function whisperShell(
  cmd: string,
  options: ShellOptions = defaultShellOptions,
): Promise<string> {
  return new Promise((resolve, reject) => {
    shell.exec(cmd, options, (code: number, stdout: string, stderr: string) => {
      if (code === 0) {
        resolve(stdout);
      } else reject(stderr);
    });
  });
}

try {
  shell.cd(WHISPER_CPP_PATH);

  if (!shell.which(WHISPER_CPP_MAIN_PATH)) {
    println(
      pc.bgYellow(
        pc.black(
          `Problem, not found '${WHISPER_CPP_MAIN_PATH}' file from directory whisper.cpp, maybe you don't have repo`,
        ),
      ),
    );
    println(
      pc.bgYellow(
        pc.black(`[+] Try use cli for download correctly whisper.cpp repo and download the model`),
      ),
    );
  }
} catch (error) {
  println(pc.bgRed(pc.black('ERROR')), pc.red('error caught in try catch block.'));
}

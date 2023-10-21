import path from 'node:path';
import pc from 'picocolors';
import shell from 'shelljs';

import { type ShellOptions } from '@whispernode/models';
import { println } from '@whispernode/utils/print';

const WHISPER_CPP_PATH = path.resolve(process.cwd(), 'lib/whisper.cpp');
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
        pc.black(`Problem, not found '${WHISPER_CPP_MAIN_PATH}' file from directory whisper.cpp`),
      ),
    );
    println(pc.bgYellow(pc.black(`Attempting to run 'make' command in /whisper directory...`)));

    shell.exec('make', defaultShellOptions);
    println(
      pc.green(`Problem, not found '${WHISPER_CPP_MAIN_PATH}' file from directory whisper.cpp`),
    );
  }
} catch (error) {
  println(pc.bgRed(pc.black('ERROR')), pc.red('error caught in try catch block.'));
}

#! /usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import cac from 'cac';
import pc from 'picocolors';
import shelljs from 'shelljs';

import {
  LINK_REPO_WHISPER_CPP,
  WHISPERNODE_VERSION,
  WHISPER_MODELS_PATH,
  LIBRARY_PATH,
  MODELS_LIST,
} from '@whispernode/config/constants';
import { type Model } from '@whispernode/models';
import { println } from '@whispernode/utils/print';

const cli = cac();

cli
  .command('download', "command for download model, by default will download 'base' model")
  .option('-a, --allmute', 'mute logs to download')
  .option(
    '-m, --model <model-name>',
    `
| Model     | Disk   | RAM     |
|-----------|--------|---------|
| tiny      |  75 MB | ~390 MB |
| tiny.en   |  75 MB | ~390 MB |
| base      | 142 MB | ~500 MB |
| base.en   | 142 MB | ~500 MB |
| small     | 466 MB | ~1.0 GB |
| small.en  | 466 MB | ~1.0 GB |
| medium    | 1.5 GB | ~2.6 GB |
| medium.en | 1.5 GB | ~2.6 GB |
| large-v1  | 2.9 GB | ~4.7 GB |
| large     | 2.9 GB | ~4.7 GB |
`,
  )
  .action(async (flags: { m: Model; model: Model; allmute: boolean }) => {
    const { model = 'base', allmute = false } = flags;
    const modelName = model.toLowerCase() as Model;
    const scriptName = './download-ggml-model';
    let scriptPath = `${scriptName}.sh`;

    if (!MODELS_LIST.includes(modelName)) {
      println(pc.bgRed(pc.black('ERROR_MODEL_NAME')), pc.red('Incorrect model name.'));
      println('run        =>', pc.cyan('pnpm whispernode download -m <nameModel>'));
      println('run help   =>', pc.blue('pnpm whispernode download --help'));
      process.exit(1);
    }
    const whisperCppPath = path.join(process.cwd(), WHISPER_MODELS_PATH);

    if (!fs.existsSync(whisperCppPath)) {
      shelljs.cd(path.join(process.cwd(), LIBRARY_PATH));
      shelljs.exec(`git clone ${LINK_REPO_WHISPER_CPP}`);
      shelljs.cd('../');
    }

    println('[+]', pc.blue(`model: [${model ?? 'base'}]`));
    shelljs.cd(whisperCppPath);

    if (!shelljs.which(scriptPath)) {
      println(pc.bgRed(pc.white('whispernode downloader is not run on the correct root path')));
      process.exit(1);
    }

    if (process.platform === 'win32') {
      scriptPath = `${scriptName}.cmd`;
    }
    const listModels = MODELS_LIST.filter((mod) => mod !== 'all');

    modelName === 'all' && println(pc.bgYellow(pc.black('[>] downloading >=18GB')));

    try {
      println(pc.bgYellow(pc.black('COMPILE_MODEL')), pc.yellow('Attempting to compile model...'));

      listModels.forEach((mod) => {
        if (mod === modelName || modelName === 'all') {
          const cmd = path.resolve(process.cwd(), scriptPath);
          shelljs.exec(`${cmd} ${mod}`, { silent: allmute });
        }
      });

      shelljs.cd('../');
      shelljs.exec('make', { silent: allmute });

      println(pc.green('Download and compile model done correctly!'));

      process.exit(0);
    } catch (error) {
      println(pc.bgRed(pc.black('ERROR_DOWNLOAD')), pc.red('Error downloading model.'));
      println(error as any);
    }
  });

cli.help();
cli.version(WHISPERNODE_VERSION);

cli.parse();

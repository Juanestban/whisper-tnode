#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const cac_1 = __importDefault(require("cac"));
const picocolors_1 = __importDefault(require("picocolors"));
const shelljs_1 = __importDefault(require("shelljs"));
const constants_1 = require("./config/constants");
const print_1 = require("./utils/print");
const cli = (0, cac_1.default)();
cli
    .command('download', "command for download model, by default will download 'base' model")
    .option('-m, --model <model-name>', `
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
`)
    .action(async (flags) => {
    const { model = 'base' } = flags;
    const modelName = model.toLowerCase();
    const scriptName = './download-ggml-model';
    let scriptPath = `${scriptName}.sh`;
    if (!constants_1.MODELS_LIST.includes(modelName)) {
        (0, print_1.println)(picocolors_1.default.bgRed(picocolors_1.default.black('ERROR_MODEL_NAME')), picocolors_1.default.red('Incorrect model name.'));
        (0, print_1.println)('run        =>', picocolors_1.default.cyan('pnpm whispernode download -m <nameModel>'));
        (0, print_1.println)('run help   =>', picocolors_1.default.blue('pnpm whispernode download --help'));
        process.exit(1);
    }
    if (!node_fs_1.default.existsSync(node_path_1.default.resolve(process.cwd(), constants_1.WHISPER_MODELS_PATH))) {
        shelljs_1.default.cd('lib');
        shelljs_1.default.exec(`git clone ${constants_1.LINK_REPO_WHISPER_CPP}`);
        shelljs_1.default.cd('../');
    }
    (0, print_1.println)('[+]', picocolors_1.default.blue(`model: [${model ?? 'base'}]`));
    shelljs_1.default.cd(constants_1.WHISPER_MODELS_PATH);
    if (!shelljs_1.default.which(scriptPath)) {
        (0, print_1.println)(picocolors_1.default.bgRed(picocolors_1.default.white('whispernode downloader is not run on the correct root path')));
        process.exit(1);
    }
    if (process.platform === 'win32') {
        scriptPath = `${scriptName}.cmd`;
    }
    const listModels = constants_1.MODELS_LIST.filter((mod) => mod !== 'all');
    modelName === 'all' && (0, print_1.println)(picocolors_1.default.bgYellow(picocolors_1.default.black('[>] downloading >=18GB')));
    try {
        listModels.forEach((mod) => {
            if (mod === modelName || modelName === 'all') {
                shelljs_1.default.exec(`${scriptPath} ${mod}`);
            }
        });
        (0, print_1.println)(picocolors_1.default.bgYellow(picocolors_1.default.black('COMPILE_MODEL')), picocolors_1.default.yellow('Attempting to compile model...'));
        shelljs_1.default.cd('../');
        shelljs_1.default.exec('make');
        (0, print_1.println)(picocolors_1.default.green('Download and compile model done correctly!'));
        process.exit(0);
    }
    catch (error) {
        (0, print_1.println)(picocolors_1.default.bgRed(picocolors_1.default.black('ERROR_DOWNLOAD')), picocolors_1.default.red('Error downloading model.'));
        (0, print_1.println)(error);
    }
});
cli.help();
cli.version(constants_1.WHISPERNODE_VERSION);
cli.parse();

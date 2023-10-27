const path = require('node:path');
const fs = require('node:fs');

const VERSION_PATH_TS = 'src/config/constants/version.constants.ts';
const VERSION_PATH_PACKAGE = 'package.json';

const VERSION_FILE_TS = path.resolve(process.cwd(), VERSION_PATH_TS);
const VERSION_FILE_PACKAGE = path.resolve(process.cwd(), VERSION_PATH_PACKAGE);
const [newVersion] = process.argv.slice(2);

const fileTs = fs.readFileSync(VERSION_FILE_TS, 'utf-8');
const newVersionFileTs = fileTs.replace(/[0-9]+\.[0-9]+\.[0-9]+/, newVersion);

fs.writeFileSync(VERSION_FILE_TS, newVersionFileTs);

const filePackage = fs.readFileSync(VERSION_FILE_PACKAGE, 'utf-8');
const newVersionFilePackage = filePackage.replace(
  /\"version\": \"[0-9]+\.[0-9]+\.[0-9]+\"/,
  `"version": "${newVersion}"`,
);

fs.writeFileSync(VERSION_FILE_PACKAGE, newVersionFilePackage);

console.log('[🟢] Done change version');

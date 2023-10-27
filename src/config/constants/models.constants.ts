import { type Model } from '@whispernode/models';
import { WHISPERNODE_NAME } from './version.constants';
import env from '@whispernode/environments';

export const MODELS_LIST: Model[] = [
  'tiny',
  'tiny.en',
  'base',
  'base.en',
  'small',
  'small.en',
  'medium',
  'medium.en',
  'large-v1',
  'large',
  'all',
];

export const MODELS_LIST_FILENAMES: Record<Exclude<Model, 'all'>, string> = {
  tiny: 'ggml-tiny.bin',
  'tiny.en': 'ggml-tiny.en.bin',
  base: 'ggml-base.bin',
  'base.en': 'ggml-base.en.bin',
  small: 'ggml-small.bin',
  'small.en': 'ggml-small.en.bin',
  medium: 'ggml-medium.bin',
  'medium.en': 'ggml-medium.en.bin',
  'large-v1': 'ggml-large-v1.bin',
  large: 'ggml-large.bin',
};

export const DEFAULT_MODEL: Model = 'base';
const ROOT_PROJECT = `${env.isDevelopment ? '' : 'node_modules/' + WHISPERNODE_NAME}`;
export const LIBRARY_PATH = `${ROOT_PROJECT}/lib`;
export const WHISPER_MODELS_PATH = `${LIBRARY_PATH}/whisper.cpp/models`;

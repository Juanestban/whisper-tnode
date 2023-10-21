import { type Model } from '@whispernode/models';

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

export const DEFAULT_MODEL: Model = 'base';

export const WHISPER_MODELS_PATH = 'lib/whisper.cpp/models';

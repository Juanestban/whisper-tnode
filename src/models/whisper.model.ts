export type Model =
  | 'tiny'
  | 'tiny.en'
  | 'base'
  | 'base.en'
  | 'small'
  | 'small.en'
  | 'medium'
  | 'medium.en'
  | 'large-v1'
  | 'large'
  | 'all';

export interface TranscriptLine {
  start: string;
  end: string;
  speech: string;
}

export interface FlagOption {
  gen_file_txt?: boolean;
  gen_file_subtitle?: boolean;
  gen_file_vtt?: boolean;
  timestamp_size?: number;
  word_timestamps?: boolean;
}

export type OnlyModel = Exclude<Model, 'all'>;

export interface CppCommandProps {
  filePath: string;
  modelName?: OnlyModel;
  options?: FlagOption;
}

export interface Options<T = unknown> {
  modelName?: OnlyModel; // name of model stored in node_modules/whisper-node-ts/lib/whisper.cpp/models
  whisperOptions?: FlagOption;
  shellOptions?: T;
}

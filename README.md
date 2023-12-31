# whisper-tnode

> ⚠ Warining: You will need have installed make command

## Install `make` command

if you be on **Windows**, go [here](https://gnuwin32.sourceforge.net/packages/make.htm) and follow steps for install and can use `make` command

if you are on **Linux** or **Mac**, you can use `apt-get` / `apt` (Linux) or `brew` (Mac)

## getting started

Install
```sh
npm install -D whisper-tnode
```

```sh
yarn add -D whisper-tnode
```

```sh
pnpm add -D whisper-tnode
```

## How to download model

By default without model flag, this will take `base` model whisper

```sh
pnpm whisper-tnode download
```

### flags

- `--almute` or `-a` for silent all log when be downloading and compiling the whisper model cpp

- `--model` or `-m`

**log:**
```
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
```


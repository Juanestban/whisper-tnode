# whispernode

## getting started

Install
```sh
npm install -D whispernode
```

```sh
yarn add -D whispernode
```

```sh
pnpm add -D whispernode
```

## How to download model

By default without model flag, this will take `base` model whisper

```sh
pnpm whispernode download
```

### flags

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


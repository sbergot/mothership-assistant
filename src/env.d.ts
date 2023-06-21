/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
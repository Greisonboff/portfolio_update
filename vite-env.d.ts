/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_BASE: string;
  readonly VITE_API_URL_BASE_IMG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

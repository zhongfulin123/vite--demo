/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_SOME_API: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

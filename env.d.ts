declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEFAULT_CHAIN: string;
      INFURA_KEY: string;
      VOUCH_DB_ENDPOINT: string;
    }
  }
}

export {}

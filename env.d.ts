declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GNOSIS_RPC: string;
      SEPOLIA_RPC: string;
      FILEBASE_TOKEN: string;
      DATALAKE_URL: string;
      DATALAKE_KEY: string;
      LOGTAIL_SOURCE_TOKEN: string;
    }
  }
}

export {};

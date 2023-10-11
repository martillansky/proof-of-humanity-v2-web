declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MAINNET_RPC: string;
      GNOSIS_RPC: string;
      SEPOLIA_RPC: string;
      FILEBASE_TOKEN: string;
      DATALAKE_URL: string;
      DATALAKE_KEY: string;
    }
  }
}

export {}

import axios from "axios";
import { useMemo } from "react";
import {
  PushVouchBody,
  VDBRequestsResult,
  VDBVouchesResult,
} from "types/vouchdb";

const useVouchDB = () =>
  useMemo(
    () => ({
      pushVouch: async (vouch: PushVouchBody) =>
        (await axios.post(`${process.env.VOUCH_DB_ENDPOINT}/push`, vouch)).data,
      getMinVouchesRequests: async (minVouches = 1) =>
        (
          await axios.get<VDBRequestsResult>(
            `${process.env.VOUCH_DB_ENDPOINT}/requests?minVouches=${minVouches}`
          )
        ).data.requests,
      getRequestVouches: async (claimer: string, humanity: string) =>
        (
          await axios.get<VDBVouchesResult>(
            `${process.env.VOUCH_DB_ENDPOINT}/vouches?claimer=${claimer}&humanity=${humanity}`
          )
        ).data.vouches,
    }),
    []
  );

export default useVouchDB;

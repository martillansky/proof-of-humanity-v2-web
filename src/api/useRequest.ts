import { RequestQuery } from "generated/graphql";
import { useEffect, useState } from "react";
import { queryFetchSingle } from ".";

interface RequestHookInterface {
  loading: boolean;
  request?: RequestQuery["request"];
}

export const useRequest = (chainId?: number, id?: string) => {
  const [state, setState] = useState<RequestHookInterface>({ loading: false });

  const fetchRequest = async () => {
    if (!id || !chainId) return;

    setState({ loading: true });

    const res = await queryFetchSingle(chainId, "Request", id);

    setState({ loading: false, request: res?.request });
  };

  useEffect(() => {
    fetchRequest();
  }, [id, chainId]);

  return state;
};

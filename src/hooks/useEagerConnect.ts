import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { IS_MOBILE } from "constants/media";
import { injected } from "utils/connectors";

export function useEagerConnect() {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (!active) {
      (async () => {
        if (!(await injected.isAuthorized()) && !(IS_MOBILE && window.ethereum))
          return setTried(true);

        try {
          activate(injected, undefined, true);
        } catch {
          setTried(true);
        }
      })();
    }
  }, [activate, active]);

  useEffect(() => {
    if (active) setTried(true);
  }, [active]);

  return tried;
}

export default useEagerConnect;

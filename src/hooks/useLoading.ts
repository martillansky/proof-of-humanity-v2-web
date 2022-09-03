import { useCallback, useState } from "react";

export const useLoading = (
  initState: boolean = false,
  initMessage?: string
) => {
  const [active, setActive] = useState<boolean>(initState);
  const [message, setMessage] = useState<string | undefined>(initMessage);

  const start = useCallback((message?: string) => {
    setActive(true);
    setMessage(message);
  }, []);

  const stop = useCallback(() => {
    setActive(false);
    setMessage(undefined);
  }, []);

  return { message, active, start, stop };
};

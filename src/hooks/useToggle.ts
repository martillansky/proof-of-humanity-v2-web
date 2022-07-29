import { useCallback, useState } from "react";

export const useToggle = (defaultValue?: boolean) => {
  const [value, setValue] = useState(!!defaultValue);
  return [value, useCallback(() => setValue((o) => !o), []), setValue] as const;
};

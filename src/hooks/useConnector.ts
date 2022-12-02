import { useMemo } from "react";
import {
  ConnectionMapping,
  ConnectionType,
  SUPPORTED_CONNECTIONS,
} from "utils/connectors";
import useLocalStorage from "./useLocalStorage";

const useConnector = () => {
  const [savedConnectionType, setConnectionType] = useLocalStorage<
    ConnectionType | ""
  >("CONNECTOR", "");

  const connectionType = useMemo(
    () =>
      SUPPORTED_CONNECTIONS.find((i) => i === savedConnectionType)
        ? savedConnectionType
        : "",
    [savedConnectionType]
  ) as ConnectionType | "";

  const connector = useMemo(
    () =>
      connectionType
        ? ConnectionMapping[connectionType].connector
        : ConnectionMapping[SUPPORTED_CONNECTIONS[0]].connector,
    [connectionType]
  );

  return { connector, connectionType, setConnectionType };
};

export default useConnector;

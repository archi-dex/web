import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { api, Entity } from "~/lib/api";
import { useAsync } from "~/lib/hooks/useAsync";

export interface EntityFilter {
  key: string;
  value: string;
}

export interface EntitiesContextValue {
  isLoading: boolean;
  entities: Entity[];
  request: (filter: EntityFilter) => void;
}

export const EntitiesContext =
  createContext<EntitiesContextValue | undefined>(undefined);

export const useEntitiesContext = () => {
  const value = useContext(EntitiesContext);
  if (!value) {
    throw new Error(
      "EntitiesContext consumer does not have a matching provider"
    );
  }

  return value;
};

export const EntitiesContextProvider = (props: PropsWithChildren<{}>) => {
  const { isLoading, value: entities, dispatch } = useAsync(api.listEntities);

  useEffect(() => {
    dispatch();
  }, [dispatch]);

  const value = useMemo(() => {
    const request = (_: EntityFilter) => {
      dispatch();
    };

    return { isLoading, entities: entities?.data ?? [], request };
  }, [isLoading, entities, dispatch]);

  return (
    <EntitiesContext.Provider value={value}>
      {props.children}
    </EntitiesContext.Provider>
  );
};

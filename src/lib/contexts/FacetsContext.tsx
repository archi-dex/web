import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { api, Facet } from "~/lib/api";
import { useAsync } from "~/lib/hooks/useAsync";

export interface FacetsContextValue {
  isLoading: boolean;
  facets: Facet[];
  refresh: () => void;
}

export const FacetsContext =
  createContext<FacetsContextValue | undefined>(undefined);

export const useFacetsContext = () => {
  const value = useContext(FacetsContext);
  if (!value) {
    throw new Error("FacetsContext consumer does not have a matching provider");
  }

  return value;
};

export const FacetsContextProvider = (props: PropsWithChildren<{}>) => {
  const { isLoading, value: facets, dispatch } = useAsync(api.listFacets);

  useEffect(() => {
    dispatch();
  }, [dispatch]);

  const value = useMemo(() => {
    const refresh = () => {
      dispatch();
    };

    return { isLoading, facets: facets?.data ?? [], refresh };
  }, [isLoading, facets, dispatch]);

  return (
    <FacetsContext.Provider value={value}>
      {props.children}
    </FacetsContext.Provider>
  );
};

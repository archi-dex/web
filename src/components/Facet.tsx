import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { api } from "~/lib/api";
import { useFacetsContext } from "~/lib/contexts/FacetsContext";

import { SortDirectionIcon } from "./inputs/SortDirectionIcon";

export interface FacetProps {
  id?: string;
  keyName: string;
}

export const Facet = ({ id, keyName }: FacetProps) => {
  const { isLoading, facets, refresh } = useFacetsContext();
  const facet = facets.find(
    (facet) => facet.id === id || facet.key === keyName
  );
  const handleDelete =
    !isLoading && facet
      ? () => api.deleteFacet(facet.id).then(refresh)
      : undefined;

  return (
    <Chip
      onDelete={handleDelete}
      label={
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontFamily="monospace" fontSize={12}>
            {facet?.key ?? keyName}
          </Typography>

          {isLoading && <CircularProgress size={12} />}

          {!isLoading && facet && (
            <SortDirectionIcon direction={facet.sort} fontSize="small" />
          )}
        </Stack>
      }
    />
  );
};

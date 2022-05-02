import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { match, P } from "ts-pattern";

import { Grow } from "~/components/Grow";
import { api } from "~/lib/api";
import { useFacetsContext } from "~/lib/contexts/FacetsContext";
import { useAsync } from "~/lib/hooks/useAsync";

import { Filter, SearchForm } from "./SearchForm";
import { SearchResult } from "./SearchResult";

export const Search = () => {
  const { isLoading: isLoadingFacets, facets } = useFacetsContext();
  const {
    isLoading: isLoadingEntities,
    value: entities,
    dispatch,
  } = useAsync(api.listEntities);

  const handleSearch = (filters: Filter[]) => {
    console.log(filters);
    dispatch();
  };

  return (
    <Stack p={2}>
      <Typography variant="h5">Search</Typography>

      <Paper sx={{ p: 2 }}>
        <Stack>
          {match({ loading: isLoadingFacets, facets })
            .with({ loading: true }, () => <LinearProgress />)
            .with(
              { loading: false, facets: P.when((v) => v.length) },
              ({ facets }) => (
                <SearchForm facets={facets} onSearch={handleSearch} />
              )
            )
            .otherwise(() => (
              <Stack direction="row">
                <PriorityHighIcon /> Unknown error ocurred
              </Stack>
            ))}
        </Stack>
      </Paper>

      {match({ loading: isLoadingEntities, entities: entities?.data })
        .with({ loading: true }, () => <LinearProgress />)
        .with({ loading: false, entities: P.nullish }, () => (
          <Grow center>
            <SearchOffIcon fontSize="small" /> No results
          </Grow>
        ))
        .with({ loading: false, entities: P.when((v) => v.length) }, () => (
          <SearchResult />
        ))
        .otherwise(() => (
          <Grow center>
            <QuestionMarkIcon fontSize="small" /> Unknown error occurred
          </Grow>
        ))}
    </Stack>
  );
};

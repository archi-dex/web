import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ChangeEventHandler, FormEventHandler, useMemo, useState } from "react";

import { Select, SelectProps } from "~/components/inputs/Select";
import { Facet } from "~/lib/api";
export interface Filter {
  key: string;
  value: string;
}

type FilterFormProps = {
  facets: Facet[];
  onSearch?: (filters: Filter[]) => void;
};

export const SearchForm = ({ facets, onSearch }: FilterFormProps) => {
  const facetOptions = useMemo(() => facets.map(({ key }) => key), [facets]);
  const [filters, setFilters] = useState<Filter[]>([
    { key: facetOptions[0], value: "" },
  ]);

  const handleSelect =
    (index: number): SelectProps["onChange"] =>
    (e) =>
      setFilters((filters) =>
        filters.map((filter, i) =>
          i === index ? { ...filter, key: e.target.value as string } : filter
        )
      );

  const handleValueChange =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) =>
      setFilters((filters) =>
        filters.map((filter, i) =>
          i === index ? { ...filter, value: e.target.value } : filter
        )
      );

  const handleAddFilter = () =>
    setFilters((filters) => [...filters, { key: facetOptions[0], value: "" }]);

  const handleRemoveFilter = (index: number) => () =>
    setFilters((filters) => filters.filter((_, i) => i !== index));

  const handleSearch: FormEventHandler = (e) => {
    e.preventDefault();
    onSearch?.(filters);
  };

  return (
    <form onSubmit={handleSearch}>
      <Stack>
        {filters.map((filter, i) => (
          <Stack key={i} direction="row">
            <Select
              sx={{ minWidth: "200px" }}
              options={facetOptions}
              label="Key"
              required
              value={filter.key}
              onChange={handleSelect(i)}
            />
            <TextField
              value={filter.value}
              label="Value"
              required
              onChange={handleValueChange(i)}
            />
            {i > 0 && (
              <IconButton sx={{ width: 56 }} onClick={handleRemoveFilter(i)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Stack>
        ))}

        <Stack direction="row" justifyContent="flex-end">
          <Button startIcon={<AddIcon />} onClick={handleAddFilter}>
            Add filter
          </Button>
          <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
            Search
          </Button>
          <Button color="secondary">Foo</Button>
          <Button variant="contained" color="secondary">
            Bar
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

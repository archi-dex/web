import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { ReactNode, useMemo } from "react";

import { Facet } from "~/components/Facet";
import { Entity } from "~/lib/api";
import { flatten } from "~/lib/flatten";
import { joinPath } from "~/lib/path";
import { distanceToNow, formatTimestamp } from "~/lib/time";

export interface SearchResultProps {
  entities: Entity[];
}

export const SearchResult = ({ entities }: SearchResultProps) => {
  const flattened = useMemo(
    () =>
      entities.map((entity) =>
        Object.entries(flatten(entity.attributes, "attributes"))
      ),
    [entities]
  );

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Path</TableCell>
            <TableCell>Attributes</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entities.map((entity, i) => (
            <TableRow key={entity._id}>
              <TableCell sx={{ verticalAlign: "top" }}>{entity._id}</TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                {joinPath(entity.dir, entity.base)}
              </TableCell>
              <TableCell>
                <Stack spacing={1}>
                  {flattened[i].map(([key, value]) => (
                    <Stack
                      key={key}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={1}
                    >
                      <Facet keyName={key} />
                      <Typography>{value as ReactNode}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                {formatTimestamp(entity.created_at)}
              </TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                {formatTimestamp(entity.updated_at)}
                {` (${distanceToNow(entity.updated_at)} ago)`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

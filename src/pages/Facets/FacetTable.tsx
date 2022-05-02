import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { SortDirectionIcon } from "~/components/inputs/SortDirectionIcon";
import { Facet } from "~/lib/api";

interface FacetTableProps {
  facets: Facet[];
  onDelete?: (id: string) => void;
}

export const FacetTable = ({ facets, onDelete }: FacetTableProps) => {
  const handleDelete = (id: string) => () => onDelete?.(id);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Key</TableCell>
          <TableCell>Sort</TableCell>
          <TableCell align="right">Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {facets.map((facet) => (
          <TableRow key={facet.id}>
            <TableCell>{facet.id}</TableCell>
            <TableCell>{facet.key}</TableCell>
            <TableCell>
              <SortDirectionIcon direction={facet.sort} />
            </TableCell>
            <TableCell align="right">
              <IconButton onClick={handleDelete(facet.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

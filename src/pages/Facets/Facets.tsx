import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import {
  CreateFacetDialog,
  CreateFacetDialogProps,
} from "~/components/forms/CreateFacetDialog";
import { api } from "~/lib/api";
import { useFacetsContext } from "~/lib/contexts/FacetsContext";
import { useNotifications } from "~/lib/contexts/NotificationContext";

import { FacetTable } from "./FacetTable";

export const Facets = () => {
  const { enqueue } = useNotifications();
  const { isLoading, facets, refresh } = useFacetsContext();
  const [open, setOpen] = useState(false);
  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);

  const handleDelete = async (id: string) => {
    try {
      await api.deleteFacet(id);
      enqueue(`Deleted facet: "${id}"`);
      refresh();
    } catch (error) {
      console.error(error);
      enqueue(`Failed to delete facet: "${id}"`, "error");
    }
  };

  const handleSubmit: CreateFacetDialogProps["onSubmit"] = async (facet) => {
    try {
      const result = await api.createFacet(facet);
      setOpen(false);
      enqueue(`Created facet: "${result.data.key}"`);
      refresh();
    } catch (error: any) {
      console.error(error);
      const reason = error.message ?? "an unknown error occurred";
      enqueue(`Failed to create facet: ${reason}`);
    }
  };

  return (
    <Stack p={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">Facets</Typography>
        <Tooltip title="Create Facet">
          <Button startIcon={<AddIcon />} onClick={openForm}>
            Create Facet
          </Button>
        </Tooltip>
      </Stack>

      <Paper>
        {isLoading && <LinearProgress />}

        {!isLoading && <FacetTable facets={facets} onDelete={handleDelete} />}

        <CreateFacetDialog
          open={open}
          onClose={closeForm}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Stack>
  );
};

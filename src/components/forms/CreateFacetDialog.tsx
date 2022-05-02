import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import { FormEventHandler, useState } from "react";

import {
  SortDirection,
  SortDirectionIcon,
} from "~/components/inputs/SortDirectionIcon";
import { Facet, FacetSortType } from "~/lib/api";

export interface CreateFacetDialogProps
  extends Omit<DialogProps, "onClose" | "onSubmit"> {
  onClose?: () => void;
  onSubmit?: (facet: Omit<Facet, "id">) => void;
}

export const CreateFacetDialog = ({
  onSubmit,
  onClose,
  ...props
}: CreateFacetDialogProps) => {
  const [key, setKey] = useState("");
  const [sort, setSort] = useState<SortDirection>(SortDirection.Asc);

  const handleClose = () => {
    setKey("");
    setSort(SortDirection.Asc);
    onClose?.();
  };

  const handleChangeKey: TextFieldProps["onChange"] = (e) =>
    setKey(e.target.value);

  const handleChangeSort: ToggleButtonGroupProps["onChange"] = (_, v) =>
    setSort(v);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const facetSort =
      sort === SortDirection.Asc ? FacetSortType.Asc : FacetSortType.Des;
    onSubmit?.({ key, sort: facetSort });
  };

  return (
    <Dialog {...props} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create Facet</DialogTitle>

        <DialogContent>
          <Stack pt={1} direction="row">
            <TextField label="Key" required onChange={handleChangeKey} />

            <ToggleButtonGroup
              value={sort}
              exclusive
              onChange={handleChangeSort}
            >
              <ToggleButton value={SortDirection.Asc}>
                <SortDirectionIcon direction={SortDirection.Asc} />
              </ToggleButton>
              <ToggleButton value={SortDirection.Des}>
                <SortDirectionIcon direction={SortDirection.Des} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

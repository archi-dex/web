import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { styled } from "@mui/material/styles";
import { ComponentProps } from "react";

import { FacetSortType } from "~/lib/api";

export enum SortDirection {
  Asc = "ascending",
  Des = "descending",
}

export interface SortDirectionIconProps
  extends ComponentProps<typeof ArrowUpwardIcon> {
  direction?: SortDirection | FacetSortType;
}

export const SortDirectionIcon = styled(
  ArrowUpwardIcon
)<SortDirectionIconProps>(({ direction }) => ({
  ...(direction === SortDirection.Des && { transform: "rotate(180deg)" }),
  ...(direction === FacetSortType.Des && { transform: "rotate(180deg)" }),
}));

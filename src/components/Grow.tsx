import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export interface GrowProps extends BoxProps {
  center?: boolean;
}

export const Grow = styled(Box, { name: "Grow" })<GrowProps>(({ center }) => ({
  width: "100%",
  height: "100%",
  ...(center && {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
}));

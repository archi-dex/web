import { darken, styled } from "@mui/material/styles";

export const Code = styled("pre")(({ theme }) => ({
  fontFamily: "monospace",
  margin: `0 ${theme.spacing(1)}`,
  padding: theme.spacing(0.7),
  borderRadius: theme.spacing(0.7),
  backgroundColor: darken("#FFFFFF", 0.1),
}));

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import { ComponentProps } from "react";

import { Grow } from "./Grow";

const DRAWER_WIDTH = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: `calc(${theme.spacing(7)} + 1px)`,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
});

export const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const DrawerSibling = styled(Grow)<
  ComponentProps<typeof Box> & { open?: boolean }
>(({ theme, open }) => ({
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["margin-left", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: theme.spacing(7),
    width: `calc(100% - ${theme.spacing(7)})`,
    transition: theme.transitions.create(["margin-left", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}));

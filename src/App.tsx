import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import { Drawer, DrawerSibling } from "./components/Drawer";
import { Grow } from "./components/Grow";
import { useFacetsContext } from "./lib/contexts/FacetsContext";
import { routes } from "./routes";

export const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen((state) => !state);
  const { isLoading: isLoadingFacets } = useFacetsContext();
  const { pathname } = useLocation();

  if (isLoadingFacets) {
    return (
      <Grow center margin={2} padding={2}>
        <LinearProgress />
      </Grow>
    );
  }

  return (
    <Grow>
      <Drawer variant="permanent" open={isDrawerOpen}>
        <Stack spacing={0}>
          <Box pl={1}>
            <IconButton onClick={toggleDrawer}>
              <ChevronRightIcon
                sx={[isDrawerOpen && { transform: "rotate(180deg)" }]}
              />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {routes
              .filter((route) => !route.hide)
              .map((route) => (
                <ListItemButton
                  key={route.path}
                  component={Link}
                  selected={pathname.includes(route.path)}
                  to={route.path}
                >
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText>{route.label}</ListItemText>
                </ListItemButton>
              ))}
          </List>
        </Stack>
      </Drawer>

      <DrawerSibling open={isDrawerOpen} component="main">
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </DrawerSibling>
    </Grow>
  );
};

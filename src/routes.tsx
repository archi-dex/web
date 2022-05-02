import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import SearchIcon from "@mui/icons-material/Search";
import TimerIcon from "@mui/icons-material/Timer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Navigate } from "react-router-dom";

import { Grow } from "./components/Grow";
import { Facets } from "./pages/facets";
import { Search } from "./pages/search";

const ComingSoon = () => (
  <Grow center>
    <Stack direction="row" alignItems="center">
      <TimerIcon />
      <Typography>Coming soon</Typography>
    </Stack>
  </Grow>
);

interface Route {
  path: string;
  label?: string;
  icon?: JSX.Element;
  element?: JSX.Element;
  hide?: boolean;
}

export const routes: Route[] = [
  {
    path: "/search",
    label: "Search",
    icon: <SearchIcon />,
    element: <Search />,
  },
  {
    path: "/facets",
    label: "Facets",
    icon: <BookmarksIcon />,
    element: <Facets />,
  },
  {
    path: "/entities",
    label: "Entities",
    icon: <FolderZipIcon />,
    element: <ComingSoon />,
  },
  {
    path: "/batch",
    label: "Batch operations",
    icon: <DeveloperBoardIcon />,
    element: <ComingSoon />,
  },
  {
    path: "*",
    element: <Navigate to="/search" />,
    hide: true,
  },
];

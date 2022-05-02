import CategoryIcon from "@mui/icons-material/Category";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import SearchIcon from "@mui/icons-material/Search";
import { Navigate } from "react-router-dom";

import { Entities } from "./pages/entities";
import { Facets } from "./pages/facets";
import { Search } from "./pages/search";

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
    icon: <CategoryIcon />,
    element: <Facets />,
  },
  {
    path: "/entities",
    label: "Entities",
    icon: <FolderZipIcon />,
    element: <Entities />,
  },
  {
    path: "*",
    element: <Navigate to="/search" />,
    hide: true,
  },
];

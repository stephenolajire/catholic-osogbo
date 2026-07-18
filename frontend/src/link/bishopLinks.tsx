import bishopRoutes from "../routes/bishopRoutes";

import LocalOrdinary from "../pages/parishioners/bishop/LocalOrdinary";
import Messages from "../pages/parishioners/bishop/Messages";
import CoatOfArm from "../pages/parishioners/bishop/CoatOfArm";
import DiscoverDetail from "../pages/DiscoverDetail";

const bishopLinks = [
  { path: bishopRoutes.localOrdinary, element: <LocalOrdinary /> },
  { path: bishopRoutes.messages, element: <Messages /> },
  { path: bishopRoutes.coatOfArm, element: <CoatOfArm /> },
  { path: bishopRoutes.discoverDetail, element: <DiscoverDetail /> },
];

export default bishopLinks;

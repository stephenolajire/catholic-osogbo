import administrationRoutes from "../routes/administrationRoutes";

import Posts from "../pages/parishioners/administration/Posts";
import Commissions from "../pages/parishioners/administration/Commissions";
import Synod from "../pages/parishioners/administration/Synod";

const administrationLinks = [
  { path: administrationRoutes.posts, element: <Posts /> },
  { path: administrationRoutes.commissions, element: <Commissions /> },
  { path: administrationRoutes.synod, element: <Synod /> },
];

export default administrationLinks;

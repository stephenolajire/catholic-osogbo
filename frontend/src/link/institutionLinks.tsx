import institutionRoutes from "../routes/institutionRoutes";

import ReligiousCommunities from "../pages/parishioners/institutions/ReligiousCommunities";
import FormationCentres from "../pages/parishioners/institutions/FormationCentres";
import Education from "../pages/parishioners/institutions/Education";
import VocationalCentres from "../pages/parishioners/institutions/VocationalCentres";
import Bookshops from "../pages/parishioners/institutions/Bookshops";
import HealthCare from "../pages/parishioners/institutions/HealthCare";

const institutionLinks = [
  {
    path: institutionRoutes.religiousCommunities,
    element: <ReligiousCommunities />,
  },
  { path: institutionRoutes.formationCentres, element: <FormationCentres /> },
  { path: institutionRoutes.education, element: <Education /> },
  { path: institutionRoutes.vocationalCentres, element: <VocationalCentres /> },
  { path: institutionRoutes.bookshops, element: <Bookshops /> },
  { path: institutionRoutes.healthCare, element: <HealthCare /> },
];

export default institutionLinks;

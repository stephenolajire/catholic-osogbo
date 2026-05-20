import aboutRoutes from "../routes/aboutRoutes";

import Priest from "../pages/parishioners/about/Priest";
import Projects from "../pages/parishioners/about/Projects";
import Parishes from "../pages/parishioners/about/Parishes";
import LayFaithful from "../pages/parishioners/about/LayFaithful";
import DeaneryStructure from "../pages/parishioners/about/DeaneryStructure";

const aboutLinks = [
  { path: aboutRoutes.priest, element: <Priest /> },
  { path: aboutRoutes.projects, element: <Projects /> },
  { path: aboutRoutes.parishes, element: <Parishes /> },
  { path: aboutRoutes.layFaithful, element: <LayFaithful /> },
  { path: aboutRoutes.deaneryStructure, element: <DeaneryStructure /> },
];

export default aboutLinks;

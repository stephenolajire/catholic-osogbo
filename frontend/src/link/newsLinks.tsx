import newsRoutes from "../routes/newsRoutes";

import Gallery from "../pages/parishioners/news/Gallery";
import Katolink from "../pages/parishioners/news/Katolink";
import Videos from "../pages/parishioners/news/Videos";
import Podcasts from "../pages/parishioners/news/Podcasts";

const newsLinks = [
  { path: newsRoutes.gallery, element: <Gallery /> },
  { path: newsRoutes.katolink, element: <Katolink /> },
  { path: newsRoutes.videos, element: <Videos /> },
  { path: newsRoutes.podcasts, element: <Podcasts /> },
];

export default newsLinks;

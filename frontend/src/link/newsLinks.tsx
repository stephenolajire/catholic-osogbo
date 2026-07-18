import newsRoutes from "../routes/newsRoutes";

import Headlines from "../pages/parishioners/news/Headlines";
import NewsDetail from "../pages/parishioners/news/NewsDetail";
import Videos from "../pages/parishioners/news/Videos";
import Podcasts from "../pages/parishioners/news/Podcasts";
import Gallery from "../pages/parishioners/news/Gallery";

const newsLinks = [
  { path: newsRoutes.headlines, element: <Headlines /> },
  { path: newsRoutes.newsDetail, element: <NewsDetail /> },
  { path: newsRoutes.videos, element: <Videos /> },
  { path: newsRoutes.podcasts, element: <Podcasts /> },
  { path: newsRoutes.gallery, element: <Gallery /> },
];

export default newsLinks;

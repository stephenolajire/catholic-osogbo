import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./layout/Parishioners";

// Links
import aboutLinks from "./link/aboutLinks";
import bishopLinks from "./link/bishopLinks";
import administrationLinks from "./link/administrationLinks";
import newsLinks from "./link/newsLinks";
import institutionLinks from "./link/institutionLinks";

// General pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Merge all section links
const allLinks = [
  ...aboutLinks,
  ...bishopLinks,
  ...administrationLinks,
  ...newsLinks,
  ...institutionLinks,
];

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {/* General */}
            <Route index element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />

            {/* All section routes — generated from link files */}
            {allLinks.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>

          {/* 404 — outside layout so it's full screen */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

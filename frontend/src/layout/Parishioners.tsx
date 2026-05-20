import { Outlet } from "react-router-dom";
import DesktopNav from "../nav/parishioners/DesktopNav";
import MobileNav from "../nav/parishioners/MobileNav";
import Footer from "../nav/parishioners/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DesktopNav />
      <MobileNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

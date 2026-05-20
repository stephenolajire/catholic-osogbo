import { NavLink, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

import aboutRoutes from "../../routes/aboutRoutes";
import bishopRoutes from "../../routes/bishopRoutes";
import administrationRoutes from "../../routes/administrationRoutes";
import newsRoutes from "../../routes/newsRoutes";
import institutionRoutes from "../../routes/institutionRoutes";

type ChildItem = {
  label: string;
  to: string;
};

type NavItem = {
  label: string;
  to?: string;
  children?: ChildItem[];
};

const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    children: [
      { label: "Priest", to: aboutRoutes.priest },
      { label: "Projects", to: aboutRoutes.projects },
      { label: "Parishes", to: aboutRoutes.parishes },
      { label: "Lay Faithful", to: aboutRoutes.layFaithful },
      { label: "Deanery Structure", to: aboutRoutes.deaneryStructure },
    ],
  },
  {
    label: "Bishop",
    children: [
      { label: "Our Local Ordinary", to: bishopRoutes.localOrdinary },
      { label: "Bishop's Messages", to: bishopRoutes.messages },
      { label: "Episcopal Coat of Arm", to: bishopRoutes.coatOfArm },
    ],
  },
  {
    label: "Administration",
    children: [
      { label: "Administration & Posts", to: administrationRoutes.posts },
      { label: "Diocesan Commissions", to: administrationRoutes.commissions },
      { label: "Diocesan Synod", to: administrationRoutes.synod },
    ],
  },
  {
    label: "News & Events",
    children: [
      { label: "Gallery", to: newsRoutes.gallery },
      { label: "Katolink Newspaper", to: newsRoutes.katolink },
      { label: "Videos", to: newsRoutes.videos },
      { label: "Podcasts", to: newsRoutes.podcasts },
    ],
  },
  {
    label: "Institutions",
    children: [
      {
        label: "Religious Communities",
        to: institutionRoutes.religiousCommunities,
      },
      { label: "Formation Centres", to: institutionRoutes.formationCentres },
      { label: "Education", to: institutionRoutes.education },
      { label: "Vocational Centres", to: institutionRoutes.vocationalCentres },
      { label: "Diocesan Bookshops", to: institutionRoutes.bookshops },
      { label: "Health Care Centres", to: institutionRoutes.healthCare },
    ],
  },
];

const DropdownMenu = ({ item }: { item: NavItem }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider px-1 py-2 transition-colors duration-150
          ${open ? "text-primary-600" : "text-neutral-700 hover:text-primary-600"}`}
      >
        {item.label}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180 text-primary-600" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-56 bg-white border border-border rounded-xl shadow-lg overflow-hidden z-50">
          <div className="h-0.5 w-full bg-primary-500" />
          <ul className="py-1">
            {item.children?.map((child) => (
              <li key={child.to}>
                <NavLink
                  to={child.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-150 border-l-2
                    ${
                      isActive
                        ? "bg-primary-50 text-primary-700 border-primary-500"
                        : "text-neutral-600 hover:bg-primary-50 hover:text-primary-700 border-transparent"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isActive ? "bg-primary-500" : "bg-neutral-300"
                        }`}
                      />
                      {child.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const DesktopNav = () => {
  return (
    <nav className="hidden lg:flex justify-between items-center w-full h-20 px-8 bg-white shadow-sm border-b border-border sticky top-0 z-40">
      {/* Logo */}
      <div className="shrink-0">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-14 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-3 xl:gap-6">
        {navItems.map((item) =>
          item.children ? (
            <DropdownMenu key={item.label} item={item} />
          ) : (
            <NavLink
              key={item.label}
              to={item.to!}
              className={({ isActive }) =>
                `text-xs font-semibold uppercase tracking-wider px-1 py-2 transition-colors duration-150
                ${
                  isActive
                    ? "text-primary-600"
                    : "text-neutral-700 hover:text-primary-600"
                }`
              }
            >
              {item.label}
            </NavLink>
          ),
        )}
      </div>

      {/* CTA buttons */}
      <div className="flex items-center gap-3 shrink-0">
        <Link
          to="/contact"
          className="text-xs font-semibold text-primary-600 border border-primary-500 px-4 py-2 rounded-full hover:bg-primary-50 transition-colors duration-150 whitespace-nowrap"
        >
          Get In Touch
        </Link>
        <Link
          to="/register"
          className="text-xs font-semibold text-white bg-primary-600 px-4 py-2 rounded-full hover:bg-primary-700 transition-colors duration-150 shadow-sm whitespace-nowrap"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default DesktopNav;

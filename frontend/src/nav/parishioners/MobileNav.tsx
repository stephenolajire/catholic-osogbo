import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ChevronDown, X, Menu } from "lucide-react";

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

// ── Accordion item ────────────────────────────────────────
const AccordionItem = ({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Auto-close accordion when navigating
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Highlight parent if any child is active
  const isParentActive = item.children?.some(
    (child) => location.pathname === child.to,
  );

  return (
    <div className="border-b border-neutral-100 last:border-none">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between w-full px-5 py-4 text-sm font-semibold uppercase tracking-wider transition-colors duration-150
          ${isParentActive ? "text-primary-600" : "text-neutral-700"}`}
      >
        <span>{item.label}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${open ? "rotate-180 text-primary-500" : "text-neutral-400"}`}
        />
      </button>

      {/* Accordion panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="bg-neutral-50 border-t border-neutral-100">
          {item.children?.map((child, i) => (
            <li key={child.to}>
              <NavLink
                to={child.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-150 border-l-2
                  ${
                    isActive
                      ? "bg-primary-50 text-primary-700 border-primary-500"
                      : "text-neutral-500 hover:text-primary-600 hover:bg-primary-50 border-transparent"
                  }`
                }
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
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
    </div>
  );
};

// ── MobileNav ─────────────────────────────────────────────
const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ── Top bar (mobile only) ── */}
      <header className="lg:hidden flex items-center justify-between w-full h-16 px-4 bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)}>
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Hamburger / Close */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="flex items-center justify-center w-10 h-10 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors duration-150"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setOpen(false)}
        className={`lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── Drawer ── */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-75 bg-white z-50 flex flex-col
          shadow-2xl transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <Link to="/" onClick={() => setOpen(false)}>
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-xl text-neutral-500 hover:bg-neutral-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Green accent line */}
        <div className="h-0.5 w-full bg-primary-500" />

        {/* Nav items — scrollable */}
        <nav className="flex-1 overflow-y-auto">
          {/* Home link */}
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 text-sm font-semibold uppercase tracking-wider border-b border-neutral-100 transition-colors
              ${isActive ? "text-primary-600 bg-primary-50" : "text-neutral-700 hover:text-primary-600"}`
            }
          >
            Home
          </NavLink>

          {/* Accordion items */}
          {navItems
            .filter((item) => item.children)
            .map((item) => (
              <AccordionItem
                key={item.label}
                item={item}
                onClose={() => setOpen(false)}
              />
            ))}
        </nav>

        {/* CTA buttons pinned to bottom */}
        <div className="p-4 border-t border-neutral-100 flex flex-col gap-3">
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="text-sm font-semibold text-primary-600 border border-primary-500 px-4 py-2.5 rounded-full text-center hover:bg-primary-50 transition-colors duration-150"
          >
            Get In Touch
          </Link>
          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="text-sm font-semibold text-white bg-primary-600 px-4 py-2.5 rounded-full text-center hover:bg-primary-700 transition-colors duration-150 shadow-sm"
          >
            Register
          </Link>
        </div>
      </aside>
    </>
  );
};

export default MobileNav;

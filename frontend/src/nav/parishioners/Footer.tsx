import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

const pageLinks = [
  "Pastoral Mission Strategic Plan",
  "Protection of Minors",
  "Vocations",
  "Diocesan Administration",
  "Support Our Ongoing Diocesan Projects",
];

const externalLinks = [
  "St. Joseph Workshop Inisa",
  "Our Lady And St. Francis Catholic College Osogbo",
  "Our Lady & St. Gabriel Catholic College Osogbo",
  "JDPMC Osogbo",
  "St. Clare Catholic Nursery & Primary School Osogbo",
  "St. Kizito Catholic College",
  "Catholic Chaplaincy OAU",
];

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="px-6 md:px-16 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.8fr_1fr_1fr] gap-10">
          <div>
            {/* <h2 className="text-2xl font-bold mb-4">Catholic Diocese of Osogbo</h2> */}
            <div className="rounded-2xl overflow-hidden bg-white/5 mb-5">
              <img
                src="/logo.png"
                alt="Catholic Diocese of Osogbo"
                className="w-full max-w-48 h-32 object-contain p-5 -ml-16 md:ml-0"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-5">
              Pages
            </h3>
            <ul className="space-y-3">
              {pageLinks.map((item) => (
                <li key={item}>
                  <Link
                    to="/contact"
                    className="text-sm text-neutral-400 hover:text-primary-300 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-5">
              Contact us
            </h3>
            <div className="space-y-4 text-sm text-neutral-400">
              <p className="flex gap-3 leading-relaxed">
                <MapPin
                  size={17}
                  className="text-primary-400 shrink-0 mt-0.5"
                />
                <span>
                  Bishop's House, P.O. Box 78,
                  <br />
                  Oke-Ayepe, Osogbo,
                  <br />
                  Osun State, Nigeria
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={17} className="text-primary-400" />
                <span>0(810) 558 4018</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail size={17} className="text-primary-400" />
                <span>contact@catholicdioceseosogbo.org</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-5">
              External Links
            </h3>
            <ul className="space-y-3">
              {externalLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-neutral-400 hover:text-primary-300 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-16 lg:px-24 py-5">
        <div className="max-w-7xl mx-auto text-sm text-neutral-500">
          © {new Date().getFullYear()} Catholic Diocese of Osogbo. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

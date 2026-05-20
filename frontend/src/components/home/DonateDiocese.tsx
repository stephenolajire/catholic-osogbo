import { HeartHandshake, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const DonateDiocese = () => {
  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto bg-primary-600 rounded-3xl overflow-hidden grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-8 md:p-12 lg:p-16 text-white">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
            <HeartHandshake size={28} />
          </div>
          <span className="text-primary-100 text-xs font-semibold uppercase tracking-widest">Support the Mission</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-5">Donate to the Diocese</h2>
          <p className="text-white/80 leading-relaxed max-w-2xl mb-8">
            Your generosity helps sustain pastoral care, formation, education, charity, and ongoing diocesan projects across Osogbo.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-full text-sm font-bold hover:bg-primary-50 transition-colors">
            Support Our Ongoing Diocesan Projects <ArrowRight size={16} />
          </Link>
        </div>
        <div className="min-h-80">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000&q=80"
            alt="Diocesan outreach"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default DonateDiocese;

import { Mic2, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecentSermons } from "../../hooks/home/useRecentSermons";
import type { RecentSermon as RecentSermonType } from "../../services/home/recentSermonService";

const DEFAULT_SERMONS: RecentSermonType[] = [
  {
    id: "1",
    title: "Remain in My Love",
    preacher: "Most Rev. John Akin Oyejola",
    date: "May 17, 2026",
    excerpt: "A reflection on Christian love, obedience, and the joy that flows from communion with Christ.",
    imageUrl: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=900&q=80",
    link: "/news/videos",
  },
  {
    id: "2",
    title: "Sent to Bear Fruit",
    preacher: "Rev. Fr. Diocesan Clergy",
    date: "May 10, 2026",
    excerpt: "The mission of every baptized Christian is to witness to Christ in family, parish, and society.",
    imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=900&q=80",
    link: "/news/podcasts",
  },
];

const RecentSermon = () => {
  const { data, isLoading, isError } = useRecentSermons();
  const sermons = (!isLoading && !isError && Array.isArray(data) && data.length) ? data : DEFAULT_SERMONS;

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-0.5 bg-primary-500" />
          <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">Homilies</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-10">Recent Sermons</h2>

        <div className="grid lg:grid-cols-2 gap-6">
          {sermons.map((sermon) => (
            <Link key={sermon.id} to={sermon.link} className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid md:grid-cols-[220px_1fr]">
              <img src={sermon.imageUrl} alt={sermon.title} className="h-56 md:h-full w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
                  <Mic2 size={13} />
                  <span>{sermon.preacher}</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600">{sermon.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-5">{sermon.excerpt}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 text-neutral-400"><Calendar size={13} />{sermon.date}</span>
                  <span className="inline-flex items-center gap-1.5 text-primary-600 font-semibold">Listen <ArrowRight size={14} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentSermon;

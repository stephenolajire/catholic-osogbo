import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecentNews } from "../../hooks/home/useRecentNews";
import type { RecentNewsItem } from "../../services/home/recentNewsService";

const DEFAULT_NEWS: RecentNewsItem[] = [
  {
    id: "1",
    title: "Diocese Announces Renewed Pastoral Outreach",
    excerpt: "Parishes across the diocese are invited to strengthen evangelisation, charity, and family life programmes.",
    imageUrl: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=900&q=80",
    date: "May 12, 2026",
    category: "Diocese",
    link: "/news/katolink",
  },
  {
    id: "2",
    title: "Youth Apostolate Holds Faith Formation Weekend",
    excerpt: "Young Catholics gathered for prayer, teaching, fellowship, and renewed commitment to Christian witness.",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
    date: "May 6, 2026",
    category: "Youth",
    link: "/news/gallery",
  },
  {
    id: "3",
    title: "Catholic Schools Celebrate Academic Excellence",
    excerpt: "The diocesan education family continues its mission of forming students in truth, discipline, and service.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
    date: "April 29, 2026",
    category: "Education",
    link: "/institutions/education",
  },
];

const RecentNews = () => {
  const { data, isLoading, isError } = useRecentNews();
  const news = (!isLoading && !isError && Array.isArray(data) && data.length) ? data : DEFAULT_NEWS;

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-primary-500" />
              <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">Latest Updates</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Recent News</h2>
          </div>
          <Link to="/news/katolink" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary-600">
            View All <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item) => (
            <Link key={item.id} to={item.link} className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-56 overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                  <Calendar size={12} />
                  <span>{item.date}</span>
                  <span className="text-primary-600 font-semibold">{item.category}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 leading-snug mb-2 group-hover:text-primary-600">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentNews;

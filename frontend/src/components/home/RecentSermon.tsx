import { Mic2, Calendar } from "lucide-react";
import { useRecentSermons } from "../../hooks/home/useRecentSermons";
import { type RecentSermon as RecentSermonType } from "../../services/home/recentSermonService";

const DEFAULT_SERMONS: RecentSermonType[] = [
  {
    id: "1",
    title: "Remain in My Love",
    preacher: "Most Rev. John Akin Oyejola",
    date: "May 17, 2026",
    excerpt:
      "A reflection on Christian love, obedience, and the joy that flows from communion with Christ.",
    imageUrl:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=900&q=80",
    link: "/news/videos",
    fullMessage: `In today's Gospel, Jesus tells His disciples, "Remain in my love." This is not merely an invitation but a profound call to a deeper relationship with Christ. Through our baptism, we are grafted into the vine of Christ, becoming branches that bear fruit through our connection to the source of life itself.

Love, as defined by Christ, is self-sacrificial and transformative. It demands that we lay down our lives for one another, just as He laid down His life for our redemption. This love is not sentimental or passing; it is rooted in the eternal will of the Father and expressed through the Holy Spirit working in our hearts.

To remain in His love means to keep His commandments, for obedience is the expression of genuine love. When we follow Christ's teachings with sincerity and dedication, we demonstrate our commitment to His kingdom. This obedience brings us closer to the heart of God and allows us to experience the fullness of joy that only Christ can provide.

As a Diocese, we must cultivate this spirit of remaining in Christ's love through prayer, the sacraments, and service to one another. In doing so, we become living witnesses to the transforming power of the Gospel in our families, parishes, and communities. Let us embrace this call with renewed commitment and allow Christ's love to reshape our lives.`,
  },
];

const RecentSermon = () => {
  const { data, isLoading, isError } = useRecentSermons();
  const sermons =
    !isLoading && !isError && Array.isArray(data) && data.length
      ? data
      : DEFAULT_SERMONS;
  const currentSermon = sermons[0];

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-12">
          Recent Sermon
        </h2>

        {/* Main sermon layout */}
        <div className="grid lg:grid-cols-5 gap-8 h-125 border border-gray-200 rounded-xl overflow-hidden">
          {/* Left: Summary */}
          <div className="lg:col-span-2 bg-gray-50 p-8 flex flex-col">
            {/* Image */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-md">
              <img
                src={currentSermon.imageUrl}
                alt={currentSermon.title}
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-serif font-bold text-black mb-4 leading-tight">
              {currentSermon.title}
            </h3>

            {/* Preacher */}
            <div className="flex items-center gap-2 mb-3 text-gray-700">
              <Mic2 size={16} />
              <span className="font-semibold text-sm">
                {currentSermon.preacher}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 mb-6 text-gray-500 text-sm">
              <Calendar size={16} />
              <span>{currentSermon.date}</span>
            </div>

            {/* Excerpt */}
            <p className="text-gray-700 text-sm leading-relaxed font-light flex-grow">
              {currentSermon.excerpt}
            </p>
          </div>

          {/* Right: Full sermon message - Scrollable */}
          <div className="lg:col-span-3 bg-white p-8 overflow-y-auto border-l border-gray-200">
            <div className="space-y-6 pr-4">
              {currentSermon.fullMessage
                ?.split("\n\n")
                .map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-gray-800 text-base leading-relaxed font-light"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentSermon;

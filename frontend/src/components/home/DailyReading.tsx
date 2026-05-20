import { BookOpen, Cross } from "lucide-react";
import { useDailyReading } from "../../hooks/home/useDailyReading";
import type { DailyReading as DailyReadingType } from "../../services/home/dailyReadingService";

const DEFAULT_READING: DailyReadingType = {
  id: "default",
  title: "Daily Reading",
  date: "Today",
  firstReading: "Acts 20:28-38",
  psalm: "Psalm 68:29-30, 33-36",
  gospel: "John 17:11-19",
  reflection: "Consecrate them in the truth. The word of God strengthens us to live faithfully and serve generously.",
};

const DailyReading = () => {
  const { data, isLoading, isError } = useDailyReading();
  const reading = (!isLoading && !isError && data) ? data : DEFAULT_READING;

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-primary-950 text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.7fr_1.3fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-6">
            <BookOpen size={26} />
          </div>
          <span className="block text-primary-300 text-xs font-semibold uppercase tracking-widest mb-3">{reading.date}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{reading.title}</h2>
          <p className="text-white/70 leading-relaxed">{reading.reflection}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["First Reading", reading.firstReading],
            ["Responsorial Psalm", reading.psalm],
            ["Gospel", reading.gospel],
          ].map(([label, value]) => (
            <div key={label} className="bg-white/8 border border-white/10 rounded-2xl p-5">
              <Cross size={18} className="text-primary-300 mb-4" />
              <p className="text-primary-200 text-xs font-semibold uppercase tracking-widest mb-2">{label}</p>
              <p className="text-lg font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyReading;

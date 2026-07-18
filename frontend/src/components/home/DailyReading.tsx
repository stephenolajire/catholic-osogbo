import { useState } from "react";
import { BookOpen, Cross } from "lucide-react";
import { useDailyReading } from "../../hooks/home/useDailyReading";
import type { DailyReading as DailyReadingType } from "../../services/home/dailyReadingService";

const DEFAULT_READING: DailyReadingType = {
  id: "default",
  title: "Daily Reading",
  date: "Today",
  firstReading: {
    reference: "Acts 20:28-38",
    text: "Paul said to the elders of Ephesus: 'Keep watch over yourselves and over all the flock of which the Holy Spirit has made you overseers, to shepherd the church of God that he obtained with the blood of his own Son. I know that after I have gone, savage wolves will come in among you, not sparing the flock. Some even from your own group will come distorting the truth to entice the disciples to follow them. Therefore be alert, remembering that for three years I did not cease night or day to warn everyone with tears.'",
  },
  responsorialPsalm: {
    reference: "Psalm 68:29-30, 33-36",
    text: "Sing to God, O kingdoms of the earth; sing praises to the Lord. Extol him who rides upon the heavens, the ancient heavens; listen, he sends forth his voice, his mighty voice.",
  },
  gospel: {
    reference: "John 17:11-19",
    text: "Jesus said to his disciples: 'And now I am no longer in the world, but they are in the world, and I am coming to you. Holy Father, protect them in your name that you have given me, so that they may be one, as we are one. While I was with them, I protected them in your name that you have given me. I have guarded them, and not one of them has been lost except the one destined to be lost, so that the scripture might be fulfilled.'",
  },
  reflection:
    "Consecrate them in the truth. The word of God strengthens us to live faithfully and serve generously.",
};

const DailyReading = () => {
  const { data, isLoading, isError } = useDailyReading();
  const reading = !isLoading && !isError && data ? data : DEFAULT_READING;

  const readings = [
    reading.firstReading
      ? { label: "First Reading", ...reading.firstReading }
      : null,
    reading.secondReading
      ? { label: "Second Reading", ...reading.secondReading }
      : null,
    { label: "Responsorial Psalm", ...reading.responsorialPsalm },
    { label: "Gospel", ...reading.gospel },
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  const [activeLabel, setActiveLabel] = useState(readings[0]?.label ?? "");
  const activeReading =
    readings.find((r) => r.label === activeLabel) ?? readings[0];

  const isGospel = activeReading?.label === "Gospel";

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-0.5 bg-neutral-700" />
            <span className="text-neutral-600 text-xs font-semibold uppercase tracking-widest">
              {reading.date}
            </span>
          </div>

          <div className="flex items-start gap-5">
            <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-900 shrink-0 mt-1">
              <BookOpen size={24} className="text-neutral-200" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-5">
                {reading.title}
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed max-w-3xl font-light">
                {reading.reflection}
              </p>
            </div>
          </div>
        </div>

        {/* Reading selector buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {readings.map((item) => {
            const isActive = item.label === activeLabel;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveLabel(item.label)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                <Cross
                  size={14}
                  className={isActive ? "text-neutral-300" : "text-neutral-400"}
                />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Active reading card */}
        {activeReading && (
          <div
            className={`rounded-2xl overflow-hidden border shadow-sm ${
              isGospel
                ? "bg-neutral-900 border-neutral-800"
                : "bg-white border-neutral-200"
            }`}
          >
            <div className="p-6 pb-5">
              <div className="flex items-start gap-3 mb-4">
                <Cross
                  size={20}
                  className={`flex-shrink-0 mt-0.5 ${isGospel ? "text-neutral-300" : "text-neutral-600"}`}
                />
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-widest ${
                      isGospel ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    {activeReading.label}
                  </p>
                  <p
                    className={`font-serif font-bold text-base md:text-lg mt-1.5 leading-tight ${
                      isGospel ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {activeReading.reference}
                  </p>
                </div>
              </div>
              <span
                className={`block h-px w-12 rounded-full ${
                  isGospel ? "bg-neutral-600" : "bg-neutral-300"
                }`}
              />
            </div>

            <div className="px-6 pb-6 max-h-96 overflow-y-auto">
              <p
                className={`leading-relaxed font-light whitespace-pre-wrap ${
                  isGospel
                    ? "text-neutral-300 text-base md:text-lg font-serif"
                    : "text-neutral-700 text-sm md:text-base"
                }`}
              >
                {activeReading.text}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyReading;

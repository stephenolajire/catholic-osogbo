import { CalendarDays, Clock, MapPin } from "lucide-react";
import { useUpcomingEvents } from "../../hooks/home/useUpcomingEvents";
import type { UpcomingEventItem } from "../../services/home/upcomingEventService";

const DEFAULT_EVENTS: UpcomingEventItem[] = [
  {
    id: "1",
    title: "Diocesan Marian Pilgrimage",
    location: "Diocesan Pilgrimage Centre",
    date: "June 8, 2026",
    time: "9:00 AM",
    description: "A day of prayer, procession, confession, and Holy Mass for all parishes.",
  },
  {
    id: "2",
    title: "Priestly Ordination Anniversary Mass",
    location: "St. Benedict Cathedral, Osogbo",
    date: "June 21, 2026",
    time: "10:00 AM",
    description: "Thanksgiving Mass with priests, religious, lay faithful, and diocesan societies.",
  },
  {
    id: "3",
    title: "Catechists Formation Workshop",
    location: "Bishop's House, Oke-Ayepe",
    date: "July 4, 2026",
    time: "8:30 AM",
    description: "Formation and pastoral training for catechists serving across the diocese.",
  },
];

const UpcomingEvent = () => {
  const { data, isLoading, isError } = useUpcomingEvents();
  const events = (!isLoading && !isError && Array.isArray(data) && data.length) ? data : DEFAULT_EVENTS;

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-0.5 bg-primary-500" />
            <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">Calendar</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Upcoming Events</h2>
          <p className="text-neutral-500 leading-relaxed">Join the diocesan family in worship, formation, service, and community life.</p>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <article key={event.id} className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5 flex flex-col md:flex-row gap-5">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                <CalendarDays size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{event.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">{event.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
                  <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} />{event.date}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock size={13} />{event.time}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin size={13} />{event.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvent;

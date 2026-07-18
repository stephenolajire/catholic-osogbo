import { MapPin, Mail, Phone, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=80"
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-b from-stone-950/80 via-stone-950/70 to-stone-950/90" />
        </div>

        <div className="relative px-6 py-24 text-center md:px-16 lg:px-24 lg:py-28">
          <div className="mx-auto flex max-w-2xl flex-col items-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-stone-300">
              Reach the Parish Office
            </span>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg font-light leading-relaxed text-stone-300">
              Whether it's a prayer request, a question about the sacraments, or
              a word of encouragement — we're glad to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="px-6 py-20 md:px-16 lg:px-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Send a Message
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
              We'd Love to Hear From You
            </h2>
            <p className="mt-4 max-w-xl text-neutral-500">
              Fill out the form below and a member of our parish team will
              respond within one to two business days. For urgent pastoral
              needs, please call the office directly.
            </p>

            <form className="mt-8 space-y-5 border-t border-neutral-100 pt-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Parish / Group
                  </label>
                  <input
                    type="text"
                    placeholder="Optional"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                  Subject
                </label>
                <select className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:bg-white">
                  <option>Prayer request</option>
                  <option>Sacraments & baptism inquiry</option>
                  <option>Wedding or funeral arrangements</option>
                  <option>Volunteering</option>
                  <option>General inquiry</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                <Send size={15} />
                Send Message
              </button>
            </form>
          </div>

          {/* Info card */}
          <div className="relative overflow-hidden rounded-3xl bg-stone-900 p-8 text-white">
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              Parish Details
            </span>
            <h3 className="mt-3 font-serif text-2xl font-bold leading-snug">
              We're Here Whenever You Need Us
            </h3>

            <div className="mt-7 space-y-6 border-t border-white/10 pt-7">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <MapPin size={17} className="text-stone-200" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                    Parish Office
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-200">
                    12 Cathedral Close, Oke-Ayepe
                    <br />
                    Osogbo, Osun State
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Mail size={17} className="text-stone-200" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                    Email Us
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-200">
                    parishoffice@diocese.org
                    <br />
                    prayerrequests@diocese.org
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Phone size={17} className="text-stone-200" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                    Call the Office
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-200">
                    +234 802 000 1234
                    <br />
                    Mon–Fri, 9am – 4pm
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
                Follow Us
              </p>
              {/* <div className="flex gap-2.5">
                {[].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-stone-200 transition hover:bg-white/20"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-6 pb-20 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-neutral-100">
          <iframe
            title="Parish location"
            src="https://www.google.com/maps?q=Osogbo,Osun+State,Nigeria&output=embed"
            className="h-96 w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;

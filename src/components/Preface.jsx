import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';
import { metaInfo, prefaceImage, prefaceParagraphs } from '../mock';

const Preface = () => (
  <section id="preface" className="px-4 sm:px-6 py-14 sm:py-28">
    <div className="max-w-[1120px] mx-auto">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="font-serif-display section-title text-[clamp(48px,7vw,96px)] page-title">
          Preface
        </h2>
        <p className="font-serif-title italic section-subtitle text-[clamp(16px,1.6vw,22px)] mt-2">
          A note before the work
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Portrait */}
        <div className="preface-image">
          <img src={prefaceImage} alt="Portrait" loading="lazy" />
        </div>

        {/* Bio copy */}
        <div className="flex flex-col gap-5 pt-2">
          {prefaceParagraphs.map((p, i) => (
            <p key={i} className="text-[17px] leading-[1.65] body-text">
              {p.plain}
              {p.link && (
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-link"
                >
                  {p.link.text}
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </a>
              )}
              {p.after}
            </p>
          ))}

          {/* Meta chips */}
          <div className="flex items-center gap-6 pt-6">
            <div className="meta-chip flex items-center gap-1.5">
              <MapPin size={13} strokeWidth={1.8} />
              {metaInfo.location}
            </div>
            <div className="meta-chip flex items-center gap-1.5">
              <Calendar size={13} strokeWidth={1.8} />
              {metaInfo.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Preface;

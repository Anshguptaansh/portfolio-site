import { MapPin } from 'lucide-react';
import { experience } from '../mock';

const Experience = () => (
  <section id="experience" className="px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24">
    <div className="max-w-[1200px] mx-auto">

      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="font-serif-display section-title text-[clamp(48px,7vw,96px)] page-title">
          Experience
        </h2>
        <p className="font-serif-title italic section-subtitle text-[clamp(16px,1.6vw,22px)] mt-2">
          Where I've worked and what I built there.
        </p>
      </div>

      {/* Entries */}
      <div className="exp-list max-w-[860px] mx-auto">
        {experience.map((job, i) => (
          <div key={i} className="exp-entry">

            {/* Top row — company + period */}
            <div className="exp-header">
              <div className="exp-header-left">
                <div className="exp-company-row">
                  <span className="exp-company">{job.company}</span>
                  <span className="exp-type">{job.type}</span>
                </div>
                <div className="exp-role">{job.role}</div>
                <div className="exp-meta">
                  <MapPin size={12} strokeWidth={1.8} />
                  {job.location}
                </div>
              </div>
              <span className="exp-period">{job.period}</span>
            </div>

            {/* Summary */}
            <p className="exp-summary">{job.summary}</p>

            {/* Highlights */}
            <div className="exp-highlights">
              {job.highlights.map((h, j) => (
                <div key={j} className="exp-highlight">
                  <div className="exp-highlight-title">
                    <span className="exp-bullet" />
                    {h.title}
                  </div>
                  <p className="exp-highlight-body">{h.body}</p>
                </div>
              ))}
            </div>

            {/* Stack tags */}
            <div className="exp-stack">
              {job.stack.map((tag) => (
                <span key={tag} className="exp-tag">{tag}</span>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  </section>
);

export default Experience;

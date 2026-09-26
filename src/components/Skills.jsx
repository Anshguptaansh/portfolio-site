import { skills } from '../mock';

const Skills = () => (
  <section id="skills" className="px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24">
    <div className="max-w-[1200px] mx-auto">

      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="font-serif-display section-title text-[clamp(48px,7vw,96px)] page-title">
          Stack
        </h2>
        <p className="font-serif-title italic section-subtitle text-[clamp(16px,1.6vw,22px)] mt-2">
          The Tools I build with, and the Principles I work by.
        </p>
      </div>

      {/* Grid */}
      <div className="skills-grid max-w-[960px] mx-auto">
        {skills.map((group) => (
          <div key={group.category} className={`skills-group${group.category === 'Soft Skills' ? ' skills-group--wide' : ''}`}>
            <div className="skills-category">{group.category}</div>
            <div className="skills-tags">
              {group.items.map((item) => (
                <span key={item} className={`skills-tag${group.category === 'Soft Skills' ? ' skills-tag--soft' : ''}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default Skills;

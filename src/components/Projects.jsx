import { ArrowUpRight } from 'lucide-react';
import { projects } from '../mock';

const ProjectCard = ({ project }) => (
  <div
    className="project-card"
    style={{
      '--card-accent': project.accent,
      '--card-accent-dark': project.accentDark,
    }}
  >
    {/* Accent header band */}
    <div className="project-card-band" />

    {/* Body */}
    <div className="project-card-body">
      <div className="project-card-top">
        <div>
          <div className="project-tagline">{project.tagline}</div>
          <h3 className="project-title">{project.title}</h3>
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link-btn"
          aria-label={`Visit ${project.title}`}
        >
          <ArrowUpRight size={16} strokeWidth={2} />
        </a>
      </div>

      <p className="project-desc">{project.description}</p>

      <div className="project-stack">
        {project.stack.map((t) => (
          <span key={t} className="project-tag">{t}</span>
        ))}
      </div>
    </div>
  </div>
);

const Projects = () => (
  <section id="projects" className="px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24">
    <div className="max-w-[1200px] mx-auto">

      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="font-serif-display section-title text-[clamp(48px,7vw,96px)] page-title">
          Projects
        </h2>
        <p className="font-serif-title italic section-subtitle text-[clamp(16px,1.6vw,22px)] mt-2">
          Built from scratch, shipped to production.
        </p>
      </div>

      {/* Grid */}
      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

    </div>
  </section>
);

export default Projects;

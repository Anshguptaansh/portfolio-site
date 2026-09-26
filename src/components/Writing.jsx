import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { writings, principles } from '../mock';

/* ─── Principles block ───────────────────────────────────── */

const Principles = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="principles-card">
      <button
        className="principles-header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="principles-header-left">
          <span className="principles-tag">Pinned</span>
          <span className="writing-title">Principles</span>
          <span className="writing-desc">{principles.intro}</span>
        </div>
        <ChevronDown
          size={18}
          className="principles-chevron"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {open && (
        <div className="principles-body">
          <blockquote className="principles-quote">
            "{principles.quote}"
          </blockquote>
          <div className="principles-items">
            {principles.items.map((item, i) => (
              <div key={i} className="principles-item">
                <h4 className="principles-item-title">{item.title}</h4>
                {item.quote && (
                  <p className="principles-item-pullquote">"{item.quote}"</p>
                )}
                <p className="principles-item-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Post row — expandable if body exists ───────────────── */

const PostRow = ({ post }) => {
  const [open, setOpen] = useState(false);
  const hasBody = post.body && post.body.length > 0;

  const handleClick = (e) => {
    if (hasBody) {
      e.preventDefault();
      setOpen((o) => !o);
    }
  };

  return (
    <div className="post-row-wrap">
      <a
        href={post.href}
        className={`writing-row${hasBody ? ' has-body' : ''}`}
        onClick={handleClick}
        aria-expanded={hasBody ? open : undefined}
      >
        <div className="writing-row-left">
          <span className="writing-title">{post.title}</span>
          <span className="writing-desc">{post.description}</span>
        </div>
        <div className="writing-row-right">
          <span className="writing-date">{post.date}</span>
          {hasBody && (
            <ChevronDown
              size={15}
              className="post-chevron"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          )}
        </div>
      </a>

      {/* Inline article body */}
      {hasBody && open && (
        <div className="post-body">
          {post.body.map((block, i) => {
            if (block.type === 'h3')
              return <h3 key={i} className="post-h3">{block.text}</h3>;
            return <p key={i} className="post-p">{block.text}</p>;
          })}
        </div>
      )}
    </div>
  );
};

/* ─── Writing section ────────────────────────────────────── */

const Writing = () => (
  <section id="writing" className="px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24">
    <div className="max-w-[1200px] mx-auto">

      <div className="text-center mb-16">
        <h2 className="font-serif-display section-title text-[clamp(48px,7vw,96px)] page-title">
          Writing
        </h2>
        <p className="font-serif-title italic section-subtitle text-[clamp(16px,1.6vw,22px)] mt-2">
          Brain dumps, explorations, and lessons on design, tech, and building.
        </p>
      </div>

      <div className="writing-list max-w-[860px] mx-auto">

        <Principles />

        {writings.map((group) => (
          <div key={group.year} className="writing-group">
            <div className="writing-year">{group.year}</div>
            {group.posts.map((post, i) => (
              <PostRow key={i} post={post} />
            ))}
          </div>
        ))}

      </div>
    </div>
  </section>
);

export default Writing;

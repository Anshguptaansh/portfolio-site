import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { navItems } from '../mock';

const SECTIONS = ['index', 'preface', 'skills', 'experience', 'projects', 'writing'];

const Navbar = ({ dark, onToggleDark }) => {
  const [active,   setActive]   = useState('index');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let current = 'index';
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current === 'preface' ? 'index' : current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">

      {/* ── Desktop ── */}
      <nav className="nb-pill hidden sm:flex items-center gap-0.5 px-1.5 py-1.5">

        {/* Logo */}
        <a href="#index" aria-label="Home" className="nb-logo mr-2">
          <span className="font-serif-display text-[14px] font-bold leading-none logo-text">A</span>
        </a>

        {/* Nav links */}
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`nb-link${active === item.id ? ' nb-link--active' : ''}`}
          >
            {item.label}
          </a>
        ))}

        {/* Divider */}
        <span className="nb-divider" />

        {/* Theme toggle */}
        <button onClick={onToggleDark} aria-label="Toggle theme" className="nb-icon-btn">
          {dark ? <Moon size={14} strokeWidth={2} /> : <Sun size={14} strokeWidth={2} />}
        </button>
      </nav>

      {/* ── Mobile ── */}
      <div className="sm:hidden w-full flex flex-col gap-2">
        <div className="nb-pill flex items-center justify-between px-2 py-2">
          <a href="#index" aria-label="Home" className="nb-logo">
            <span className="font-serif-display text-[14px] font-bold leading-none logo-text">A</span>
          </a>
          <div className="flex items-center gap-1.5">
            <button onClick={onToggleDark} aria-label="Toggle theme" className="nb-icon-btn">
              {dark ? <Moon size={14} strokeWidth={2} /> : <Sun size={14} strokeWidth={2} />}
            </button>
            <button onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu" className="nb-icon-btn">
              {menuOpen ? <X size={14} strokeWidth={2} /> : <Menu size={14} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Dropdown */}
        {menuOpen && (
          <div className="nb-dropdown">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`nb-dropdown-item${active === item.id ? ' nb-dropdown-item--active' : ''}`}
              >
                {item.label}
                {active === item.id && <span className="nb-dropdown-dot" />}
              </a>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;

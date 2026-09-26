import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Preface from './components/Preface';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Writing from './components/Writing';
import Footer from './components/Footer';

const App = () => {
  const [dark, setDark] = useState(() => {
    // Restore last preference from localStorage, fall back to system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="App">
      <Navbar dark={dark} onToggleDark={() => setDark((d) => !d)} />
      <main className="pb-24">
        <Hero />
        <Preface />
        <Skills />
        <Experience />
        <Projects />
        <Writing />
      </main>
      <Footer />
    </div>
  );
};

export default App;

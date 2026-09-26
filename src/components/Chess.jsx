import { useCallback, useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { RotateCcw, ExternalLink, Loader2, ChevronRight, Maximize2 } from 'lucide-react';

// ─── Constants ───────────────────────────────────────────────────────────────

const TIME_CONTROLS = [
  { label: 'Bullet',  clock: 1,  increment: 0,  display: '1+0'  },
  { label: 'Blitz',   clock: 3,  increment: 2,  display: '3+2'  },
  { label: 'Rapid',   clock: 10, increment: 5,  display: '10+5' },
  { label: 'Classic', clock: 30, increment: 0,  display: '30+0' },
];

const LICHESS_USERNAME = 'hi_ansh';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getStatus(game) {
  if (game.isCheckmate())
    return { text: `Checkmate — ${game.turn() === 'w' ? 'Black' : 'White'} wins`, over: true };
  if (game.isStalemate()) return { text: 'Stalemate — draw', over: true };
  if (game.isDraw())      return { text: 'Draw', over: true };
  if (game.isCheck())
    return { text: `${game.turn() === 'w' ? 'White' : 'Black'} is in check`, over: false };
  return { text: `${game.turn() === 'w' ? 'White' : 'Black'} to move`, over: false };
}

// Convert a game URL like https://lichess.org/AbCdEfGh
// into an embeddable URL:  https://lichess.org/embed/game/AbCdEfGh
function toEmbedUrl(gameUrl) {
  try {
    const u = new URL(gameUrl);
    const id = u.pathname.replace(/^\//, '').split('/')[0];
    return `https://lichess.org/embed/game/${id}?theme=brown&bg=light`;
  } catch {
    return null;
  }
}

// ─── Preview board (local, two-player pass-and-play) ─────────────────────────

const PreviewBoard = () => {
  const gameRef    = useRef(new Chess());
  const [fen,      setFen]      = useState(gameRef.current.fen());
  const [pairs,    setPairs]    = useState([]);
  const [status,   setStatus]   = useState(getStatus(gameRef.current));
  const moveListRef = useRef(null);

  const sync = useCallback(() => {
    const g = gameRef.current;
    setFen(g.fen());
    setStatus(getStatus(g));
    const hist = g.history({ verbose: true });
    const p = [];
    for (let i = 0; i < hist.length; i += 2) p.push([hist[i], hist[i + 1]]);
    setPairs(p);
    setTimeout(() => {
      if (moveListRef.current)
        moveListRef.current.scrollTop = moveListRef.current.scrollHeight;
    }, 0);
  }, []);

  const onDrop = useCallback((from, to, piece) => {
    if (status.over) return false;
    try {
      const m = gameRef.current.move({ from, to, promotion: piece?.[1]?.toLowerCase() ?? 'q' });
      if (!m) return false;
      sync();
      return true;
    } catch { return false; }
  }, [status.over, sync]);

  const reset = useCallback(() => {
    gameRef.current = new Chess();
    sync();
  }, [sync]);

  return (
    <div className="chess-preview">
      {/* Opponent row */}
      <div className="chess-player-row">
        <div className="chess-avatar">♟</div>
        <div>
          <div className="chess-player-name">You</div>
          <div className="chess-player-sub">pass &amp; play</div>
        </div>
        <div className={`chess-pill${status.over ? ' over' : ''}`}>{status.text}</div>
      </div>

      {/* Board */}
      <div className="chess-board-frame">
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          boardWidth={420}
          customBoardStyle={{ borderRadius: 0 }}
          customDarkSquareStyle={{ backgroundColor: '#769656' }}
          customLightSquareStyle={{ backgroundColor: '#eeeed2' }}
          animationDuration={120}
          arePiecesDraggable={!status.over}
        />
        {status.over && (
          <div className="chess-gameover-overlay">
            <span className="chess-gameover-text">{status.text}</span>
            <button className="chess-gameover-btn" onClick={reset}>Play again</button>
          </div>
        )}
      </div>

      {/* Host row */}
      <div className="chess-player-row">
        <div className="chess-avatar self">A</div>
        <div>
          <div className="chess-player-name">Ansh Gupta</div>
          <div className="chess-player-sub">hi_ansh · plays daily</div>
        </div>
        <button className="chess-tool-btn ml-auto" onClick={reset} title="Reset">
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      {/* Move list */}
      {pairs.length > 0 && (
        <div className="chess-movelist-wrap">
          <div className="chess-move-list" ref={moveListRef}>
            {pairs.map(([w, b], i) => (
              <div key={i} className={`chess-move-row${i % 2 === 0 ? ' even' : ''}`}>
                <span className="chess-mn">{i + 1}</span>
                <span className="chess-m">{w?.san}</span>
                <span className="chess-m dim">{b?.san ?? ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Live game embed panel ────────────────────────────────────────────────────

const LivePanel = () => {
  const [selectedTC, setSelectedTC] = useState(TIME_CONTROLS[1]);
  const [cState,     setCState]     = useState('idle');
  const [gameUrl,    setGameUrl]    = useState(null);
  const embedUrl = gameUrl ? toEmbedUrl(gameUrl) : null;

  const createChallenge = useCallback(async () => {
    setCState('loading');
    setGameUrl(null);
    try {
      const res = await fetch('https://lichess.org/api/challenge/open', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'clock.limit':     String(selectedTC.clock * 60),
          'clock.increment': String(selectedTC.increment),
          name:              `Play ${LICHESS_USERNAME} — ${selectedTC.display}`,
          rated:             'false',
        }),
      });
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      const url = data.challenge?.url ?? data.urlWhite ?? data.url;
      if (!url) throw new Error('No URL');
      setGameUrl(url);
      setCState('ready');
    } catch (err) {
      console.error('Lichess:', err);
      setCState('error');
    }
  }, [selectedTC]);

  const reset = () => { setCState('idle'); setGameUrl(null); };

  return (
    <div className="lp-wrap">

      {/* Header */}
      <div className="lp-header">
        <span className="lp-eyebrow">Live · Powered by Lichess</span>
        <h3 className="lp-title">Challenge me to a game</h3>
        <p className="lp-sub">Pick a time control and I'll get a notification when you join.</p>
      </div>

      {/* Time controls */}
      <div className="lp-tc-grid">
        {TIME_CONTROLS.map((tc) => (
          <button
            key={tc.label}
            className={`lp-tc${selectedTC.label === tc.label ? ' lp-tc--active' : ''}`}
            onClick={() => { setSelectedTC(tc); reset(); }}
          >
            <span className="lp-tc-clock">{tc.display}</span>
            <span className="lp-tc-name">{tc.label}</span>
          </button>
        ))}
      </div>

      {/* CTA / states */}
      {cState === 'idle' && (
        <button className="lp-cta" onClick={createChallenge}>
          Create challenge <ChevronRight size={15} strokeWidth={2.5} />
        </button>
      )}

      {cState === 'loading' && (
        <button className="lp-cta lp-cta--loading" disabled>
          <Loader2 size={15} className="chess-spin" /> Setting up board…
        </button>
      )}

      {cState === 'ready' && embedUrl && (
        <div className="lp-embed-wrap">
          <div className="lp-embed-bar">
            <div className="lp-ready-badge">
              <span className="lp-ready-dot" />
              Game ready · {selectedTC.display}
            </div>
            <div className="lp-embed-actions">
              <a href={gameUrl} target="_blank" rel="noreferrer" className="lp-icon-btn">
                <Maximize2 size={13} /> Full screen
              </a>
              <button className="lp-icon-btn" onClick={reset}>New game</button>
            </div>
          </div>
          <iframe
            src={embedUrl}
            className="chess-iframe"
            title="Live Lichess game"
            allowTransparency="true"
            frameBorder="0"
            allowFullScreen
          />
          <p className="lp-hint">
            I'll join from Lichess. Or{' '}
            <a href={`https://lichess.org/@/${LICHESS_USERNAME}`} target="_blank" rel="noreferrer">
              visit my profile
            </a>{' '}
            to challenge directly.
          </p>
        </div>
      )}

      {cState === 'error' && (
        <div className="lp-error-wrap">
          <p className="lp-error-msg">Couldn't reach Lichess. Try opening it directly.</p>
          <div className="lp-error-actions">
            <a
              href={`https://lichess.org/@/${LICHESS_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="lp-cta"
            >
              Open Lichess profile <ExternalLink size={14} />
            </a>
            <button className="lp-ghost-btn" onClick={reset}>Try again</button>
          </div>
        </div>
      )}

    </div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

const ChessSection = () => (
  <section id="chess" className="px-6 pt-20 pb-24">
    <div className="max-w-[1200px] mx-auto">

      <div className="text-center mb-16">
        <h2 className="font-serif-display section-title text-[clamp(48px,7vw,96px)] page-title">
          Play Chess
        </h2>
        <p className="font-serif-title italic section-subtitle text-[clamp(16px,1.6vw,22px)] mt-2">
          I play every day. Challenge me to a game.
        </p>
      </div>

      <div className="chess-shell">
        {/* Left: pass-and-play preview board */}
        <PreviewBoard />

        {/* Right: live Lichess challenge + embed */}
        <div className="chess-right">
          <div className="chess-card">
            <LivePanel />
          </div>
        </div>
      </div>

    </div>
  </section>
);

export default ChessSection;

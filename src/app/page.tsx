import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import CourseCard from '@/components/CourseCard';
import WalletExplainer from '@/components/WalletExplainer';
import ProvinceTabs from '@/components/ProvinceTabs';
import { ESSENTIAL_COURSES, SPECIALIST_COURSES } from '@/lib/data';

const WorkingAtHeightsGame = dynamic(
  () => import('@/game/working-at-heights/WorkingAtHeightsGame'),
  { ssr: false },
);

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="hero">
        {/* Parallax blueprint background */}
        <div className="hero-blueprint" />
        <div className="hero-overlay" />

        {/* Construction line-draw SVG */}
        <svg className="hero-construction-svg" viewBox="0 0 700 550" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Foundation */}
          <path d="M 60 480 L 540 480" className="draw-line dl-0" />

          {/* Ground floor columns */}
          <path d="M 100 480 L 100 350" className="draw-line dl-1" />
          <path d="M 220 480 L 220 350" className="draw-line dl-2" />
          <path d="M 340 480 L 340 350" className="draw-line dl-3" />
          <path d="M 500 480 L 500 350" className="draw-line dl-4" />

          {/* 1st floor beam */}
          <path d="M 80 350 L 520 350" className="draw-line dl-5" />

          {/* 2nd floor columns */}
          <path d="M 100 350 L 100 230" className="draw-line dl-6" />
          <path d="M 220 350 L 220 230" className="draw-line dl-7" />
          <path d="M 340 350 L 340 230" className="draw-line dl-8" />
          <path d="M 500 350 L 500 230" className="draw-line dl-9" />

          {/* 2nd floor beam */}
          <path d="M 80 230 L 520 230" className="draw-line dl-10" />

          {/* Roof columns */}
          <path d="M 100 230 L 100 120" className="draw-line dl-11" />
          <path d="M 500 230 L 500 120" className="draw-line dl-12" />

          {/* Roof beam */}
          <path d="M 80 120 L 520 120" className="draw-line dl-13" />

          {/* Cross braces */}
          <path d="M 100 480 L 220 350" className="draw-line dl-14" />
          <path d="M 340 480 L 500 350" className="draw-line dl-15" />
          <path d="M 100 350 L 220 230" className="draw-line dl-16" />
          <path d="M 340 350 L 500 230" className="draw-line dl-17" />

          {/* Crane mast */}
          <path d="M 590 480 L 590 70" className="draw-line dl-18" />

          {/* Crane jib */}
          <path d="M 590 80 L 180 80" className="draw-line dl-19" />

          {/* Crane counter-jib */}
          <path d="M 590 80 L 670 80" className="draw-line dl-20" />

          {/* Crane cable */}
          <path d="M 300 80 L 300 140" className="draw-line dl-21" />

          {/* Crane hook */}
          <path d="M 292 140 L 308 140" className="draw-line dl-22" />

          {/* Dimension marks */}
          <path d="M 60 500 L 540 500" className="draw-line dl-23" strokeDasharray="4 8" />
          <path d="M 560 480 L 560 120" className="draw-line dl-24" strokeDasharray="4 8" />
        </svg>

        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">CANADIAN CONSTRUCTION TRAINING</div>
            <h1>Know What You Need.<br />Get It Done.</h1>
            <p>Mandatory courses, upgrades, and career certifications — organized so you can start working faster.</p>
            <div className="hero-btns">
              <a href="#mandatory" className="btn-amber">See Mandatory Courses</a>
              <Link href="/wallet" className="btn-ghost">Open Wallet</Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Course Catalog */}
      <div className="catalog" id="mandatory">
        <div className="catalog-inner">
          <h2 className="catalog-heading">Mandatory</h2>
          <ProvinceTabs />

          {/* Portability Warning */}
          <div className="portability-warning">
            <span className="portability-warning-icon">{'\u26A0'}</span>
            Alberta&apos;s Fall Protection is NOT equivalent to Ontario&apos;s Working at Heights. If you move provinces, you must recertify.
          </div>

          <h2 className="catalog-heading" id="essential">Essential for the Job Site</h2>
          <div className="course-grid course-grid-3">
            {ESSENTIAL_COURSES.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>

          <h2 className="catalog-heading" id="career">Career &amp; Specialist</h2>
          <div className="course-grid course-grid-3">
            {SPECIALIST_COURSES.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </div>

      {/* Educational Games */}
      <section className="section-alt" id="games">
        <div className="section">
          <div className="section-label-learn"><span>Learn by Playing</span></div>
          <h2 className="section-title">Educational Games</h2>
          <p className="section-desc" style={{ marginBottom: 32 }}>Test your safety knowledge with interactive games built for construction workers.</p>

          {/*
            GAME CONTAINER
            ===============
            Single full-width card that hosts the game inline.
            - The game should be rendered INSIDE the <div className="game-stage"> below.
            - On desktop: the game plays horizontally inside this card (landscape, ~500px height).
            - On mobile: clicking "Play" triggers fullscreen + landscape orientation lock (see GameCard.tsx for reference).
            - The game source (HTML/Canvas/JS) goes in: public/games/<game-name>/index.html
            - Load the game via <iframe src="/games/<game-name>/index.html" /> or render directly with React/Canvas.
            - The toolbar at the top shows the game title and a close/minimize button.
          */}
          <div className="game-container">
            <div className="game-container-toolbar">
              <span className="game-container-title">Help &quot;Guy&quot; in His First Day</span>
              <span className="game-container-badge">BETA</span>
            </div>
            <div className="game-stage">
              <WorkingAtHeightsGame />
            </div>
          </div>
        </div>
      </section>

      {/* Wallet Explainer */}
      <WalletExplainer />

      <Footer />
    </>
  );
}

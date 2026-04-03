import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import MicroCard from '@/components/MicroCard';
import { COURSES, PATHWAYS, BLOG, IMG } from '@/lib/data';

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-img" src={IMG.hero} alt="" />
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">PROFESSIONAL CONSTRUCTION TRAINING</div>
            <h1>Certifications.<br />Courses.<br />Career ready.</h1>
            <p>Ontario&rsquo;s mandatory certifications, trade skill training, and your digital credential wallet.</p>
            <div className="hero-btns">
              <Link href="/courses/mandatory" className="btn-amber">Explore Programs</Link>
              <Link href="/wallet" className="btn-ghost">Open Wallet</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory */}
      <section className="section">
        <div className="section-label-learn"><span>Mandatory Certifications</span></div>
        <div className="section-header">
          <div>
            <h2 className="section-title">Required by Ontario Law</h2>
            <p className="section-desc">Every construction worker must complete these before starting on site.</p>
          </div>
          <Link href="/courses/mandatory" className="btn-outline">View All</Link>
        </div>
        <div className="course-grid course-grid-3">
          {COURSES.mandatory.map((c) => (
            <CourseCard key={c.id} course={c} large />
          ))}
        </div>
      </section>

      {/* Pathways */}
      <section className="section-alt">
        <div className="section" style={{ padding: '64px 28px' }}>
          <div className="section-label-learn"><span>Career Pathways</span></div>
          <h2 className="section-title">Choose your direction</h2>
          <p className="section-desc" style={{ marginBottom: 32 }}>Structured learning tracks from entry-level to site leadership.</p>
          <div className="pathway-grid">
            {PATHWAYS.map((p, i) => (
              <Link key={i} href="/pathways" className="pathway-card">
                <div className="pathway-card-bar" style={{ background: p.color }} />
                <div className="pathway-card-body">
                  <h3>{p.title}</h3>
                  {p.steps.map((s, j) => (
                    <div key={j} className="pathway-step">
                      <div className="pathway-step-num">{j + 1}</div>
                      <span>{s}</span>
                    </div>
                  ))}
                  <div className="pathway-footer">
                    <span className="pathway-dur">{p.duration}</span>
                    <span className="pathway-link">View track</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section">
        <div className="section-label-learn"><span>Trade Skills</span></div>
        <div className="section-header">
          <h2 className="section-title">Advance your career</h2>
          <Link href="/courses/skills" className="btn-outline">View All</Link>
        </div>
        <div className="course-grid course-grid-3">
          {COURSES.skills.slice(0, 6).map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* Micro */}
      <section className="section-alt">
        <div className="section" style={{ padding: '64px 28px' }}>
          <div className="section-label-learn"><span>Quick Courses</span></div>
          <h2 className="section-title">Learn in 30 minutes or less</h2>
          <p className="section-desc" style={{ marginBottom: 24 }}>Bite-sized lessons designed for the jobsite.</p>
          <div className="course-grid course-grid-2">
            {COURSES.micro.map((c) => (
              <MicroCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section">
        <div className="section-label-learn"><span>Industry News</span></div>
        <div className="section-header">
          <h2 className="section-title">From the blog</h2>
          <Link href="/blog" className="btn-outline">All Articles</Link>
        </div>
        <div className="course-grid course-grid-3">
          {BLOG.map((p, i) => (
            <Link key={i} href="/blog" className="blog-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt="" />
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span className="blog-card-cat">{p.cat}</span>
                  <span className="blog-card-date">{p.date}</span>
                </div>
                <h3>{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="cta-banner-inner">
          <div className="cta-banner-content">
            <h2>Your credentials. One place. Always ready.</h2>
            <p>Store certifications, track expirations, and share with employers via QR code.</p>
            <Link href="/wallet" className="btn-amber">Open Your Wallet — Free</Link>
          </div>
          <div className="cta-stats">
            {[
              { n: '500+', l: 'Workers' },
              { n: '12', l: 'Courses' },
              { n: 'Free', l: 'To Start' },
            ].map((s) => (
              <div key={s.l}>
                <div className="cta-stat-num">{s.n}</div>
                <div className="cta-stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

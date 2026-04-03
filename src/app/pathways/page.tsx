import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PATHWAYS } from '@/lib/data';

export default function PathwaysPage() {
  return (
    <>
      <Header />
      <div className="section">
        <div className="section-label-learn"><span>Career Pathways</span></div>
        <h2 className="section-title" style={{ marginBottom: 28 }}>Choose your direction</h2>
        <div className="pathway-grid-2col">
          {PATHWAYS.map((p, i) => (
            <div key={i} className="pathway-card large">
              <div className="pathway-card-bar" style={{ background: p.color }} />
              <div className="pathway-card-body large">
                <h3>{p.title}</h3>
                {p.steps.map((s, j) => (
                  <div key={j} className="pathway-step">
                    <div className="pathway-step-num">{j + 1}</div>
                    <span>{s}</span>
                  </div>
                ))}
                <div className="pathway-footer">
                  <span className="pathway-dur">{p.duration}</span>
                  <button className="pathway-start-btn" style={{ background: p.color }}>Start Track</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

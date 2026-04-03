import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MicroCard from '@/components/MicroCard';
import { COURSES } from '@/lib/data';

export default function MicroPage() {
  return (
    <>
      <Header />
      <div className="section">
        <div className="section-label-learn"><span>Microlearning</span></div>
        <h2 className="section-title">Quick Courses</h2>
        <p className="section-desc" style={{ marginBottom: 24 }}>Bite-sized lessons designed for the jobsite.</p>
        <div className="course-grid course-grid-2">
          {COURSES.micro.map((c) => (
            <MicroCard key={c.id} course={c} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

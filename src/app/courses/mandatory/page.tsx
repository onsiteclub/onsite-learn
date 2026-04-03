import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { COURSES } from '@/lib/data';

export default function MandatoryPage() {
  return (
    <>
      <Header />
      <div className="section">
        <div className="section-label-learn"><span>Mandatory Certifications</span></div>
        <h2 className="section-title">Mandatory Certifications</h2>
        <p className="section-desc" style={{ marginBottom: 32 }}>Required by Ontario Regulation 297/13 for all construction workers.</p>
        <div className="course-grid course-grid-3">
          {COURSES.mandatory.map((c) => (
            <CourseCard key={c.id} course={c} large />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

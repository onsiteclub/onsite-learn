import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { COURSES } from '@/lib/data';

export default function SkillsPage() {
  return (
    <>
      <Header />
      <div className="section">
        <div className="section-label-learn"><span>Trade Skills</span></div>
        <h2 className="section-title">Trade Skills &amp; Certifications</h2>
        <p className="section-desc" style={{ marginBottom: 32 }}>Industry-recognized certifications to advance your career.</p>
        <div className="course-grid course-grid-auto">
          {COURSES.skills.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

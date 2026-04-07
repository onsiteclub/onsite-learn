import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { COURSES } from '@/lib/data';

export default function InPersonCoursesPage() {
  return (
    <>
      <Header />
      <div className="section">
        <div className="section-label-learn"><span>In-Person from Partners</span></div>
        <h2 className="section-title">Hands-On Training at Local Centres</h2>
        <p className="section-desc" style={{ marginBottom: 32 }}>
          In-person courses at CPO-approved training centres across Ontario. Equipment, welding, rigging, and more.
        </p>
        <div className="course-grid course-grid-3">
          {COURSES['in-person'].map((c) => (
            <CourseCard key={c.id} course={c} large />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

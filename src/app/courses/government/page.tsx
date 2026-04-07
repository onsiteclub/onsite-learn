import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { COURSES } from '@/lib/data';

export default function GovernmentCoursesPage() {
  return (
    <>
      <Header />
      <div className="section">
        <div className="section-label-learn"><span>Government Free &amp; Online</span></div>
        <h2 className="section-title">Free Government Courses</h2>
        <p className="section-desc" style={{ marginBottom: 32 }}>
          Mandatory certifications provided free by the Ontario Ministry of Labour and approved agencies.
        </p>
        <div className="course-grid course-grid-auto">
          {COURSES['government-free'].map((c) => (
            <CourseCard key={c.id} course={c} large />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { COURSES } from '@/lib/data';

export default function PaidOnlineCoursesPage() {
  return (
    <>
      <Header />
      <div className="section">
        <div className="section-label-learn"><span>Paid Online from Partners</span></div>
        <h2 className="section-title">Online Courses from Trusted Providers</h2>
        <p className="section-desc" style={{ marginBottom: 32 }}>
          Upgrade your skills with certified online training from IHSA, eSafetyFirst, Canadian Red Cross, and more.
        </p>
        <div className="course-grid course-grid-3">
          {COURSES['paid-online'].map((c) => (
            <CourseCard key={c.id} course={c} large />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

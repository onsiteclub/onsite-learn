import Link from 'next/link';
import type { Course } from '@/lib/data';

export default function MicroCard({ course }: { course: Course }) {
  return (
    <Link href={`/course/${course.id}`} className="micro-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={course.img} alt={course.title} />
      <div className="micro-card-body">
        <h4>{course.title}</h4>
        <p>{course.sub}</p>
        <div className="micro-card-meta">
          <span className="micro-card-dur">{course.dur}</span>
          {course.progress !== undefined && course.progress > 0 && (
            <div className="progress-bar">
              <div
                className={`progress-bar-fill ${course.progress === 100 ? 'done' : 'in-progress'}`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          )}
          {course.progress === 100 && <span className="progress-label done">Complete</span>}
          {course.progress !== undefined && course.progress > 0 && course.progress < 100 && (
            <span className="progress-label in-progress">{course.progress}%</span>
          )}
        </div>
      </div>
    </Link>
  );
}

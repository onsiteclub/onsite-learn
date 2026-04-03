import Link from 'next/link';
import type { Course } from '@/lib/data';

function tagVariant(tag?: string) {
  if (tag === 'REQUIRED') return 'tag-required';
  if (tag === 'CERTIFICATION') return 'tag-cert';
  if (tag === 'TRADE SKILL') return 'tag-skill';
  return 'tag-default';
}

export default function CourseCard({ course, large }: { course: Course; large?: boolean }) {
  return (
    <Link href={`/course/${course.id}`} className="course-card">
      <div className={`course-card-img${large ? ' large' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={course.img} alt={course.title} />
        {course.tag && (
          <div className="course-card-tag">
            <span className={`tag ${tagVariant(course.tag)}`}>{course.tag}</span>
          </div>
        )}
        {course.price && (
          <div className={`course-card-price${course.price === 'Free' ? ' free' : ''}`}>
            {course.price}
          </div>
        )}
        {course.renewal && (
          <div className="course-card-renewal">Renew every {course.renewal}</div>
        )}
      </div>
      <div className={`course-card-body${large ? ' large' : ''}`}>
        <h3>{course.title}</h3>
        <p>{course.sub}</p>
      </div>
      <div className="card-accent" />
    </Link>
  );
}

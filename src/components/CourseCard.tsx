'use client';

import { useState } from 'react';
import RedirectModal from '@/components/RedirectModal';
import type { Course, BadgeType } from '@/lib/data';

const BADGE_STYLES: Record<BadgeType, string> = {
  REQUIRED: 'badge-required',
  CERTIFICATION: 'badge-certification',
  DESIGNATION: 'badge-designation',
};

export default function CourseCard({ course, large }: { course: Course; large?: boolean }) {
  const [showRedirect, setShowRedirect] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    setShowRedirect(true);
  }

  return (
    <>
      <a href={course.link} onClick={handleClick} className="course-card">
        <div className={`course-card-img${large ? ' large' : ''}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={course.img} alt={course.title} />
          <div className="course-card-tag">
            <span className={`course-badge ${BADGE_STYLES[course.badge]}`}>{course.badge}</span>
          </div>
          {course.price && (
            <div className={`course-card-price${course.price === 'Free' || course.price.includes('Free') ? ' free' : ''}`}>
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
          <span className="course-card-provider">{course.provider}</span>
        </div>
        <div className="card-accent" />
      </a>

      {showRedirect && (
        <RedirectModal
          isOpen={showRedirect}
          onClose={() => setShowRedirect(false)}
          providerName={course.provider}
          externalUrl={course.link}
          courseName={course.title}
        />
      )}
    </>
  );
}

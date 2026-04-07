'use client';

import { useState } from 'react';
import CourseCard from '@/components/CourseCard';
import { ONTARIO_MANDATORY, ALBERTA_MANDATORY } from '@/lib/data';

type Province = 'ontario' | 'alberta' | 'other';

export default function ProvinceTabs() {
  const [active, setActive] = useState<Province>('ontario');

  const courses = active === 'ontario' ? ONTARIO_MANDATORY : ALBERTA_MANDATORY;

  return (
    <>
      <div className="province-tabs">
        <button
          className={`province-tab${active === 'ontario' ? ' active' : ''}`}
          onClick={() => setActive('ontario')}
        >
          Ontario
        </button>
        <button
          className={`province-tab${active === 'alberta' ? ' active' : ''}`}
          onClick={() => setActive('alberta')}
        >
          Alberta
        </button>
        <button className="province-tab disabled" disabled>
          Other Provinces
        </button>
      </div>

      {active === 'other' ? (
        <p className="province-coming-soon">More provinces coming soon.</p>
      ) : (
        <div className="course-grid course-grid-3">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </>
  );
}

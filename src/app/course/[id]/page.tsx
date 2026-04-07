'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RedirectModal from '@/components/RedirectModal';
import { ALL_COURSES } from '@/lib/data';
import type { BadgeType } from '@/lib/data';

const BADGE_STYLES: Record<BadgeType, string> = {
  REQUIRED: 'badge-required',
  CERTIFICATION: 'badge-certification',
  DESIGNATION: 'badge-designation',
};

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = ALL_COURSES.find((c) => c.id === id) || ALL_COURSES[0];
  const [showRedirect, setShowRedirect] = useState(false);

  return (
    <>
      <Header />

      <div className="detail-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={course.img} alt="" />
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <span className={`course-badge ${BADGE_STYLES[course.badge]}`}>{course.badge}</span>
          <h1>{course.title}</h1>
          <p>{course.sub}</p>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-grid">
          <div className="detail-modules">
            <h3>Course Modules</h3>
            {course.modules?.map((m, i) => (
              <div key={i} className="module-row">
                <div className="module-num">{i + 1}</div>
                <span className="module-name">{m}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="detail-sidebar-price">
              <div className={`detail-price${course.price === 'Free' || course.price?.includes('Free') ? ' free' : ''}`}>
                {course.price || 'Free'}
              </div>
              <div className="detail-sub">{course.sub}</div>
              <button className="detail-cta" onClick={() => setShowRedirect(true)}>
                Go to {course.provider}
              </button>
            </div>

            <div className="detail-meta">
              {[
                { l: 'Duration', v: course.dur || '—' },
                { l: 'Format', v: course.type || '—' },
                { l: 'Provider', v: course.provider },
                ...(course.renewal ? [{ l: 'Renewal', v: `Every ${course.renewal}` }] : []),
              ].map((r, i) => (
                <div key={i} className="detail-meta-row">
                  <span className="detail-meta-label">{r.l}</span>
                  <span className="detail-meta-value">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link href="/" className="back-link">← Back to courses</Link>
      </div>

      {showRedirect && (
        <RedirectModal
          isOpen={showRedirect}
          onClose={() => setShowRedirect(false)}
          providerName={course.provider}
          externalUrl={course.link}
          courseName={course.title}
        />
      )}

      <Footer />
    </>
  );
}

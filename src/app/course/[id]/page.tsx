'use client';

import { use } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { COURSES } from '@/lib/data';

const ALL_COURSES = [...COURSES.mandatory, ...COURSES.skills, ...COURSES.micro];

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = ALL_COURSES.find((c) => c.id === id) || ALL_COURSES[0];

  const tagClass = course.tag === 'REQUIRED' ? 'tag-required' : course.tag === 'CERTIFICATION' ? 'tag-cert' : 'tag-skill';

  return (
    <>
      <Header />

      <div className="detail-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={course.img} alt="" />
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          {course.tag && <span className={`tag ${tagClass}`}>{course.tag}</span>}
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
              <div className={`detail-price${course.price === 'Free' ? ' free' : ''}`}>
                {course.price || 'Free'}
              </div>
              <div className="detail-sub">{course.sub}</div>
              {course.link ? (
                <a href={course.link} target="_blank" rel="noopener noreferrer" className="detail-cta">
                  Go to Official Course
                </a>
              ) : (
                <button className="detail-cta">Start Course</button>
              )}
            </div>

            <div className="detail-meta">
              {[
                { l: 'Duration', v: course.dur || '—' },
                { l: 'Format', v: course.type || '—' },
                { l: 'Provider', v: course.provider || 'OnSite Learn' },
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

      <Footer />
    </>
  );
}

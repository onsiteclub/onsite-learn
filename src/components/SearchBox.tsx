'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ALL_COURSES } from '@/lib/data';

export default function SearchBox() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.length >= 2
    ? ALL_COURSES.filter((c) => c.title.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setExpanded(false);
        setQuery('');
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleSelect(courseId: string) {
    setExpanded(false);
    setQuery('');
    router.push(`/course/${courseId}`);
  }

  return (
    <div className={`header-search${expanded ? ' expanded' : ''}`} ref={containerRef}>
      {!expanded ? (
        <button className="header-search-icon" onClick={() => setExpanded(true)} aria-label="Search courses">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      ) : (
        <>
          <input
            ref={inputRef}
            type="text"
            className="header-search-input"
            placeholder="Search courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query.length >= 2 && (
            <div className="header-search-dropdown">
              {results.length === 0 ? (
                <div className="header-search-empty">No courses found</div>
              ) : (
                results.map((course) => (
                  <button
                    key={course.id}
                    className="header-search-result"
                    onClick={() => handleSelect(course.id)}
                  >
                    <span className="header-search-result-title">{course.title}</span>
                    <span className="header-search-result-meta">{course.provider} &middot; {course.price || 'Free'}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

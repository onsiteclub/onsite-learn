import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BLOG } from '@/lib/data';

export default function BlogPage() {
  return (
    <>
      <Header />
      <div className="section">
        <div className="section-label-learn"><span>Blog &amp; Industry News</span></div>
        <h2 className="section-title" style={{ marginBottom: 28 }}>Latest articles</h2>
        <div className="course-grid course-grid-3">
          {BLOG.map((p, i) => (
            <div key={i} className="blog-card large">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt="" />
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span className="blog-card-cat">{p.cat} &middot; {p.date}</span>
                </div>
                <h3>{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

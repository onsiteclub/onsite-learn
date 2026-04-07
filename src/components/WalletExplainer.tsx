import Link from 'next/link';

export default function WalletExplainer() {
  return (
    <section className="section-alt">
      <div className="section wallet-explainer">
        <div className="section-label-learn"><span>Digital Wallet</span></div>
        <div className="wallet-explainer-grid">
          <div>
            <h2 className="section-title">Your credentials. One place. Always verified.</h2>
            <p className="section-desc" style={{ marginBottom: 28 }}>
              After completing a course, upload your certificate to your OnSite Wallet. Employers can verify your credentials instantly with a QR code.
            </p>
            <div className="wallet-explainer-features">
              <div className="wallet-explainer-feature">
                <div className="wallet-explainer-feature-icon">&#128196;</div>
                <div>
                  <strong>Store certifications</strong>
                  <p>Upload PDFs and track expiry dates for all your credentials.</p>
                </div>
              </div>
              <div className="wallet-explainer-feature">
                <div className="wallet-explainer-feature-icon">&#128247;</div>
                <div>
                  <strong>Share via QR code</strong>
                  <p>Employers scan your QR code to instantly verify your qualifications.</p>
                </div>
              </div>
              <div className="wallet-explainer-feature">
                <div className="wallet-explainer-feature-icon">&#9989;</div>
                <div>
                  <strong>Complete courses, upload here</strong>
                  <p>Finish training at partner sites, then come back and upload your certificate.</p>
                </div>
              </div>
            </div>
            <Link href="/wallet" className="btn-amber" style={{ marginTop: 8, padding: '14px 32px', fontSize: 13 }}>
              Open Your Wallet
            </Link>
          </div>
          <div className="wallet-explainer-visual">
            <div className="wallet-mock-card">
              <div className="wallet-mock-header">
                <div className="wallet-mock-avatar">JD</div>
                <div>
                  <div className="wallet-mock-name">John Doe</div>
                  <div className="wallet-mock-trade">Carpenter · Ontario</div>
                </div>
              </div>
              <div className="wallet-mock-creds">
                <div className="wallet-mock-cred">
                  <span>Working at Heights</span>
                  <span className="wallet-mock-valid">Valid</span>
                </div>
                <div className="wallet-mock-cred">
                  <span>WHMIS 2015</span>
                  <span className="wallet-mock-valid">Valid</span>
                </div>
                <div className="wallet-mock-cred">
                  <span>H&amp;S Awareness</span>
                  <span className="wallet-mock-valid">Valid</span>
                </div>
              </div>
              <div className="wallet-mock-qr">QR</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

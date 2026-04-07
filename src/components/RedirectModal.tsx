'use client';

interface RedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
  externalUrl: string;
  courseName: string;
}

export default function RedirectModal({ isOpen, onClose, providerName, externalUrl, courseName }: RedirectModalProps) {
  if (!isOpen) return null;

  function handleContinue() {
    window.open(externalUrl, '_blank', 'noopener,noreferrer');
    onClose();
  }

  return (
    <div className="redirect-overlay" onClick={onClose}>
      <div className="redirect-modal" onClick={(e) => e.stopPropagation()}>
        <div className="redirect-modal-icon">&#8599;</div>
        <h3>You&rsquo;re leaving OnSite Learn</h3>
        <p>
          You will be redirected to <strong>{providerName}</strong> to access <strong>{courseName}</strong>.
        </p>
        <div className="redirect-modal-highlight">
          <strong>After completing the course</strong>, come back to your <strong>OnSite Wallet</strong> and
          upload your certificate to keep all your credentials organized in one place.
        </div>
        <div className="redirect-modal-actions">
          <button className="btn-amber" style={{ padding: '12px 24px', fontSize: 13 }} onClick={handleContinue}>
            Continue to {providerName}
          </button>
          <button className="btn-outline" style={{ padding: '12px 24px', fontSize: 13 }} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

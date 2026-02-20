import React, { useState, useEffect, useCallback } from 'react';
import CodeBlock from '@theme/CodeBlock';

const BUTTON_STYLES = `
.sv-btn {
  color: #ffffff !important;
}
[data-theme="dark"] .sv-btn {
  --ifm-button-background-color: var(--blue);
  --ifm-button-border-color: var(--blue);
  background-color: var(--blue);
  border-color: var(--blue);
}
[data-theme="dark"] .sv-btn:hover {
  background-color: #0270cc;
  border-color: #0270cc;
}
`;

interface ScriptViewerProps {
  src: string;
  title?: string;
  language?: string;
  buttonLabel?: string;
}

export default function ScriptViewer({
  src,
  title,
  language = 'bash',
  buttonLabel = 'View Script',
}: ScriptViewerProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const displayTitle = title ?? src.split('/').pop() ?? src;

  useEffect(() => {
    if (!isOpen || content !== null) return;

    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${src}: ${res.status}`);
        return res.text();
      })
      .then(setContent)
      .catch((err) => setError(err.message));
  }, [isOpen, src, content]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    },
    [],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      <style>{BUTTON_STYLES}</style>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="button button--primary button--sm sv-btn"
        style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}
      >
        {buttonLabel}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={displayTitle}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '2rem',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--ifm-background-surface-color)',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '800px',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--ifm-font-family-monospace)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: 'var(--ifm-font-color-base)',
                }}
              >
                {displayTitle}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  color: 'var(--ifm-font-color-base)',
                  opacity: 0.6,
                  padding: '0 0.25rem',
                }}
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div style={{ overflow: 'auto', flex: 1 }}>
              {error ? (
                <div style={{ padding: '1.25rem', color: 'var(--ifm-color-danger)' }}>
                  {error}
                </div>
              ) : content === null ? (
                <div style={{ padding: '1.25rem', color: 'var(--ifm-font-color-secondary)' }}>
                  Loading...
                </div>
              ) : (
                <CodeBlock language={language}>{content}</CodeBlock>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0.75rem',
                padding: '0.75rem 1.25rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <a
                href={src}
                download
                className="button button--primary button--sm sv-btn"
              >
                Download
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="button button--secondary button--sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React from 'react';
import { IndianRupee, TrendingUp, Info } from 'lucide-react';

const ResultDisplay = ({ result, onReset }) => {
    if (!result) return null;

    return (
        <div className="glass-panel animate-fade-in-up" style={{ padding: '3rem', margin: '2rem auto', maxWidth: '800px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Background glow for emphasis */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', background: 'var(--success)', borderRadius: '50%', filter: 'blur(80px)', opacity: '0.15', zIndex: -1 }}></div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.5rem 1rem', borderRadius: '100px', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                <TrendingUp size={16} /> Valuation Complete
            </div>

            <h3 style={{ color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '1rem' }}>Estimated Market Value</h3>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <IndianRupee size={48} color="var(--accent-primary)" strokeWidth={2.5} />
                <span style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', color: 'transparent', lineHeight: 1 }}>
                    {result}
                </span>
                <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 600, alignSelf: 'flex-end', paddingBottom: '0.5rem' }}>Lakhs</span>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left', marginBottom: '2.5rem' }}>
                <Info size={24} color="var(--accent-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    This prediction is based on historical market trends in Bengaluru and attributes provided. Actual market value may fluctuate based on micro-market conditions, floor level, and overall property age.
                </p>
            </div>

            <button
                className="btn-primary"
                onClick={onReset}
                style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', boxShadow: 'none' }}
            >
                Evaluate Another Property
            </button>

            <style dangerouslySetInnerHTML={{
                __html: `
        .btn-primary:hover {
          background: rgba(255,255,255,0.05) !important;
          border-color: var(--text-secondary) !important;
        }
      `}} />
        </div>
    );
};

export default ResultDisplay;

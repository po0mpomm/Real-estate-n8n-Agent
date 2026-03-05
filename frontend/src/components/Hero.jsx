import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero = ({ onScrollToForm }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div className="hero-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '2rem', textAlign: 'center' }}>
      
      {/* Abstract Background Orbs */}
      <div 
        style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'var(--accent-primary)', borderRadius: '50%', filter: 'blur(100px)', opacity: '0.15', zIndex: -1, animation: 'float 8s ease-in-out infinite' }}
      ></div>
      <div 
        style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', background: 'var(--accent-secondary)', borderRadius: '50%', filter: 'blur(120px)', opacity: '0.15', zIndex: -1, animation: 'float 10s ease-in-out infinite reverse' }}
      ></div>

      <div className="animate-on-scroll" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: '100px', border: '1px solid var(--glass-border)', marginBottom: '2rem' }}>
          <Sparkles size={16} color="var(--accent-primary)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }}>AI-Powered Real Estate</span>
        </div>
      </div>

      <h1 className="animate-on-scroll delay-100" style={{ marginBottom: '1.5rem', opacity: 0, transform: 'translateY(20px)' }}>
        Discover The True Value <br />
        Of Your <span className="heading-gradient">Bengaluru Dream</span>
      </h1>
      
      <p className="subtitle animate-on-scroll delay-200" style={{ maxWidth: '600px', marginBottom: '3rem', opacity: 0, transform: 'translateY(20px)' }}>
        Leverage our advanced machine learning models to accurately predict property prices across Bengaluru's most sought-after neighborhoods.
      </p>

      <div className="animate-on-scroll delay-300" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <button className="btn-primary" onClick={onScrollToForm} style={{ padding: '1.25rem 2.5rem', borderRadius: '100px', fontSize: '1.2rem', width: 'auto' }}>
          Evaluate Property Now <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
};

export default Hero;

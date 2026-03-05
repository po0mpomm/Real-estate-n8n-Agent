import React, { useRef, useState } from 'react';
import fallbackData from './assets/fallback_data.json';
import Hero from './components/Hero';
import PredictorForm from './components/PredictorForm';
import ResultDisplay from './components/ResultDisplay';
import CustomAIAvatar from './components/CustomAIAvatar';
import { Building2 } from 'lucide-react';

function App() {
  const formRef = useRef(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePredict = async (data) => {
    setIsPredicting(true);
    setPredictionResult(null);

    // Simulated API delay before using fallback data
    setTimeout(() => {
      let pps = fallbackData['_global_avg']; // default baseline
      const bhkStr = String(data.bhk);

      if (fallbackData[data.location]) {
        if (fallbackData[data.location][bhkStr]) {
          pps = fallbackData[data.location][bhkStr];
        } else {
          // Average for that specific location across all BHKs
          const vals = Object.values(fallbackData[data.location]);
          if (vals.length > 0) pps = vals.reduce((a, b) => a + b, 0) / vals.length;
        }
      } else if (fallbackData['_city_avg_bhk'] && fallbackData['_city_avg_bhk'][bhkStr]) {
        pps = fallbackData['_city_avg_bhk'][bhkStr];
      }

      // Calculate final price: Price in Lakhs
      const finalPrice = ((data.totalSqft * pps) / 100000).toFixed(2);

      setPredictionResult(finalPrice);
      setIsPredicting(false);

      // Auto scroll to result after short delay
      setTimeout(() => {
        window.scrollBy({ top: 400, behavior: 'smooth' });
      }, 100);

    }, 1500); // 1.5s delay for realistic feel
  };

  return (
    <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.25rem' }}>
          <div style={{ background: 'var(--accent-gradient)', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={24} color="white" />
          </div>
          <span style={{ letterSpacing: '-0.02em' }}>Dwello<span style={{ color: 'var(--accent-primary)' }}>.AI</span></span>
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500, display: 'none' }} className="nav-links">
          {/* Add links here if needed */}
        </div>
      </nav>

      <main style={{ flex: 1, paddingBottom: '4rem' }}>
        <Hero onScrollToForm={handleScrollToForm} />

        <div ref={formRef} className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '1rem' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2rem', transition: 'all var(--transition-smooth)' }}>
            <PredictorForm onPredict={handlePredict} isPredicting={isPredicting} />

            {/* Smooth mounting animation for result */}
            {predictionResult && (
              <div style={{ animation: 'fadeInUp 0.6s var(--transition-bounce) forwards' }}>
                <ResultDisplay result={predictionResult} onReset={() => {
                  setPredictionResult(null);
                  formRef.current?.scrollIntoView({ behavior: 'smooth' });
                }} />
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>© 2026 Dwello.AI Real Estate. Powered by advanced Machine Learning.</p>
        <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>Frontend Ideation using React.js & Vanilla CSS</p>
      </footer>

      {/* Custom Animated Robot Avatar & Chat */}
      <CustomAIAvatar />
    </div>
  );
}

export default App;

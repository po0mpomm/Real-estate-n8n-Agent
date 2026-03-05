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

    try {
      // Send data to the n8n Webhook
      const response = await fetch('http://localhost:5678/webhook-test/https://4afb-2402-e280-21c6-91d-f15c-44ad-1a26-e1e1.ngrok-free.app/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          totalSqft: Number(data.totalSqft),
          bathrooms: Number(data.bathrooms),
          bhk: Number(data.bhk),
          location: data.location
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // n8n should be configured to return the final price calculation from the python ML endpoint back to the frontend
      const resultData = await response.json();

      // We expect the n8n response to contain the prediction. 
      // If it passes the exact python response through, it will be in resultData.predicted_price_lakhs
      // If n8n returns something else, we fallback.
      const finalPrice = resultData.predicted_price_lakhs || resultData.price || "Error";

      setPredictionResult(finalPrice);

    } catch (error) {
      console.error("Error calling n8n webhook:", error);
      setPredictionResult("Unavailable");
    } finally {
      setIsPredicting(false);

      // Auto scroll to result after short delay
      setTimeout(() => {
        window.scrollBy({ top: 400, behavior: 'smooth' });
      }, 100);
    }
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

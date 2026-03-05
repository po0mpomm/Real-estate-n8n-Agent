import React, { useState } from 'react';
import { Home, Bath, MapPin, Maximize, Calculator } from 'lucide-react';
import locations from '../assets/locations.json';

const PredictorForm = ({ onPredict, isPredicting }) => {
    const [formData, setFormData] = useState({
        totalSqft: 1200,
        bathrooms: 2,
        bhk: 2,
        location: locations[0]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onPredict(formData);
    };

    return (
        <div className="glass-panel" style={{ padding: '3rem', margin: '0 auto', maxWidth: '800px', position: 'relative', zIndex: 10 }}>
            {/* Decorative pulse ring around the form */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '1px solid var(--accent-primary)', borderRadius: 'var(--border-radius-lg)', opacity: 0.2, pointerEvents: 'none', animation: 'pulse-glow 3s infinite' }}></div>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ marginBottom: '0.5rem' }}>Property Valuation</h2>
                <p className="subtitle">Enter the property details to get an AI-driven estimate.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid-cols-2">
                {/* Total Sqft Input */}
                <div className="input-group">
                    <label className="input-label" htmlFor="totalSqft">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Maximize size={16} /> Total Area (Sqft)</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="number"
                            name="totalSqft"
                            id="totalSqft"
                            className="custom-input"
                            value={formData.totalSqft}
                            onChange={handleChange}
                            min="300"
                            max="10000"
                            required
                        />
                    </div>
                </div>

                {/* Location Dropdown */}
                <div className="input-group">
                    <label className="input-label" htmlFor="location">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> Location</span>
                    </label>
                    <select
                        name="location"
                        id="location"
                        className="custom-input"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    >
                        {locations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>

                {/* BHK Slider */}
                <div className="input-group">
                    <label className="input-label" htmlFor="bhk" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Home size={16} /> Bedrooms (BHK)</span>
                        <span style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', fontWeight: 600 }}>{formData.bhk}</span>
                    </label>
                    <div style={{ padding: '1rem 0' }}>
                        <input
                            type="range"
                            name="bhk"
                            id="bhk"
                            min="1"
                            max="10"
                            step="1"
                            value={formData.bhk}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Bathrooms Slider */}
                <div className="input-group">
                    <label className="input-label" htmlFor="bathrooms" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bath size={16} /> Bathrooms</span>
                        <span style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', fontWeight: 600 }}>{formData.bathrooms}</span>
                    </label>
                    <div style={{ padding: '1rem 0' }}>
                        <input
                            type="range"
                            name="bathrooms"
                            id="bathrooms"
                            min="1"
                            max="10"
                            step="1"
                            value={formData.bathrooms}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style={{ gridColumn: '1 / -1', marginTop: '1.5rem' }}>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isPredicting}
                        style={{ opacity: isPredicting ? 0.7 : 1, transform: isPredicting ? 'scale(0.98)' : 'none' }}
                    >
                        {isPredicting ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                Calculating...
                            </span>
                        ) : (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calculator size={20} /> Generate Estimate
                            </span>
                        )}
                    </button>
                </div>
            </form>
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}} />
        </div>
    );
};

export default PredictorForm;

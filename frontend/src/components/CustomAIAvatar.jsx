import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Sparkles, Send } from 'lucide-react';

const CustomAIAvatar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I am Dwello.AI.", sender: "ai" },
        { text: "I can help you evaluate properties in Bengaluru. What would you like to know?", sender: "ai" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    // Auto-scroll effect
    useEffect(() => {
        const chatBody = document.getElementById('chat-messages-container');
        if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
    }, [messages, isTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { text: input, sender: 'user' }]);
        setInput("");
        setIsTyping(true);

        // Mock AI Response (This is where n8n webhook call will go in the future)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: "I am currently running in offline UI mode. Once connected to n8n, I will reason over your real estate query here!",
                sender: 'ai'
            }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        /* Advanced Robot Animation Styles */
        .robot-head {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #1e1e2f, #3a3a5c);
          border-radius: 20px 20px 10px 10px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5), inset 0 2px 10px rgba(255,255,255,0.2);
          border: 2px solid var(--accent-primary);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }

        .robot-head:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.6), inset 0 2px 10px rgba(255,255,255,0.3);
          border-color: var(--accent-secondary);
        }

        /* The Robot Core Eye */
        .robot-eye {
          width: 24px;
          height: 8px;
          background: #00f0ff;
          border-radius: 10px;
          box-shadow: 0 0 15px #00f0ff, 0 0 30px #00f0ff;
          animation: scan 3s infinite alternate ease-in-out, blink 4s infinite;
        }

        /* Hover state makes eye intense */
        .robot-head:hover .robot-eye {
          background: #ff00ff;
          box-shadow: 0 0 20px #ff00ff, 0 0 40px #ff00ff;
          animation: pulse-eye 1s infinite alternate;
        }

        /* Floating Animation */
        .robot-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
          animation: hover-float 4s infinite ease-in-out;
        }

        /* Antenna */
        .robot-antenna {
          width: 4px;
          height: 15px;
          background: #a855f7;
          position: absolute;
          top: -15px;
          border-radius: 2px;
        }
        .robot-antenna::after {
          content: '';
          width: 10px;
          height: 10px;
          background: #00f0ff;
          border-radius: 50%;
          position: absolute;
          top: -5px;
          left: -3px;
          box-shadow: 0 0 10px #00f0ff;
          animation: blink 2s infinite;
        }

        /* Ears */
        .robot-ear {
          width: 8px;
          height: 20px;
          background: #6366f1;
          position: absolute;
          top: 20px;
          border-radius: 4px;
        }
        .robot-ear.left { left: -8px; }
        .robot-ear.right { right: -8px; }

        @keyframes hover-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes scan {
          0% { width: 10px; transform: translateX(-10px); }
          50% { width: 24px; transform: translateX(0); }
          100% { width: 10px; transform: translateX(10px); }
        }

        @keyframes blink {
          0%, 96%, 98% { opacity: 1; }
          97%, 99% { opacity: 0; }
        }

        @keyframes pulse-eye {
          0% { transform: scale(1); }
          100% { transform: scale(1.2); }
        }

        @keyframes open-chat {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />

            {/* The Chat Interface */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '6rem',
                        right: '2rem',
                        width: '350px',
                        height: '500px',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--border-radius-lg)',
                        boxShadow: 'var(--glass-shadow)',
                        zIndex: 999,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        animation: 'open-chat 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '1.25rem',
                        background: 'var(--accent-gradient)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '35px', height: '35px', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)'
                            }}>
                                <Sparkles size={18} color="#00f0ff" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 600, color: 'white', lineHeight: 1.2 }}>Dwello Assistant</span>
                                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>AI Reasoning Agent</span>
                            </div>
                        </div>
                        <button
                            onClick={toggleChat}
                            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '0.25rem' }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div
                        id="chat-messages-container"
                        style={{
                            flex: 1,
                            padding: '1.5rem',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            background: 'rgba(0,0,0,0.2)'
                        }}
                    >
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    background: msg.sender === 'user' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    padding: '0.75rem 1rem',
                                    borderRadius: msg.sender === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.4,
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                    border: msg.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div style={{
                                alignSelf: 'flex-start',
                                background: 'rgba(255,255,255,0.05)',
                                padding: '0.75rem 1rem',
                                borderRadius: '15px 15px 15px 0',
                                display: 'flex',
                                gap: '4px'
                            }}>
                                <div style={{ width: '6px', height: '6px', background: '#00f0ff', borderRadius: '50%', animation: 'blink 1s infinite' }} />
                                <div style={{ width: '6px', height: '6px', background: '#00f0ff', borderRadius: '50%', animation: 'blink 1s infinite 0.2s' }} />
                                <div style={{ width: '6px', height: '6px', background: '#00f0ff', borderRadius: '50%', animation: 'blink 1s infinite 0.4s' }} />
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <form
                        onSubmit={handleSend}
                        style={{
                            padding: '1rem',
                            borderTop: '1px solid var(--glass-border)',
                            background: 'rgba(0,0,0,0.3)',
                            display: 'flex',
                            gap: '0.5rem'
                        }}
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Message AI Agent..."
                            style={{
                                flex: 1,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '0.75rem 1rem',
                                borderRadius: '100px',
                                color: 'white',
                                outline: 'none',
                                fontFamily: 'Outfit, sans-serif'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                background: input.trim() ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.1)',
                                border: 'none',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: input.trim() ? 'pointer' : 'default',
                                transition: 'all 0.2s',
                                opacity: input.trim() ? 1 : 0.5
                            }}
                        >
                            <Send size={18} style={{ marginLeft: '2px' }} />
                        </button>
                    </form>
                </div>
            )}

            {/* The Robot Avatar Trigger */}
            <div
                className="robot-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={toggleChat}
            >
                {/* Tooltip */}
                <div style={{
                    position: 'absolute',
                    top: '-45px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--accent-gradient)',
                    padding: '0.5rem 1rem',
                    borderRadius: '100px',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    opacity: isHovered && !isOpen ? 1 : 0,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: 'none',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}>
                    <MessageSquare size={14} /> AI Assistant
                </div>

                {/* CSS Drawn Robot */}
                <div className="robot-head">
                    <div className="robot-antenna"></div>
                    <div className="robot-ear left"></div>
                    <div className="robot-ear right"></div>
                    <div className="robot-eye"></div>
                </div>
            </div>
        </>
    );
};

export default CustomAIAvatar;

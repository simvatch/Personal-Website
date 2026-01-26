import React from "react";
import "./Particles.css";

const colours = [
    "rgba(201, 0, 0, 0.5)",
    "rgba(1, 48, 143, 0.5)",
    "rgba(5, 128, 1, 0.5)",
    "rgba(245, 241, 22, 0.78)"
]

function generateParticles(count){
    return Array.from({ length:count }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 200,
        color: colours[Math.floor(Math.random() * colours.length)]
    }));
}

export default function ParticleBackground({ count = 300 }) {
    const particles1 = generateParticles(count);
    return (
        <div className="particle-container">
            {particles1.map((p, i) => (
                <div 
                    key={i} 
                    className="particle" 
                    style={{
                        left: `${p.x}px`,
                        top: `${p.y}px`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animationDelay: `${p.delay}s`,
                        background: p.color,
                        animationDuration: `${Math.random() * 150 + 50}s`,
                        transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 400 - 200}px)`
                    }}
                />
            ))}
        </div>
    )
}
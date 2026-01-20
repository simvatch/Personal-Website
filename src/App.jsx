import { useState } from 'react'
import './App.css'

function WelcomeText() {
  return (
    <svg width="800" height="250" viewBox="0 0 800 250">
      <defs>
        <linearGradient id="textGradientWelcome" x1="0%" y1="0%" x2="200%" y2="0%">
          <stop offset="0%" stopColor="#095fab">
            <animate attributeName="offset" values="-0.2;1.2" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="30%" stopColor="#25abe8">
            <animate attributeName="offset" values="0.1;1.3" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#4cd964">
            <animate attributeName="offset" values="0;1" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="70%" stopColor="#25abe8">
            <animate attributeName="offset" values="0.3;1.5" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#095fab">
            <animate attributeName="offset" values="0.8;1.8" dur="4s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        <path id="arcPathWelcome" d="M50,300 A370,300 0 0,1 750,300" fill="transparent" />
      </defs>

      <text fontFamily="Indie Flower" fontSize="150" fill="url(#textGradientWelcome)">
        <textPath xlinkHref="#arcPathWelcome" startOffset="50%" textAnchor="middle">
          Welcome!
        </textPath>
      </text>
    </svg>
  )
}

function BuiltbyText() {
  return (
    <svg width="500" height="250" viewBox="0 0 500 250">
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="200%" y2="0%">
          <stop offset="0%" stopColor="#095fab">
            <animate attributeName="offset" values="-0.2;1.2" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="30%" stopColor="#25abe8">
            <animate attributeName="offset" values="0.1;1.3" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#57d75b">
            <animate attributeName="offset" values="-0.01;0.01" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="70%" stopColor="#25abe8">
            <animate attributeName="offset" values="0.3;1.5" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#095fab">
            <animate attributeName="offset" values="0.8;1.8" dur="4s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        <path id="arcPath" d="M50,280 A200,200 0 0,1 450,280" fill="transparent" />
      </defs>

      <text fontFamily="Indie Flower" fontSize="40" fill="url(#textGradient)">
        <textPath xlinkHref="#arcPath" startOffset="50%" textAnchor="middle">
          Built by Simona Vatcheva
        </textPath>
      </text>
    </svg>
  )
}

const sections = [
  { title: 'About',        color: '#1a1a1a' },
  { title: 'Projects',     color: '#222222' },
  { title: 'Photography',  color: '#2b2b2b' },
  { title: 'Contact',      color: '#343434' }
];

function App() {
  return (
    <main>
      <section className='section hero' style={{ backgroundColor: "#121212" }}>
        <WelcomeText />
        <BuiltbyText />
      </section>

      {sections.map((section, idx) => (
        <section
          key={idx}
          className='section sticky'
          style={{ backgroundColor: section.color, zIndex: sections.length + idx}}
        >
          <h2 className='title'>{section.title}</h2>
        </section>
      ))}
    </main>
  )
}

export default App
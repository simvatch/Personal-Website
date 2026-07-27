import { useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import BonesAndBlades from "./Projects/BonesAndBlades"
import Jay from "./Projects/Jay"
import MooodyWeather from './Projects/MooodyWeather'
import ParticleBackground from './About'
import Carousel from './Projects'
import TagIt from './Projects/TagIt'
import FridgeOrganiser from './Projects/FridgeOrganiser'
import BeatBattle from './Projects/BeatBattle'
import Contact from './Contact'

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
  { title: 'About', color: '#1a1a1a', className: 'about' },
  { title: 'Projects', color: '#222222', className: 'projects' },
  { title: 'Contact', color: '#2b2b2b', className: 'contact' }
];

const HOME_SCROLL_KEY = 'homeScrollY'

function Home() {
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const saved = Number(sessionStorage.getItem(HOME_SCROLL_KEY))
    const target = Number.isFinite(saved) && saved > 0 ? saved : 0

    window.scrollTo(0, target)
    document.documentElement.scrollTop = target
    document.body.scrollTop = target

    let frame = null
    const rememberScroll = () => {
      if (frame !== null) return
      frame = requestAnimationFrame(() => {
        frame = null
        sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY))
      })
    }

    window.addEventListener('scroll', rememberScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', rememberScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <main>
      <section className='section hero' style={{ backgroundColor: "#121212" }}>
        <WelcomeText />
        <BuiltbyText />
      </section>

      {sections.map((section, idx) => (
        <section
          key={idx}
          className={`section stack-section ${section.className}`}
          style={{ backgroundColor: section.color, zIndex: idx + 1 }}
        >
             {section.title === "About" ? (
                <>
                  <ParticleBackground count={300} />
                  <div className="about-left">
                    <h2 className="title">About</h2>
                  </div>
                  <div className="about-right">
                    <p className="paragraph">
                      I’m a 15 year old British Bulgarian developer based in London, with a strong
                      focus on backend development in Python. I’ve built apps in
                      React Native, developed games with Godot, used Pygame in Python,
                      created web projects using React and CSS. Lately, I have been
                      experimenting with AI capabilities. Outside of tech,
                      I’m a competitive rower, a commitment that has taught me
                      discipline, teamwork and resilience.
                    </p>
                  </div>
                </>
              ) : section.title === "Projects" ? (
                 <div className="projects">
                  <div className="projects-title">
                    <h2 className="title">Projects</h2>
                  </div>

                  <div className="projects-carousel">
                    <Carousel />
                  </div>
                </div>
              ) : section.title == "Contact" ? (
                <div className='contact-wrapper'>
                  <Contact />
                </div>
              ) : (
                <h2 className="title">{section.title}</h2>
              )}
            </section>
          ))}
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bones-and-blades" element={<BonesAndBlades />} />
        <Route path="/jay" element={<Jay />} />
        <Route path="/mooody-weather" element={<MooodyWeather/>} />
        <Route path="/tagit" element={<TagIt />} />
        <Route path="/fridge-organiser" element={<FridgeOrganiser />} />
        <Route path="/beat-battle" element={<BeatBattle />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App

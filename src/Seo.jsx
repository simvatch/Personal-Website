import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE = 'https://simonavatcheva.com'

const DEFAULT_PAGE = {
  title: 'Simona Vatcheva',
  description:
    'A London-based developer specialising in Python, backend systems, and modern web applications, featuring projects in React and React Native.'
}

const pages = {
  '/': DEFAULT_PAGE,
  '/bones-and-blades': {
    title: 'Bones and Blades | Simona Vatcheva',
    description:
      'A 2D action game built with Pygame, featuring sprite animation, collision driven combat and JSON based player progression.'
  },
  '/tagit': {
    title: 'TagIt | Simona Vatcheva',
    description:
      'A React Native app that helps recover lost items using QR codes attached to belongings, backed by a FastAPI and PostgreSQL service.'
  },
  '/fridge-organiser': {
    title: 'Fridge Organiser | Simona Vatcheva',
    description:
      'A full stack smart fridge web app with AI photo recognition, recipe generation and a shopping list, built with React and FastAPI.'
  },
  '/mooody-weather': {
    title: 'Mooody Weather | Simona Vatcheva',
    description:
      'An interactive weather app with a character based UI that reacts to real-time conditions, built with React and a Python backend.'
  },
  '/beat-battle': {
    title: 'Beat Battle | Simona Vatcheva',
    description:
      'A lane based arcade game built in Godot with GDScript and exported to WebAssembly so it runs directly in the browser.'
  },
  '/jay': {
    title: 'Jay | Simona Vatcheva',
    description:
      'A Python terminal based assistant exploring API integration, with weather lookup, football scores, plant information and recipes.'
  }
}

function setTag(selector, create, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/'
    const page = pages[path] || DEFAULT_PAGE
    const url = path === '/' ? `${SITE}/` : `${SITE}${path}`

    document.title = page.title

    setTag('link[rel="canonical"]', () => {
      const el = document.createElement('link')
      el.setAttribute('rel', 'canonical')
      return el
    }, 'href', url)

    setTag('meta[name="description"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('name', 'description')
      return el
    }, 'content', page.description)

    setTag('meta[property="og:url"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('property', 'og:url')
      return el
    }, 'content', url)

    setTag('meta[property="og:title"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('property', 'og:title')
      return el
    }, 'content', page.title)

    setTag('meta[property="og:description"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('property', 'og:description')
      return el
    }, 'content', page.description)
  }, [pathname])

  return null
}

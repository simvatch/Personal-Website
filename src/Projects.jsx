import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Projects.css";
import actionshot from "./assets/actionshot.png";
import logo from "./assets/logo.png";
import cow from "./assets/special_cow.png";
import jay from "./assets/jay_demo.png";
import leftArrow from "./assets/left_arrow.png";
import rightArrow from "./assets/right_arrow.png";

const projects = [
  { 
    title: "Bones and Blades",
    image: actionshot, 
    description: "A 2D action game developed using Pygame, featuring animation, combat systems and enemy behaviour. The game includes real-time input handling, sprite-based animation and collision-driven combat mechanics. Player progression is managed through structured JSON data, enabling persistent storage of stats and quest progression. The project demonstrates a solid understanding of game loops, state management, and data-driven design.", 
    path: "/bones-and-blades"
  },
  {  
    title: "TagIt", 
    image: logo, 
    description: "A mobile app that helps recover lost items using QR Codes attached to belongings. When scanned, the owner receives an email and the finder can leave an anonymous message about where the item was left. Users can manage multiple items and view the items' status through the app. POC focused on tagging school uniforms.", 
    path: "/tagit"
  },
  { 
    title: "Mooody Weather",
    image: cow, 
    description: "An interactive weather app built with a React Native frontend and a Python backend which displays real-time weather data through a dynamic, character-based UI. A custom character reacts to conditions in a selected city, with backgrounds that adapt to weather states. This project demonstrates early experience with React Native.", 
    path: "/mooody-weather"
  },
  { 
    title: "Jay", 
    image: jay, 
    description: "A Python terminal based assistant built as an early project exploring API integration. It provides tools such as weather lookup, football scores, drawing utilities, plant information and recipes. It acts as a multi-purpose command line helper with different built-in features using external data sources.", 
    path: "/jay"
  },
];

const extendedProjects = [
  projects[projects.length - 1],
  ...projects,
  projects[0],
];

export default function Carousel() {
  const savedIndex = localStorage.getItem("carouselIndex");
  const [index, setIndex] = useState(savedIndex ? Number(savedIndex) : 1);
  const [isAnimating, setIsAnimating] = useState(false);

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((i) => i - 1);
  };

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((i) => i + 1);
  };

  const handleTransitionEnd = () => {
    if (index === 0) {
      setIsAnimating(false);
      setIndex(projects.length);
    } else if (index === projects.length + 1) {
      setIsAnimating(false);
      setIndex(1);
    }
    setIsAnimating(false);
  };

  useEffect(() => {
    localStorage.setItem("carouselIndex", index);
  }, [index])

  return (
    <div className="carousel">
      <button onClick={prev}><img className="arrow" src={leftArrow} width={80} height={80}/></button>

      <div className="viewport">
        <div
          className="track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: isAnimating ? "transform 0.4s ease" : "none",
          }}
        >
          {extendedProjects.map((p, i) => (
            <div className="slide" key={i}>
                <div className="project-image-wrapper">
                  <Link to={p.path}>
                    <img className="project-image" src={p.image} />
                  </Link>
                </div>
                <h3 className="header">{p.title}</h3>
                <p className="description">{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={next}><img className="arrow" src={rightArrow} width={80} height={80}/></button>
    </div>
  );
}

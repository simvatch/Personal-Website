import React, { useState } from "react";
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
    description: "A 2D action game built in Pygame featuring animated characters, combat mechanics and enemies. The game uses JSON to store player data and quest progress." 
  },
  {  
    title: "TagIt", 
    image: logo, 
    description: "A mobile app that helps recover lost items using QR Codes attached to belongings. When scanned, the owner receives an email and the finder can leave anonymous message about where the item was left. Users can manage multiple items and view the items' status through the app." 
  },
  { 
    title: "Mooody Weather",
    image: cow, 
    description: "An interactive weather app where a cow reacts to real-time weather in a chosen city. The background and animations change depending on the condition like rain, sun or snow. It contains a simple backend with visual, playful frontend." 
  },
  { 
    title: "Jay", 
    image: jay, 
    description: "A Python terminal based assistant that provides tools such as weather lookup, football score, drawing utilities, plant information and recipe database. It acts as a multi-purpose command line helper with different built-in features." 
  },
];

const extendedProjects = [
  projects[projects.length - 1],
  ...projects,
  projects[0],
];

export default function Carousel() {
  const [index, setIndex] = useState(1);
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
                <img className="project-image" src={p.image}/>
                <h3 className="header">{p.title}</h3>
                <p1 className="description">{p.description}</p1>
            </div>
          ))}
        </div>
      </div>

      <button onClick={next}><img className="arrow" src={rightArrow} width={80} height={80}/></button>
    </div>
  );
}
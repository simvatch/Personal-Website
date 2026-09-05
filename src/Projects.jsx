import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Projects.css";
import actionshot from "./assets/actionshot.png";
import logo from "./assets/logo.png";
import cow from "./assets/special_cow.png";
import jay from "./assets/jay_demo.png";
import fridge from "./assets/fridge_organiser_logo.png";
import beats from "./assets/beats_menu.png";
import studyEasy from "./assets/study_easy.png";
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
    description: "A mobile app that helps recover lost items using QR codes attached to belongings. Built with React Native and Expo, using expo-camera for scanning and expo-notifications for push alerts. The FastAPI backend serves unique codes from PostgreSQL via asyncpg, with bcrypt hashed passwords, token authorised requests and privacy settings controlling how much of the owner's identity a finder sees. POC focused on tagging school uniforms.",
    path: "/tagit"
  },
  {
    title: "Fridge Organiser",
    image: fridge,
    description: "A full stack web app built around the idea of a smart fridge. Items can be added manually or recognised automatically from a photo using AI image recognition with duplicates grouped and expiry dates tracked. Recipes are generated from the current contents, each with AI generated preview images, cooking steps and a list of missing ingredients while a shopping list is built from items that have run out. Built with a React frontend and a FastAPI backend, using PostgreSQL and JWT authentication over HTTP-only cookies.",
    path: "/fridge-organiser"
  },
  {
    title: "Mooody Weather",
    image: cow, 
    description: "An interactive weather app built with a React frontend and a Python backend which displays real-time weather data through a dynamic, character-based UI. A custom character reacts to conditions in a selected city, with backgrounds that adapt to weather states. This project demonstrates early experience with React Native.", 
    path: "/mooody-weather"
  },
  {
    title: "Beat Battle",
    image: beats,
    description: "A lane based arcade game where monsters advance across four lanes towards a laser line and the player switches lanes to throw a disc at them, losing health for each one that gets through and clearing the level once the score target is met. Built in Godot with GDScript, using area based collision detection, animated sprites and scene driven level selection, pass and fail states.",
    path: "/beat-battle"
  },
  {
    title: "Study Easy",
    image: studyEasy,
    description: "A study planner that turns weekly hour targets into real calendar sessions. It reads your Google Calendar to find free time, fits sessions around your availability, travel time and buffers, then writes them back to a calendar of your choice. Anything you miss is rolled into the following week, and an eight week progress view tracks how much of each subject you actually completed. Built with Claude, using a React and TypeScript frontend and a FastAPI backend, with PostgreSQL, Google OAuth and JWT authentication.",
    path: "/study-easy",
    external: true
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
              <div className="slide-content">
                <div className="project-image-wrapper">
                  {p.external ? (
                    <a href={p.path}>
                      <img className="project-image" src={p.image} />
                    </a>
                  ) : (
                    <Link to={p.path}>
                      <img className="project-image" src={p.image} />
                    </Link>
                  )}
                </div>
                <h3 className="header">{p.title}</h3>
                <p className="description">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={next}><img className="arrow" src={rightArrow} width={80} height={80}/></button>
    </div>
  );
}

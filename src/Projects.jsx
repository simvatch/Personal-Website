import React, { useState } from "react";
import "./Projects.css";

const projects = [
  { title: "Bones and Blades" },
  { title: "TagIt" },
  { title: "Mooody Weather" },
  { title: "Jay" },
];

const extendedProjects = [
  projects[projects.length - 1],
  ...projects,
  projects[0],
];

export default function Carousel() {
  const [index, setIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);

  const prev = () => {
    setIsAnimating(true);
    setIndex((i) => i - 1);
  };

  const next = () => {
    setIsAnimating(true);
    setIndex((i) => i + 1);
  };

  const handleTransitionEnd = () => {
    if (index === 0) {
      setIsAnimating(false);
      setIndex(projects.length);
    }
    if (index === projects.length + 1) {
      setIsAnimating(false);
      setIndex(1);
    }
  };

  return (
    <div className="carousel">
      <button onClick={prev}>←</button>

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
              <h3>{p.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <button onClick={next}>→</button>
    </div>
  );
}
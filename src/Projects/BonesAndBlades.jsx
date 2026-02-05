import React from "react";
import { FiDownload, FiGithub, FiHome } from "react-icons/fi";
import "./BonesAndBlades.css"

export default function BonesAndBlades(){
    return (
        <div className="game-page">
            <div className="game-inner">
                <h1 className="project-title">Bones and Blades</h1>

                <div className="video-container">
                <video
                    src="/video_demo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                />
                </div>

                <a href="/bones-andblades.zip" className="download-button" download>
                <FiDownload style={{ marginRight: "8px" }} />
                Download Game
                </a>

                <a
                href="https://github.com/palebrownbutton/Bones-and-Blades"
                className="github-link"
                target="_blank"
                rel="noopener noreferrer"
                >
                <FiGithub style={{ marginRight: "8px" }} />
                GitHub Repository
                </a>
            </div>
            <a href="/" className="home-button">
                <FiHome />
            </a>
        </div>
    )
}
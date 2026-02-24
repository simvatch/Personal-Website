import React from "react";
import { FiHome } from "react-icons/fi";
import "../Projects.css"

export default function TagIt(){
    return (
        <div className="game-page tagit-container">
            <h1 className="project-title tagit-title">TagIt</h1>
            <div className="tagit-center-container">
                <p className="info tagit-info">Coming Soon!</p>
            </div>
            <a href="/" className="home-button">
                <FiHome />
            </a>
        </div>
    )
}
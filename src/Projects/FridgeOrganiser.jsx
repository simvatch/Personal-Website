import React from "react";
import { FiGithub, FiHome } from "react-icons/fi";
import "../Projects.css"
import "./FridgeOrganiser.css"
import FridgeApp from "../../FridgeOrganiser/FridgeApp";

export default function FridgeOrganiser(){
    return (
        <div className="game-page fridge-page">
            <div className="game-inner fridge-inner">
                <h1 className="project-title">Fridge Organiser</h1>

                <p className="info">The full app runs right here — sign up or log in to track what's in your fridge, scan it from a photo and generate recipes from what you have.</p>

                <div className="fridge-app-root">
                    <FridgeApp />
                </div>

                <a
                href="https://github.com/simvatch/fridge-organiser"
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

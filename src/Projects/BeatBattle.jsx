import React from "react";
import { FiGithub, FiHome } from "react-icons/fi";
import "../Projects.css"
import "./BeatBattle.css"

export default function BeatBattle(){
    return (
        <div className="game-page beat-battle-container">
            <div className="game-inner">
                <div className="beat-battle-page">
                    <h1 className="project-title">Beat Battle</h1>

                    <div className="demo-wrapper">
                        <div className="demo-container">
                            <iframe
                                className="beat-battle-frame"
                                src="/beat-battle/index.html"
                                title="Beat Battle"
                                allow="autoplay; fullscreen; gamepad"
                            />
                        </div>
                    </div>

                    <p className="info">Throw your disc at the monsters before they reach the laser behind you. Click to start, then arrow keys to change lane and space to throw.</p>

                    <p className="info">Built for Horizons Europa, a Hack Club organised hackathon, together with @7riciu and @Starianne.</p>

                    <a
                    href="https://github.com/simvatch/Horizons-Europa"
                    className="github-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <FiGithub style={{ marginRight: "8px" }} />
                    GitHub Repository
                    </a>
                </div>
            </div>
            <a href="/" className="home-button">
                <FiHome />
            </a>
        </div>
    )
}

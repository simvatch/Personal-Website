import React, { useState } from "react";
import { FiDownload, FiGithub, FiHome } from "react-icons/fi";
import "../Projects.css"

export default function Jay(){

    const [input, setInput] = useState("");
    const [output, setOutput] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input) return;

        setOutput ((prev) => [...prev, {type: "user", text: input}]);

        try {
            const res = await fetch("https://personal-website-1z1a.onrender.com", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ command: input }),
            });

            const data = await res.json();

            setOutput((prev) => [...prev, { type: "jay", text: data.response }]);
        } catch (err) {
            setOutput((prev) => [...prev, { type: "jay", text: "Error: Could not reach backend." }]);
        }

        setInput("");
    };

    return (
        <div className="game-page">
            <div className="game-inner">
                <h1 className="project-title">Jay</h1>

                <div className="console">
                    {output.map((line, idx) => (
                        <div key={idx} className={line.type === "user" ? "console-user" : "console-jay"}>
                            {line.type === "user" ? "> " : "Jay: "}
                            {line.text}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a command..."
                        className="console-input"
                    />
                </form>

                <a
                href="https://github.com/palebrownbutton/Jay"
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
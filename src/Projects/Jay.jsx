import React, { useState, useRef, useEffect } from "react";
import { FiDownload, FiGithub, FiHome } from "react-icons/fi";
import { jayExecute, EXAMPLE_COMMANDS } from "./jayEngine";
import "../Projects.css"
import "./Jay.css"

export default function Jay(){

    const [input, setInput] = useState("");
    const [output, setOutput] = useState([]);
    const [thinking, setThinking] = useState(false);

    const bottomRef = useRef(null);

    const addJayLine = (text) => setOutput((prev) => [...prev, { type: "jay", text }]);

    const runCommand = async (command) => {
        setOutput((prev) => [...prev, { type: "user", text: command }]);
        setThinking(true);

        const response = await jayExecute(command, addJayLine);
        if (response) addJayLine(response);

        setThinking(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input || thinking) return;

        const command = input;
        setInput("");
        await runCommand(command);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [output])

    return (
        <div className="game-page jay-page">
            <div className="game-inner">
                <h1 className="project-title">Jay</h1>

                <p className="info">This is a demo version so full functionality is not available</p>

                <div className="console">
                    {output.map((line, idx) => (
                        <div key={idx} className={line.type === "user" ? "console-user" : "console-jay"}>
                            {line.type === "user" ? "> " : "Jay: "}
                            {line.text}
                        </div>
                    ))}
                    {thinking && <div className="console-jay">Jay: ...</div>}
                    <div className="console-prompt">&gt;</div>

                    <div ref={bottomRef}/>
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

                <div className="console-examples">
                    {EXAMPLE_COMMANDS.map((example) => (
                        <button
                            key={example}
                            type="button"
                            className="console-example"
                            onClick={() => runCommand(example)}
                            disabled={thinking}
                        >
                            {example}
                        </button>
                    ))}
                </div>

                <div className="jay-links">
                    <a href="/jay.zip" className="download-button" download>
                    <FiDownload style={{ marginRight: "8px" }} />
                    Download For Full Functionality
                    </a>

                    <a
                    href="https://github.com/simvatch/Jay"
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

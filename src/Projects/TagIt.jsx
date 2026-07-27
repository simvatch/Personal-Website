import React from "react";
import { FiDownload, FiHome } from "react-icons/fi";
import "../Projects.css"
import "./TagIt.css"

export default function TagIt(){
    return (
        <div className="game-page tagit-page">
            <div className="game-inner tagit-inner">
                <h1 className="project-title">TagIt</h1>

                <p className="info tagit-intro">
                    A React Native app that helps recover lost items using QR codes attached to
                    belongings. Scanning a tag alerts the owner and lets the finder leave an
                    anonymous note about where the item was left.
                </p>

                <div className="tagit-video">
                    <iframe
                        src="https://www.youtube-nocookie.com/embed/hMXz5oB7kfE"
                        title="TagIt demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>

                <a href="/tagit.apk" className="download-button" download>
                    <FiDownload style={{ marginRight: "8px" }} />
                    Download for Android (APK)
                </a>

                <p className="info tagit-install-note">
                    TagIt is not on the Play Store yet, so Android will ask you to allow installs
                    from this source the first time. There is no iOS build to download — Apple only
                    allows sideloading through the App Store or TestFlight.
                </p>
            </div>
            <a href="/" className="home-button">
                <FiHome />
            </a>
        </div>
    )
}

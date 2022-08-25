import React from "react";


const Song = ({isPlaying, currentSong}) => {
    return(
        <div className="song-container">
            <div className="img-block">
            <img className={`${isPlaying ? "img-rotate" : ""}`} alt={currentSong.name} src={currentSong.cover}/>
            <div className="hole"></div>
            </div>
            <h2>{currentSong.artist}</h2>
            <h3>{currentSong.name}</h3>
        </div>
    )
}

export default Song
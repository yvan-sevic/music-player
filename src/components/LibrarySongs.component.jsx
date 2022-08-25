import React from "react";

const LibrarySong = ({currentSong, song, setCurrentSong, audioRef, isPlaying}) => {

    const playSongHandler = () => {
        setCurrentSong(song)
        audioRef.current.play()
    }
    if(isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise === undefined) {
            playPromise.then(audio => {
                audio.play()
            })
        }
    }

    return(
        <div onClick={playSongHandler}  className={`library-song ${song.id === currentSong.id ? "selected" : ""} `}>
            <img alt={song.name} src={song.cover}/>
            <div className="song-description">
            <h3>{song.artist}</h3>
            <h4>{song.name}</h4>
            </div>
        </div>
    )
}

export default LibrarySong
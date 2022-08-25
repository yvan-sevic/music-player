import React from "react";
import LibrarySong from "./LibrarySongs.component";
import '../styles/library.styles.scss'

const Library = ({darkMode, libraryStatus, currentSong, songs, setCurrentSong, audioRef, isPlaying, setSongs}) => {

    const styles =  {
         box: {
            boxShadow:`1px 5px 30px ${currentSong.color[1]}`
        }
    }

    return (
        <div style={styles.box} className={`library ${libraryStatus ? 'active-library' : ''} ${darkMode ? "dark-mode" : ""}`}>
            <h2>Library</h2>
                <div className="library-songs">
                    {songs.map(song => <LibrarySong 
                    setCurrentSong={setCurrentSong} 
                    song={song} 
                    songs={songs} 
                    isPlaying={isPlaying} 
                    audioRef={audioRef} 
                    id={song.id} 
                    setSongs={setSongs}
                    currentSong={currentSong}/>)}
                </div>
        </div>
    )
}

export default Library
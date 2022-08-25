import './App.css';
import Song from './components/Song.component';
import Player from './components/Player.component';
import './styles/App.styles.scss'
import data from './utils'
import { useState, useRef} from 'react';
import Library from './components/Library.component';
import Nav from './components/Nav.component';


function App() {
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const [libraryStatus, setLibraryStatus] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const darkModeHandler = () => {
    setDarkMode(!darkMode)
}

  const randomHandler = () => {
    setCurrentSong(songs[Math.floor(Math.random() * 4)])
  }

  const volumeHandler = (e) => {
    audioRef.current.volume = e.target.value / 100;
  }

  const durationHandler = (e) => {
    const current = e.target.currentTime
    const songLength = e.target.duration
    setSongInfoTime({...songInfoTime, currentTime:current, songLength})
}
  const [songInfoTime, setSongInfoTime] = useState({
    currentTime: '',
    songLength: ''
})

const skipHandler = (direction) => {
  const currentIndex = songs.findIndex(song => song.id === currentSong.id)
  if (direction === 'skip-forward' && currentIndex < songs.length -1) {
  setCurrentSong(songs[currentIndex + 1])
  } else {
      setCurrentSong(songs[0])
  }
  if (direction === "skip-back") {
      if (currentIndex === 0) {
        setCurrentSong(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[currentIndex - 1]);
      }
    }
}

  return (
    <div className={`move ${libraryStatus ? "library-active" : ""} ${darkMode ? "dark-mode" : ""}`}>
      <Nav darkModeHandler={darkModeHandler} darkMode={darkMode} setDarkMode={setDarkMode} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song isPlaying={isPlaying} currentSong={currentSong}/>
      <Player volumeHandler={volumeHandler} randomHandler={randomHandler} darkMode={darkMode} setCurrentSong={setCurrentSong} songs={songs} songInfoTime={songInfoTime} setSongInfoTime={setSongInfoTime} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}/>
      <Library darkMode={darkMode} libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} currentSong={currentSong} songs={songs} setCurrentSong={setCurrentSong}/>
      <audio  onEnded={()=> skipHandler('skip-forward')} onTimeUpdate={durationHandler} onLoadedMetadata={durationHandler} ref={audioRef} src={currentSong.audio}></audio>
      
    </div>
  );
}

export default App;

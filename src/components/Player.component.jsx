import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay,faRandom ,faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons'

const Player = ({volumeHandler, randomHandler, darkMode, setCurrentSong, songs, currentSong, setIsPlaying, isPlaying, audioRef, songInfoTime, setSongInfoTime}) => {
    //useRef reference an HTML element that uses 'ref' -> audio -> ref={audioRef}
    const playHandler = () => {
        if(isPlaying) {
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
        } else {
            audioRef.current.play()
            setIsPlaying(!isPlaying)
        }
        
    }
    //format the time
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfoTime({...songInfoTime, currentTime: e.target.value})
    }

    //state


    const animationPercentage = (songInfoTime.currentTime / songInfoTime.songLength) * 100;
    const trackAnim = {
        transform: `translateX(${animationPercentage}%)`
    }

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

    return(
        <div className={`player-container ${darkMode ? "dark-mode-on" : ""}`}>
            <div className="time-control">
                <p>{getTime(songInfoTime.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} class="track">
                    <input onChange={dragHandler} min={0} max={songInfoTime.songLength} value={songInfoTime.currentTime} type="range" />
                    <div style={trackAnim} className="animate-track"></div>
            </div>
            <p>{getTime(songInfoTime.songLength)}</p>
                </div>
                
                
            <div className={`play-control ${darkMode ? "dark-mode-on" : ""}`}>
                <input onChange={volumeHandler} defaultValue="100" type="range" min="0" max="100" />
                <FontAwesomeIcon onClick={() => skipHandler('skip-back')} className="skip-back"  size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playHandler} className="play" size='2x' icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={randomHandler} className="skip-forward" size='2x' icon={faRandom}/>
                <FontAwesomeIcon onClick={() => skipHandler('skip-forward')} className="skip-forward" size='2x' icon={faAngleRight}/>
            </div>

        </div>
    )
}

export default Player
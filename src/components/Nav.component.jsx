import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMusic, faHouseTsunami } from "@fortawesome/free-solid-svg-icons"
import '../styles/nav.styles.scss'

const Nav = ({darkMode, darkModeHandler, libraryStatus, setLibraryStatus}) => {
    const libraryHandler = () => {
        setLibraryStatus(!libraryStatus)
        
    }



    return (
        <nav >
            <button className={`color-button-dark dark-mode-button-shape ${darkMode ? "background-color-dark" : ""}`} onClick={darkModeHandler}><div className={`ball ${darkMode ? "ball-on background-color-dark" : ""}`}></div></button>
            <h1 className={`${darkMode ? "dark-mode-on" : ""}`}>Waves <FontAwesomeIcon icon={faHouseTsunami}/></h1>
            <button onClick={libraryHandler}>
                Library 
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    )
}

export default Nav
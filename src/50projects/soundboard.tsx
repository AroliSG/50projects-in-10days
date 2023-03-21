import { CSSProperties, useState } from "react";
import useSound from 'use-sound';
import tracks from './json/musics.json';

type makerProps = {
    url: string,
    name: string,
    onClick: () => void,
}

//const TRACKS_LIMIT = 22577;

const styles: {[key: string]: CSSProperties} = {
    container: {
        display: 'flex',
        width: "90vw",
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    icons: {
        fontSize: '1.5vw',
        padding: 5,
    },
    button_container: {
        width: "200px",
        position: "relative",
        backgroundColor: "#5865F2",
        margin:15,
        borderRadius: 10
    },
    button: {
        padding: 15,
        color: "white",
        width: "100%",
        borderRadius: 5,
        borderWidth: 0,
        backgroundColor: "#5865F2",
        fontSize: '1.2vw'
    },
    icons_container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    Title: {
        fontSize: '1.2vw',
        fontWeight: 'bold'
    },
    volumeFont: {
        fontSize: '0.9vw',
        fontWeight: 'bold'
    }
}

const Maker = (props: makerProps) => {
    const [getVolume, setVolume]            = useState (0.5);
   // const [getIsPlaying, setIsPlaying]      = useState (false);

    const [play] = useSound(props.url, {
        volume: getVolume
    });

    const getVolumeRounded =  (parseFloat (getVolume.toFixed (1))/1 * 100).toString ()

    return (
        <div style = {styles.button_container}>
            <button
                style   = {styles.button}
                onMouseDown = {evt=> {
                        play ();
                    evt.currentTarget.style.opacity = '0.5'} }
                onMouseUp = {evt=> evt.currentTarget.style.opacity = '1'}
            >
                <label style={styles.Title}>{props.name}</label>
            </button>
            <div style={styles.icons_container}>
                <i
                    className   = "fa fa-volume-down"
                    style       = {{
                        ...styles.icons,
                    }}
                    onMouseDown =  {() => {
                        props.onClick ();
                        setVolume (vol => {
                            if (vol.toFixed (1) === "0.0") return vol;
                            return vol-0.1;
                        })
                    }}
                />

                <label style={styles.volumeFont}>{getVolumeRounded}</label>

                <i
                    className   = "fa fa-volume-up"
                    style       = {{
                        ...styles.icons,
                    }}
                    onMouseDown =  {() => {
                        props.onClick ();
                        setVolume (vol => {
                            if (vol.toFixed (1) === "1.0") return vol;
                            return vol+0.1;
                        })
                    }}
                />
            </div>
        </div>
    )
}

const SoundBoard = () => {
    const [play] = useSound("http://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3");

        // this way we can get a lot of tracks loaded into the web
    /* 
                {Array (TRACKS_LIMIT)).fill (null).map ((_, index) => {
                if (index===0) return null;
                return <Maker name = {`Sound Track ${index}`} url = {`https://universal-soundbank.com/sounds/${index}.mp3`} />
            })}
    */
    return (
        <div style = {styles.container}>
            <p>Sound Board</p>
            <div style = {styles.container}>
                {tracks.map (track => (
                    <Maker
                        name        = {track.name}
                        url         = {track.url}
                        onClick   = {() => play ()}
                    />
                ))}
            </div>
        </div>
    )
}

export default SoundBoard;
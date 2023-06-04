import { CSSProperties, useState } from "react";

const BackgroundSlider = () => {
    const [getImageIndex, setImageIndex]        = useState (0);
    const [animIsRunning, setAnimIsRunning]     = useState (false);
    const styles:{[key:string]:CSSProperties}   = {
        container: {
            position: 'relative',
            display: 'flex',
            height: '100vh',
            width: '100vw',
            alignItems: 'center',
            justifyContent: "center",
        },
        container_background: {
            position: 'absolute',
            top:0,
            bottom:0,
            left:0,
            right:0,
            filter: `blur(5px)`,
            backgroundSize: "100%",
            transitionDuration: '2s',
        },
        container_mini_background: {
            position: 'absolute',
            display: "flex",
            top:"15%",
            height: '70%',
            width: '70%',
            zIndex: 1,
            backgroundSize: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 15,
            transitionDuration: '2s',
        },
        logo: {
            position:'absolute',
            top:'50px'
        },
        buttons: {
            padding: '10px',
            backgroundColor: "transparent",
            color:"black",
            margin: "15px",
            borderRadius: 5,
            borderWidth: 5,
            borderColor:"black",
        }
    }


    const ToggleVisibility = () => {
        const buttons = document.getElementsByClassName ('visible-buttons') as HTMLCollectionOf <HTMLElement>;

        setAnimIsRunning (true);

        buttons[0].style.opacity = '0';
        buttons[1].style.opacity = '0';

        let timeout = setTimeout (() => {
            buttons[0].style.opacity = '1';
            buttons[1].style.opacity = '1';

            setAnimIsRunning (false);
            clearTimeout (timeout)
        }, 2500);
    }
    return (
        <div style={{
            ...styles.container,
        }}>
            <div style = {{
                ...styles.container_background,
                backgroundImage: `url(${require('../assets/vc_background_' + getImageIndex + '.jpg')})`
            }}/>
            <div style = {{
                ...styles.container_mini_background,
                backgroundImage: `url(${require('../assets/vc_background_' + getImageIndex + '.jpg')})`
            }}>
                <button
                    className = "visible-buttons"
                    style       = {styles.buttons}
                    onMouseDown = {evt => {
                        if (!animIsRunning) {
                            setImageIndex (index => {
                                if (index === 0) return 4;
                                return index-1;
                            });

                            ToggleVisibility ();
                        }
                    }}
                >
                    Prev
                </button>
                <button
                    className = "visible-buttons"
                    style       ={styles.buttons}
                   // onMouseUp   = {evt => evt.currentTarget.style.opacity = '1'}
                    onMouseDown = {evt => {
                        if (!animIsRunning) {
                            setImageIndex (index => {
                                if (index === 4) return 0;
                                return index+1;
                            });

                            ToggleVisibility ()
                        }
                    }}
                >
                    Next
                </button>

            </div>
            <p style = {styles.logo}>Background Slider</p>
        </div>
    )
}

export default BackgroundSlider;
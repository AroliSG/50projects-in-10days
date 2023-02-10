import React, {
    CSSProperties,
    useEffect,
    useState
} from 'react';

let lastTypeAim: string;
const ProgressStepsView = () => {
    const [getIndexMethod, setIndexMethod]      = useState (0);
    const [getSwatches, setSwatches]            = useState (4);
    const [getSliderSize, setSliderSize]        = useState (400);
    const [getAnimReached, setAnimReached]      = useState (false);
  //  const [getTotalWidth, setTotalWidth]        = useState (0);

    const styles: { [key: string]: CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            height: "100%",
        },
        button_container: {
            alignSelf: "center"
        },
        buttons: {
            margin: 5,
            padding: 15,
            color: "white",
            fontSize: "2.5vh",
            backgroundColor: "#5865F2",
            borderRadius: 15
        },
        slider: {
            position: "relative",
            height: 5,
            width: getSliderSize,
            backgroundColor: "white",
            marginBottom: 15
        },
        steps: {
            display: 'flex',
            height: "1.5vw",
            width: "1.5vw",
            borderRadius: 15,
            backgroundColor: "#5865F2",
            position: "absolute",
            top: "-.65vw",
            justifyContent: "center",
            alignItems: "center",
        },
        inputs_container: {
            marginBottom: "55px",
            backgroundColor: "#5865F2",
            padding: '10px',
            borderRadius: 15
        },
        inputs: {
            borderRadius: 5,
            backgroundColor: "#282c34",
            color: 'white'
        },
        div_container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: "center",
        },
        Label: {
            fontSize: '15px',
            paddingRight: "10px",
            margin: "5px"
        }
    }

    useEffect (() => {
        let frames = 0;
        let element         = document.getElementsByClassName ('track') as HTMLCollectionOf<HTMLElement>;

        function step () {
            const original_right  = (getSliderSize/(getSwatches-1)) * (getIndexMethod-1);
            const original_left  = (getSliderSize/(getSwatches-1)) * (getIndexMethod+1);
            frames++;
                // repeating
            if (frames < getSliderSize/(getSwatches-1)) {
                window.requestAnimationFrame(step);
            }
            else {
                setAnimReached (true);
            }
                //  const elementWidth = element[0].style.width;
            if (lastTypeAim === "left")  element[0].style.width = original_left - frames +  "px";
            if (lastTypeAim === "right") element[0].style.width = original_right + frames +  "px";

           // setTotalWidth (parseInt (elementWidth, 10));
        }
        window.requestAnimationFrame(step);
    }, [getIndexMethod]);

    return (
        <div style={styles.container}>
            <p>Progress Steps</p>
            <div
                style={styles.inputs_container}
            >
                <div style={styles.div_container}>
                    <p style={styles.Label}>Slider Size</p>
                    <input
                        type        = {"number"}
                        value       = {getSliderSize}
                        style       = {styles.inputs}
                        onChange    = {evt => {
                                // if it is empty means 0
                            if (evt.target.value === '') evt.target.value = "0";

                                // saving it
                            setSliderSize (parseInt (evt.target.value, 10))
                        }}
                    />
                </div>
                <div style={styles.div_container}>
                    <p style={styles.Label}>Swaps Count</p>
                    <input
                        type        = {"number"}
                        value       = {getSwatches}
                        style       = {styles.inputs}
                        onChange    = {evt => {
                                // if it is empty means 0
                            if (evt.target.value === '') evt.target.value = "0";

                                // saving it
                            setSwatches (parseInt (evt.target.value, 10))
                        }}
                    />
                </div>
            </div>

            <div style={styles.slider}>
                    {/* tracking line */}
                <div
                    className   = 'track'
                    style       = {{
                        height: 5,
                        backgroundColor: "#5865F2",
                        marginBottom: 15,
                        width: 0
                    }}
                />
                {
                Array (getSwatches).fill (null).map ((_,index) => {
                        // getting specific border for each swap when toggling between swaps
                    const getSpecificBorderOnTime = () => {
                        if (getIndexMethod >= index && getAnimReached) return 5;
                        else if (getIndexMethod > index || index === 0) return 5;
                        else return 15;
                    }

                    return (
                        <div style={{
                            display: 'flex',
                            height: 25,
                            width: 25,
                            borderRadius: getSpecificBorderOnTime (),
                            backgroundColor: "#5865F2",
                            position: "absolute",
                            top: -25/2,
                            left: (getSliderSize/(getSwatches-1)) * (index),
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <b style = {{
                                fontSize: '.8vw',
                            }}>{index}</b>
                        </div>
                    )}
                )}

            </div>

                {/* buttons */}
            <div style={styles.button_container}>
                <button
                    style   = {styles.buttons}
                    onMouseDown = {evt => {
                            // anim just started, we must wait to end to reproduce the swap border size changing
                        setAnimReached (false);

                            // aiming
                        lastTypeAim = "left";

                            // counting swatches -> decreasing
                        setIndexMethod (n => {
                            if (n === 0) return 0;
                            return n-1;
                        });

                            // button opacity
                        evt.currentTarget.style.opacity = ".5";
                    }}
                    onMouseUp   = {evt => evt.currentTarget.style.opacity = "1"}
                >Prev</button>

                <button
                    style   = {styles.buttons}
                    onMouseDown = {evt => {
                            // anim just started, we must wait to end to reproduce the swap border size changing
                        setAnimReached (false);

                            // aiming
                        lastTypeAim = "right";

                            // counting swatches -> increasing
                        setIndexMethod (n => {
                            if (n === (getSwatches-1)) return (getSwatches-1);
                            return n+1;
                        });

                            // button opacity
                        evt.currentTarget.style.opacity = ".5";
                    }}
                    onMouseUp   = {evt => evt.currentTarget.style.opacity = "1"}
                >Next</button>
            </div>
        </div>
    )
}

export default ProgressStepsView;
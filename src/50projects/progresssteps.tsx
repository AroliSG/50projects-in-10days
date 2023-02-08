import React, {
    CSSProperties,
    useEffect,
    useState
} from 'react';

let lastTypeAim: string;
let lastWidth: number;
const ProgressStepsView = () => {
    const [getIndexMethod, setIndexMethod]      = useState (0);
    const [getSwatches, setSwatches]            = useState (4);
    const [getSliderSize, setSliderSize]        = useState (400);
    const [getTotalWidth, setTotalWidth]        = useState (0);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            height: "100%",
        } as CSSProperties,
        button_container: {
            alignSelf: "center"
        } as CSSProperties,
        buttons: {
            margin: 5,
            padding: 15,
            color: "white",
            fontSize: "2.5vh",
            backgroundColor: "#5865F2",
            borderRadius: 15
        } as CSSProperties,
        slider: {
            position: "relative",
            height: 5,
            width: getSliderSize,
            backgroundColor: "white",
            marginBottom: 15
        } as CSSProperties,
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
        } as CSSProperties
    }

    useEffect (() => {
        let startStamp = 0;
        let element         = document.getElementsByClassName ('track') as HTMLCollectionOf<HTMLElement>;

        function step () {
            const original_right  = (getSliderSize/(getSwatches-1)) * (getIndexMethod-1);
            const original_left  = (getSliderSize/(getSwatches-1)) * (getIndexMethod+1);
            startStamp++;
                // repeating
            if (startStamp < getSliderSize/(getSwatches-1)) {
                window.requestAnimationFrame(step);
            }
            const elementWidth = element[0].style.width;
            if (lastTypeAim === "left")  {
                element[0].style.width = getTotalWidth - startStamp +  "px";
            }
            if (lastTypeAim === "right") {
                element[0].style.width = getTotalWidth + startStamp +  "px";
            }

            setTotalWidth (parseInt (elementWidth, 10));
        }
        window.requestAnimationFrame(step);
    }, [
        getIndexMethod]);

    return (
        <div style={styles.container}>
            <p>Progress Steps</p>
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
                    return (
                        <div style={{
                            display: 'flex',
                            height: 25,
                            width: 25,
                            borderRadius: 15,
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
                        lastTypeAim = "left";
                        setIndexMethod (n => {
                            if (n === 0) return 0;
                            return n-1;
                        });

                        evt.currentTarget.style.opacity = ".5";
                    }}
                    onMouseUp   = {evt => evt.currentTarget.style.opacity = "1"}
                >Prev</button>

                <button
                    style   = {styles.buttons}
                    onMouseDown = {evt => {
                        lastTypeAim = "right";
                        setIndexMethod (n => {
                            if (n === (getSwatches-1)) return (getSwatches-1);
                            return n+1;
                        });

                        evt.currentTarget.style.opacity = ".5";
                    }}
                    onMouseUp   = {evt => evt.currentTarget.style.opacity = "1"}
                >Next</button>
            </div>
        </div>
    )
}

export default ProgressStepsView;
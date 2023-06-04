import { CSSProperties, useEffect, useState } from "react";

let animId = 0;
const AnimatedCountDown = () => {
    const [animationId, setAnimationId] = useState (0);
    const [getIsForce, setIsForce]      = useState (0);

    const styles:{[key:string]: CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        label: {
            margin: 0,
            color: "aqua",
            fontSize: '2vw',
            transitionDuration: "200ms",
            transform: 'translateY(50px) translateX(50px) rotate(90deg)',
            overflow: 'hidden',
            zIndex: -999
        },
        restart: {
            margin: 0,
            padding: 20,
            backgroundColor: "salmon",
            borderRadius: 10
        }
    }

        // animation system properties
    useEffect(() => {
        const element = document.getElementsByClassName ("rotNumber") as HTMLCollectionOf <HTMLElement>;
            // first animation
        const interval = setInterval(() => {
                // making the moving animation
            if (animId === 0) element[0].style.transform = 'translateY(-10px) translateX(-15px)';
                // if animation is already 3 we must avoid these animations
                // @ts-ignore
            if (animationId !== 4) {
                if (animId === 2) element[0].style.transform = 'rotate(60deg)';
                    // hiding animation
                if (animId === 3) element[0].style.transform = 'translateY(50px) translateX(-50px) rotate(-60deg)';
                    // reset animation
                if (animId === 5) {
                    animId = -1;
                    setAnimationId (idx => idx+1);
                    element[0].style.transform = 'translateY(50px) translateX(50px) rotate(90deg)';
                }
                animId++;
            }
        }, 500);

        return () => {
            clearInterval (interval);
        };
    });

    const getCorrectLabels = (3-animationId) !== -1 ? (3-animationId) : "GO";
    return (
        <div style={styles.container} key = {getIsForce}>
            <p>Animated Count Down</p>
            <div style={{
                ...styles.container,
            }}>
                <p className = "rotNumber" style = {styles.label}>{getCorrectLabels}</p>
                <p
                    onClick={() => {
                            // only forcing when the animation is done
                        if (getCorrectLabels === "GO") {
                            animId = 0;
                            setAnimationId (0);
                            setIsForce (f => f+1);
                        }
                    }}
                    style   = {styles.restart}
                >{getCorrectLabels === "GO" ? "Restart Event" : "Event Started"}</p>
            </div>
        </div>
    )
}

export default AnimatedCountDown;
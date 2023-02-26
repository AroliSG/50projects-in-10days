import { CSSProperties } from "react";

const AnimatedCountDown = () => {
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
            transitionDelay: '2s',
            transform: 'rotate(160deg)',
            overflow: 'hidden'
        }
    }

    return (
        <div style={styles.container}>
            <p>Animated Count Down</p>
            <div style={{
                ...styles.container,
            }}>
                <p style = {styles.label}>2</p>
                <p style={{
                    margin:0
                }}>GET READY</p>
            </div>
        </div>
    )
}

export default AnimatedCountDown;
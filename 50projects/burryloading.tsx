import { CSSProperties, useEffect, useState } from "react";


const LOADING_LIMIT = 100;
const BurryLoading = () => {
    const [getLoadingIndex, setLoadingIndex]    = useState (0);
    const [getBlur, setBlur]                    = useState (20);

    const styles: { [key: string]: CSSProperties }= {
        container: {
            position: 'relative',
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold'
        },
        label: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '8vw'
        }
    }

    useEffect (() => {
        let frames = 0;
        const step = () => {
            frames++;
            if (frames < LOADING_LIMIT) {
                window.requestAnimationFrame (step);
            }

            if (frames%10===0) setBlur(f=>f-1);
            setLoadingIndex (frames);

        }
        window.requestAnimationFrame (step);
    }, []);

    return (
        <div style = {styles.container}>
           <img
                alt         = {'alt-burry'}
                className   = "img-blur"
                style       = {{
                    width: '100%',
                    filter: `blur(${getBlur}px)`
                }}
                src     = {require ('../assets/vc_background_2.jpg')}
            />
            <div
                style={styles.label}
            >{getLoadingIndex} %</div>
        </div>
    )
}

export default BurryLoading;
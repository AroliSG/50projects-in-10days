import { CSSProperties, useEffect } from "react";


    // frames per sec
let frames = 0;

    // animation reproduced every 50frames
let animations = 0;

    // target that was used or being used at the moment
let target = 0;

    // interval
let interval: NodeJS.Timer;

    // rotation
let rot: {[key:number]:string}       = {
    0: 'translate(-25%,50%)',
    1: 'translate(25%,-50%)',
    2: 'translate(0%,100%)',
    3: 'translate(0%,-100%)',
    4: 'translate(25%,50%)',
    5: 'translate(-25%,-50%)',
    6: 'translate(0%,0%)',
    7: 'translate(0%,0%)'
}

const KineticLoader = () => {
    const styles: {[key:string]: CSSProperties} = {
        container: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        parent: {
            position: 'relative',
            display: "flex",
            justifyContent: 'center',
            alignItems: "center",
            flexDirection: 'column',
            width: '200px',
            height: '200px',
            margin: '50px'
        },
        triangle: {
            width: 0,
            height: 0,
            borderStyle: 'solid',
            transitionDuration: '200ms',
        },
        dot: {
            position: 'absolute',
            width: '30px',
            height: '30px',
            borderRadius: 15,
            backgroundColor: '#282c34',
            zIndex: 1
        }
    }

    const moveIt = (element: HTMLElement, rot: string) => {
        const rotation = parseInt (element.style.rotate, 10);
        const deg = isNaN(rotation) ? 0 : rotation;

        element.style.rotate       = `${deg + 90}deg`;
        element.style.transform    = rot;

        animations += 1;
        if (animations > 7) animations =0 ;
    }

    useEffect (() => {
        animations  = 0;
        target      = 0;

        const elements  = document.getElementsByClassName ('triangles') as HTMLCollectionOf <HTMLElement>;

        interval = setInterval (() => {
                // updating triangles every 5 frames
            if (frames%5===0) {
                    /*
                        @{target}
                        target to be used, we have 2 targets 0 and 1
                        which are the 2 triangles
                    */
                if (target === 0) target = 1;
                else target = 0;

                    /*
                        @{moveIt}
                        moving the triangle to the desire position
                    */
                moveIt (elements[target], rot[animations]);
            }
            frames++;
        }, 50);

        return () => clearInterval (interval);
    }, []);

    return (
        <div style = {styles.container}>
            <p>Kinetic Loader</p>
            <div style = {styles.parent}>
                <div
                    className   = "triangles"
                    style       = {{
                        ...styles.triangle,
                        borderWidth: '100PX 100px 0px 100px',
                        borderColor: 'white transparent transparent transparent',
                    }}
                />

                <div style={styles.dot}/>

                <div
                    className   = "triangles"
                    style       = {{
                        ...styles.triangle,
                        borderWidth: '0 100px 100px 100px',
                        borderColor: 'transparent transparent white transparent',
                    }}
                />
            </div>
        </div>
    )
}


export default KineticLoader;
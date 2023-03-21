import { CSSProperties, useEffect, useState } from "react";

const DrawingApp = () => {
    const [getClickEvent, setClickEvent]        = useState (false);
    const [getForceReload, setForceReload]      = useState (0);
    const [getBrushSize, setBrushSize]        = useState (5);
    const styles: {[key:string]: CSSProperties} = {
        container: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

        },
        canvas: {
            height: '700px',
            width: '700px',
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10
        },
        components: {
            height: '700px',
            width: '150px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "#5865F2",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10
        },
        mini_box: {
            margin: 5,
            height: '50px',
            width: '50px',
            backgroundColor: "white",
            fontSize: '25px',
            fontWeight: 'bold',
            borderRadius: 5,
        }
    }

    const moveIt =  (evt: MouseEvent) => {
        const canvas    = document.getElementsByClassName ('canvas') as HTMLCollectionOf <HTMLElement>;
        const rect      = canvas[0].getBoundingClientRect ();

        let point       = document.createElement('span');

        point.setAttribute('class','message');
        point.innerHTML = ".";
        point.style.position = 'absolute'
        point.style.zIndex = '1';
        point.style.color = 'black';
        point.style.fontSize = `${getBrushSize}vw`
        point.style.pointerEvents = 'none'
        point.style.top = `${evt.pageY-rect.top}px`;
        point.style.left = `${evt.pageX-rect.left+((rect.width/2))}px`;

        const top_limiter = evt.pageY > rect.top;
        const bottom_limiter = evt.pageY < rect.width + rect.top;
        const left_limiter = evt.pageX > rect.left;
        const right_limiter = evt.pageX < rect.height + rect.left;

        if (
            top_limiter &&
            bottom_limiter &&
            left_limiter &&
            right_limiter &&
            getClickEvent
        ) canvas[0].appendChild (point);
    }

    useEffect (() => {
        document.addEventListener ('mousemove', moveIt);
        return () => {
            document.removeEventListener ('mousemove', moveIt);
        }

        // eslint-disable-next-line
    }, [getClickEvent, getBrushSize]);

    return (
        <div style = {styles.container} key = {getForceReload}>
            <p>Drawing App</p>
            <div style = {{
                display: 'flex'
            }}>
                <div
                    className   = "canvas"
                    style       = {styles.canvas}
                    onMouseDown = {() => setClickEvent (true)}
                    onMouseUp   = {() => setClickEvent (false)}
                />
                <div style = {styles.components}>
                    <button
                        onClick={() => setForceReload (f=>f+1)}
                        style = {{
                            ...styles.mini_box,
                            ...styles.container
                        }}
                    >C.</button>
                    <button
                        style = {{
                            ...styles.mini_box,
                            ...styles.container
                        }}
                        onClick = {() => setBrushSize (size => {
                            if (size <= 0) return 1;
                            else return size-1;
                        })}
                    >-</button>
                    <button
                        style = {{
                            ...styles.mini_box,
                            ...styles.container
                        }}
                    >{getBrushSize}</button>
                    <button
                        style = {{
                            ...styles.mini_box,
                            ...styles.container
                        }}
                        onClick = {() => setBrushSize (size => {
                            if (size >= 20) return 20;
                            else return size+1;
                        })}
                    >+</button>
                </div>
            </div>
            <p>
                This app can be really buggy since it was not created using native canvas,
                not recommended for personal projects can get really laggy too
            </p>
        </div>
    )
}

export default DrawingApp;
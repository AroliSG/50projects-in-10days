import { CSSProperties, useEffect, useState } from "react";

type MouseCodeTypes = {
    [key: number]: {
        code: string,
        key: string,
        keyCode: number
    }
}

const MouseCodes: MouseCodeTypes = {
    1: {
        code: "ClickLeft",
        key: "left",
        keyCode: 1
    },
    2: {
        code: "ClickRight",
        key: "right",
        keyCode: 2
    },
    4: {
        code: "ClickScroll",
        key: "scroll",
        keyCode: 1
    }
}


const EventKeycodes = () =>{
    const [getKeyboard, setKeyboard]        = useState <KeyboardEvent> ();
    const [getMouseClick, setMouseClick]    = useState <MouseEvent> ();
    const styles:{[key: string]: CSSProperties} = {
        container: {
            display: 'flex',
            margin: 15,
            flexDirection: 'column',
            alignItems: 'center'
        },
        box: {
            display: 'flex',
            backgroundColor: "#5865F2",
            width: '200px',
            height: '50px',
            margin: 5,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            borderRadius: 10
        },
        label: {
            fontSize: '1.2vw',
            fontWeight: 'bold'
        }
    }

    useEffect (() => {
        const keyboard = (key: KeyboardEvent) => setKeyboard (key);

        const mouse = (click: MouseEvent) => {
            console.log (click.buttons)
            setMouseClick (click);
       //     console.log (key.button, key.buttons,key.metaKey,key.type)
        }

        document.addEventListener ('mousedown', mouse)
        document.addEventListener ('keypress', keyboard);

        return () => {
            document.removeEventListener ('keypress', keyboard);
            document.removeEventListener ('mousedown', mouse);
        }
    }, []);
 
    return (
        <div style = {styles.container}>
            <p>Keycodes</p>
            {getKeyboard ?
                <div style = {styles.container}>
                    <div style = {styles.box}>
                        <label style= {styles.label}>{getKeyboard.code}</label>
                    </div>

                    <div style = {styles.box}>
                        <label style= {styles.label}>{getKeyboard.key}</label>
                    </div>

                    <div style = {styles.box}>
                        <label style= {styles.label}>{getKeyboard.keyCode}</label>
                    </div>

                    <p>Clickcodes</p>
                    <div style = {styles.box}>
                        <label style= {styles.label}>{MouseCodes[getMouseClick!.buttons] ? MouseCodes[getMouseClick!.buttons].code : 'not found'}</label>
                    </div>

                    <div style = {styles.box}>
                        <label style= {styles.label}>{MouseCodes[getMouseClick!.buttons] ? MouseCodes[getMouseClick!.buttons].key : 'not found'}</label>
                    </div>

                    <div style = {styles.box}>
                        <label style= {styles.label}>{MouseCodes[getMouseClick!.buttons] ?MouseCodes[getMouseClick!.buttons].keyCode : getMouseClick!.buttons}</label>
                    </div>

                </div>
                :
                <div style = {styles.box}>
                    <label style= {styles.label}>Press any key</label>
                </div>
            }
        </div>
    )
}

export default EventKeycodes;
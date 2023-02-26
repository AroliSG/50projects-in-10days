import { CSSProperties, useState } from "react";


const LABEL_DELAY   = 60;
const FIRST_INPUT   = "Email";
const SECOND_INPUT  = "Password";

const FormWavy = () => {
    const [getFirstInput, setFirstInput]    = useState ('');
    const [getSecondInput, setSecondInput]  = useState ('');

    const styles: { [key: string]: CSSProperties } = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: "#5865F2",
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
        },
        inputs_container: {
            position: 'relative',
            display:'flex',
            margin: 15,
            flexDirection: 'column'
        },
        inputs: {
            width: '15vw',
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderBottomWidth: 2,
            borderColor: 'white',
            outline: 0,
            fontSize: '0.9vw',
            color: 'white'
        },
        input_label_container: {
            display: "flex",
            flexDirection: "row",
            height: "40px",
            position: 'absolute',
            margin: 0,
            fontSize: '0.9vw',
            top: "-2px",
            left: 5,
            pointerEvents: 'none',
        },
        span: {
            transitionDuration: '0.5s',
            fontSize: '0.9vw',
        },
        button: {
            padding: 15,
            color: "ActiveBorder",
            width: "90%",
            borderRadius: 5,
            borderWidth: 0,
            margin: 15
        }
    }

    const moveIt = (pos: number, class_name: string) => {
        const element = document.getElementsByClassName (class_name) as  HTMLCollectionOf <HTMLElement>;

            /*
                just to avoid the labels to go downwards if text is presented
            */
        if (class_name === FIRST_INPUT && getFirstInput !== '' && pos===0) return 1;
        if (class_name === SECOND_INPUT && getSecondInput !== '' && pos===0) return 1;

        for (let i = 0; i < element.length; i++) {
                /*
                    translating the labels 1by1 to their destination
                    which is Y: 20px and Y:0 downwards
                */
            element[i].style.transitionDelay = `${i * LABEL_DELAY}ms`
            element[i].style.transform = `translateY(-${pos}px)`;

                /*
                    * Zero means, label is going downwards
                    so we must reset the opacity
                */
            if (pos === 0)  element[i].style.opacity = `.9`;

                /*
                    * One means, label is going upwards
                    we changing the opacity to make it look darker
                */
            else element[i].style.opacity = `.5`;
        }
    }

    return (
        <div>
            <p>Form Wavy</p>
            <div style = {styles.form} >
                <h4>Log In</h4>
                <div style = {styles.inputs_container}>
                    <div style = {styles.input_label_container}>
                        {Array (FIRST_INPUT.length).fill (null).map ((_, index) => <span className = {FIRST_INPUT} style={styles.span}>{FIRST_INPUT.charAt (index)}</span>)}
                    </div>
                    <input
                        required
                        value       = {getFirstInput}
                            // moving up the label
                        onFocus     = {() => moveIt (20, FIRST_INPUT)}
                            // this means we need to move it back in the label
                        onBlur      = {() => moveIt (0, FIRST_INPUT)}
                        style       = {styles.inputs}
                        onChange    = {evt => setFirstInput (evt.currentTarget.value)}
                    />
                </div>
                <div style = {styles.inputs_container}>
                    <div style = {styles.input_label_container}>
                        {Array (SECOND_INPUT.length).fill (null).map ((_, index) => <span className = {SECOND_INPUT} style={styles.span}>{SECOND_INPUT.charAt (index)}</span>)}
                    </div>

                    <input
                        required
                        value       = {getSecondInput}
                            // moving up the label
                        onFocus     = {() => moveIt (20, SECOND_INPUT)}
                            // this means we need to move it back in the label
                        onBlur      = {() => moveIt (0, SECOND_INPUT)}
                        style       = {styles.inputs}
                        onChange    = {evt => setSecondInput (evt.currentTarget.value)}
                    />
                </div>
                <input
                    style   = {styles.button}
                    value   = {'Log In'}
                    type    = {"button"}
                    onMouseDown = {evt=>evt.currentTarget.style.opacity = '0.5' }
                    onMouseUp = {evt=> evt.currentTarget.style.opacity = '1'}
                />
                <label style = {styles.span}
                >Don't have an account?
                    <label style = {{
                        color: "aqua"
                    }}> Register</label>
                </label>
            </div>
        </div>
    )
}

export default FormWavy;
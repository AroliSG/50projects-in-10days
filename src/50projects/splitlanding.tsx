import { CSSProperties } from "react";

const SplitLanding = () => {
    const styles: { [key: string]: CSSProperties } = {
        container: {
            position: 'absolute',
            display: 'flex',
            top:"50px",
            bottom: 0,
            left: 0,
            right:0,
            overflow: 'hidden'
        },
        Title: {
            position: 'absolute',
            transitionDuration: '3s',
            zIndex: 9,
            fontWeight: 'bold',
            top: '0%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        button_container: {
            display: 'flex',
            position: 'absolute',
            transitionDuration: '3s',
            zIndex: 9,
            fontWeight: 'bold',
            top: '40%',
            flexDirection: 'column'
        },
        Label: {
            fontSize: '1.2vw',
        },
        button: {
            display: 'flex',
            fontSize: '1.2vw',
            color: 'white',
            padding: 15,
            fontWeight: 'bold',
            borderStyle: "solid double",
            justifyContent: "center",
            alignItems: 'center',
            transitionDuration: '3s',
        },
        img: {
            position: 'absolute',
            height: '100%',
            transitionDuration: '3s'
        }
    }

    return (
        <div style = {styles.container}>
            <p style = {styles.Title}>Split Landing</p>

            <div className = 'buttons' style = {{
                ...styles.button_container,
                ...{
                    left: "15%"
                }
            }}>
                <p style = {styles.Label}>Vice City Modded vehicles 0.1</p>
                <div style={styles.button}>
                   GET IT FREE NOW
                </div>
            </div>

            <div className = 'buttons' style = {{
                ...styles.button_container,
                ...{
                    right: '15%'
                }
            }}>
                <p style = {styles.Label}>Vice City Modded building 0.5</p>
                <div style={styles.button}>
                    GET IT FREE NOW
                </div>
            </div>

            <img
                alt             = {'split-0'}
                src             = {require ('../assets/vc_background_2.jpg')}
                style           = {{
                    ...styles.img,
                    ...{
                        left: '50%',
                        width: '70%',
                    }
                }}
                className       = 'img-1'
                onMouseOver     = {evt => {
                    let childs         = document.getElementsByClassName ('buttons') as HTMLCollectionOf<HTMLElement>;
                    let element         = document.getElementsByClassName ('img-2') as HTMLCollectionOf<HTMLElement>;

                        // moving target
                    evt.currentTarget.style.left = "30%";

                        // moving childs
                    childs[1].style.right = "25%";
                    childs[0].style.left = "5%";

                        // moving sibling
                    element[0].style.left = "-40%";
                }}

                onMouseOut     = {evt => {
                    let childs         = document.getElementsByClassName ('buttons') as HTMLCollectionOf<HTMLElement>;
                    let element         = document.getElementsByClassName ('img-2') as HTMLCollectionOf<HTMLElement>;

                        // moving target
                    evt.currentTarget.style.left = "50%";

                        // moving childs
                    childs[1].style.right = "15%";
                    childs[0].style.left = "15%";

                         // moving child
                    element[0].style.left = "-20%";
                }}
            />

            <img
                alt         = {'split-0'}
                src             = {require ('../assets/vc_background_1.jpg')}
                style           = {{
                    ...styles.img,
                    ...{
                        left: '-20%',
                        width: '70%',
                    }
                }}
                className       = 'img-2'
                onMouseOver     = {evt => {
                    let childs         = document.getElementsByClassName ('buttons') as HTMLCollectionOf<HTMLElement>;
                    let element         = document.getElementsByClassName ('img-1') as HTMLCollectionOf<HTMLElement>;

                        // moving target
                    evt.currentTarget.style.left = "0%"

                        // moving child
                    childs[0].style.left = "25%";
                    childs[1].style.right = "5%";

                        // moving sibling
                    element[0].style.left = "70%"
                }}

                onMouseOut     = {evt => {
                    let childs         = document.getElementsByClassName ('buttons') as HTMLCollectionOf<HTMLElement>;
                    let element         = document.getElementsByClassName ('img-1') as HTMLCollectionOf<HTMLElement>;

                        // moving target
                    evt.currentTarget.style.left = "-20%"

                        // moving child
                    childs[0].style.left = "15%";
                    childs[1].style.right = "15%";

                    // moving sibling
                    element[0].style.left = "50%"
                }}
            />
        </div>
    );
}

export default SplitLanding;
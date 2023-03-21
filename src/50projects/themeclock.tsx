import { CSSProperties, useEffect, useState } from "react";

const CLOCK_SIZE            = 400;

/*
    future updates
    add text around the circle to make it look real
    let CIRCLE_CIRCUMFERENCE    = (2 * Math.PI * (CLOCK_SIZE / 2)) / 12
*/


const ThemeClock = () => {
    const [toggleMode,setToggleMode]        = useState (0);
    const [toggle24Mode,setToggle24Mode]    = useState (true);

    const styles:{[key:string]:CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        needle_hrs: {
            position: 'absolute',
            backgroundColor: 'white',
            height: CLOCK_SIZE/8,
            width: 2,
            zIndex: 1,
            top: '45%',
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 10,
            transitionDuration: '2s',
            opacity:0
        },
        needle_mins: {
            position: 'absolute',
            backgroundColor: 'white',
            height: CLOCK_SIZE/5,
            width: 2,
            zIndex: 2,
            top: '40%',
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 10,
            transitionDuration: '2s',
            opacity:0
        },
            // seconds
        needle_secs: {
            position: 'absolute',
            backgroundColor: 'red',
            height: CLOCK_SIZE/5,
            width: 2,
            zIndex: 3,
            top: '40%',
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 10,
            opacity:0
        },
        clock:{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            backgroundColor: 'black',
            marginTop: 20,
            height: CLOCK_SIZE,
            width: CLOCK_SIZE,
            borderRadius: CLOCK_SIZE / 2,
            transitionDuration: '2s'
        },
        clock_labels: {
            position: 'relative',
            top: 0
        },
        dial: {
            position: 'absolute',
            height: 10,
            width: 10,
            backgroundColor:"white",
            borderRadius: 10,
            zIndex: 4,
            transitionDuration: '2s'
        },
        label: {
            marginTop: '20px',
            fontSize: "3vw",
        },
        date: {
            margin:0,
            fontSize: "1vw",
            color: 'gray'
        },
        button: {
            borderRadius: 6,
            padding: 10,
            transitionDuration: '2s',
            margin: 2
        }
    }

    useEffect (() => {
        const needles = document.getElementsByClassName ('needles') as HTMLCollectionOf <HTMLElement>;
        const digital = document.getElementsByClassName ('digital-clock') as HTMLCollectionOf <HTMLElement>;

        const interval = setInterval (() => {
            const date              = new Date ();

            const localString       = date.toLocaleString('en-US', { hour: 'numeric' });
            const hours             = parseInt (localString, 10);
            const minutes           = date.getMinutes ();
            const seconds           = date.getSeconds ();

            const secs_deg  = (seconds / 60) * 360;
            const mins_deg  = (minutes / 60) * 360 + (seconds / 60);

            const hours_deg = (hours/ 12) * 360 + (minutes / 60) + (seconds / 60);

                // updating digital clock
            digital[0].innerText = date.toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', hour12: toggle24Mode });

                // updating digital date
            digital[1].innerText = date.toLocaleString('en-us', {  weekday: 'long', month: 'long', day: 'numeric' });

            needles[0].style.opacity = '1';
            needles[2].style.opacity = '1';
            needles[1].style.opacity = '1';

                // moving each needle depending on degrees
                // updating secs needle
            needles[0].style.transform = `rotate(${180 + secs_deg}deg) translate(0%,50%)`;

                // updating mins needle
            needles[1].style.transform = `rotate(${170 + mins_deg}deg) translate(0%,50%)`;

                // update hours needle
            needles[2].style.transform = `rotate(${180 + hours_deg}deg) translate(0%,50%)`;
        }, 1000);

        return () => {
            clearInterval (interval);
        }
    }, [toggleMode, toggle24Mode]);


    const background_mode =  { backgroundColor: toggleMode ? 'black': 'white' };
    return (
        <div style={styles.container}>
            <p>Theme Clock</p>
            <button
                onClick = {() => setToggleMode (mode => mode === 1 ? 0: 1)}
                style   = {{
                    ...styles.button,
                    ...background_mode,
                    color: toggleMode ? 'white': 'black',
                }}
            >{toggleMode ? 'Dark Mode' : 'Light Mode'}</button>
            <button
                onClick = {() => setToggle24Mode (mode => !mode)}
                style   = {{
                    ...styles.button,
                    ...background_mode,
                    color: toggleMode ? 'white': 'black',
                }}
            >{toggle24Mode ? '24 mode off' : '24 mode on'}</button>

            <div style={{
                ...styles.clock,
                backgroundColor: toggleMode ? 'white': 'black'
            }}>
                <div style = {{
                    ...styles.dial,
                    ...background_mode
                }} />
                    {/*
                        needle for seconds
                    */}
                <div className="needles" style = {styles.needle_secs} />
                    {/*
                        needle for minutes
                    */}
                <div className="needles"  style = {{
                    ...styles.needle_mins,
                    ...background_mode
                }} />
                    {/*
                        needle for hours
                    */}
                <div className="needles" style = {{
                    ...styles.needle_hrs,
                    ...background_mode
                }} />
            </div>

            <label className = 'digital-clock' style={styles.label}>12:00 AM</label>
            <label className = 'digital-clock' style={styles.date}>Tuesday, FEB 11</label>
        </div>
    )
}

export default ThemeClock;
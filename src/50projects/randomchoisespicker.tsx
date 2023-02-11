import { CSSProperties, useEffect, useState } from "react";

const RandomChoicePicker = () => {
    const [getInputText,setInputText]           = useState ('');
    const [getRandomized,setRandomized]         = useState (0);
    const [getIsRunning, setIsRunning]          = useState (false);

    const styles: {[key:string]:CSSProperties} = {
        container: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center"
        },
        input: {
            outline: 0,
            width: '500px',
            textAlign: 'center',
            borderRadius: 5,
        },
        title: {
            fontSize: '1.2vw',
        },
        button: {
            padding: 5,
            fontSize: '0.9vw',
            fontWeight: 'bold',
            borderRadius: 5,
            marginRight: 5
        },
        randomize_container: {
            margin: 5,
            display: 'flex',
            flexWrap: 'wrap',
            width: "50%"
        },
        randomize_label: {
            margin: 5,
            fontSize: '0.9vw',
            backgroundColor: "#5865F2",
            padding: 5,
            borderRadius: 5,
        }
    }


    useEffect (() => {
        const element   = document.getElementsByClassName ('randomized') as HTMLCollectionOf <HTMLElement>;


            // looping through the elements
        const loop = (
            start: (rand: number, index?: number) => void,
            end?: (rand: number, index?: number) => void
        ) => {
            for (let i = 0; i < element.length; i++) {
                const rand    = Math.floor (Math.random () * element.length);
                    // ending the animation
                let endTimeout = setTimeout (() => {
                    if (end) end (rand, i);
                    clearTimeout (endTimeout);
                }, i * 130 );

                    // starting the animation
                let starTimeout = setTimeout (() => {
                    start (rand, i);
                    clearTimeout (starTimeout);
                }, i * 120 );
            }
        }

        loop ((rand) => {
            try {
              //  let timeout = setTimeout (() => {
/*
                    if (index+1 === element.length) {
                            // task is done so user can start a new one
                        setIsRunning (false);

                            // lets scale the random chosen and change the color to it
                        element[random].style.backgroundColor = 'gold';
                        element[random].style.transform = 'scale(1.5)';
                    }*/
                  //  clearTimeout (timeout);
              //  }, index*55);

                    // transition 
               // element[index].style.transitionDelay = `${index*50}ms`
                element[rand].style.backgroundColor = 'gray';
            }
            catch (e) {
            }
        }, (rand, index) => {
                // converting back old elements that were changed but not to original
            element[index!].style.backgroundColor   = "#5865F2";
            element[index!].style.transform         = 'scale(1)';

                // converting random element chosen before to normal color
            element[rand].style.backgroundColor = "#5865F2";

                // anim finished
            if (index!+1 === element.length) {
                    // lets scale the random chosen and change the color to it
                element[rand].style.backgroundColor = 'gold';
                element[rand].style.transform = 'scale(1.5)';
                setIsRunning (false);
            }
        })

        if (element.length === 0) setIsRunning (false);
    }, [getRandomized]);

    return (
        <div style = {styles.container}>
            <p>Random Choice Picker</p>
            <p style = {styles.title}>Separate by spaces and then click randomize</p>
            <div style={{
                ...styles.container,
                flexDirection: 'row'
            }}>
                <button
                    disabled        = {getIsRunning}
                    style           = {styles.button}
                    onMouseDown     = {evt => {
                        setIsRunning (true);
                        setRandomized (f=>f+1);
                        evt.currentTarget.style.opacity = '0.5';
                    }}
                    onMouseUp       = {evt => evt.currentTarget.style.opacity = '1'}
                >
                    {getIsRunning ? 'Fetching...' : 'Randomize'}
                </button>

                <textarea
                    style       ={styles.input}
                    placeholder = "Separate with spaces"
                    onChange    = {evt => {
                        const text = evt.target.value;
                        setInputText (text);
                    }}
                />
            </div>
            <div style={styles.randomize_container}>
                {
                    getInputText.length > 1
                        &&
                    getInputText
                    .split (' ')
                    .map ((word, index) => {
                            // removing spaces
                        const w = word.replaceAll (' ', '');
                        if (w === '') return null;

                            // showing actual text
                        return (
                            <label
                                className   = "randomized"
                                style       = {styles.randomize_label}
                            >{word}</label>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RandomChoicePicker;
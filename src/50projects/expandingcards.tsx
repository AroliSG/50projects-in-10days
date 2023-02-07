import { useEffect, useState, CSSProperties} from 'react';

type ImageProps = {
    index: number;
}

const FRAMES_LIMIT = 65;
const GUI_SIZE     = 5;



const ExpandingCardsView = () => {
    const [getFrameRate, setFrameRate]  = useState (FRAMES_LIMIT);
    const [getGUISize, setGUISize]      = useState (GUI_SIZE);
    const [getImg, setImg] = useState <{
        id: string|undefined,
        last: string|undefined,
    }> ({
        id: undefined,
        last: undefined,
    });


    const styles = {
        expanding_container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            height: "100%",
        },
        imgLabel: {
            position: 'absolute',
            bottom: "55px",
            paddingLeft: '25px',
            opacity: 0
        },
        img_expanding: {
            height: "75vh",
            width: getGUISize + "vw",
            padding: "10px",
            borderRadius: "25px",
            objectFit:"cover"
        },
        expandingcards: {
            display: "flex",
            flexDirection: "row"
        }
    };

    useEffect (() => {
        const mediaQuery = window.matchMedia("(max-width: 900px)");
        const mediaQuery2 = window.matchMedia("(min-width: 900px)");

        const mediaEvent = (evt: MediaQueryListEvent) => {
            if (evt.matches) {
                setFrameRate (45);
                setGUISize (15);
            }
            else {
                setFrameRate (FRAMES_LIMIT);
                setGUISize (GUI_SIZE);
            }
        }
        mediaQuery2.addEventListener('change', mediaEvent);
        mediaQuery.addEventListener('change', mediaEvent);

        return () => {
            mediaQuery2.removeEventListener ('change', mediaEvent);
            mediaQuery.removeEventListener ('change', mediaEvent);
        }
    })

    useEffect (() => {
        let element         = document.getElementsByClassName ('img-expanding') as HTMLCollectionOf<HTMLElement>;
        let elementLabel    = document.getElementsByClassName ('imgLabel') as HTMLCollectionOf<HTMLElement>;

        let startStamp = 0;
        let opacity    = 0;

        function step() {
            startStamp++;
                // repeating/limit
            if (startStamp < getFrameRate) window.requestAnimationFrame(step);

                // looping through elements
            for (let item in element) {
                if (typeof element[item] === 'object' && getImg.id !== undefined) {
                    const elementTouched = element[parseInt (getImg?.id, 10)];
                        /*
                            * Import method
                            @[Resetting data]
                            @[Same Item was clicked]
                        */
                    if (getImg?.last === getImg?.id) {
                        const getImgData = {...getImg};
                        getImgData!.last = undefined;
                        getImgData!.id = undefined;
                        setImg (getImgData);

                        elementLabel[parseInt (getImg?.last,10)].style.opacity = `0`;
                        element[parseInt (getImg?.last,10)].style.width = `${(getFrameRate+getGUISize)-startStamp}vw`;
                    }
                        /*
                            * Increasing method
                            We are increasing the size of the image to 50vw
                        */

                    else if (getImg?.id === item) {
                        if (startStamp%8===0) opacity += 0.1;
                        elementTouched.style.width = `${startStamp}vw`;
                        elementLabel[parseInt (getImg?.id,10)].style.opacity = `${opacity}`
                    }


                        /*
                            * Decreasing method
                            We are decreasing the size of the image to 5vw
                        */

                    else if (getImg?.last !== undefined && getImg?.last !== getImg?.id) {
                        elementLabel[parseInt (getImg?.last,10)].style.opacity = `0`;
                        element[parseInt (getImg?.last,10)].style.width = `${(getFrameRate+getGUISize)-startStamp}vw`;
                    }
                }
            }
        }

        window.requestAnimationFrame(step);
    }, [
        getImg,
        getFrameRate,
        getGUISize
    ]);


    const Image = (props: ImageProps) => {
        const {
            index
        } =  props;

        return (
            <div >
                <p style={styles.imgLabel as CSSProperties} className = {'imgLabel'}>Custom Paragraph</p>
                <img
                    onClick={() => {
                        const getImgData = {...getImg};
                            // saving the id before this element
                        getImgData!.last = getImgData!.id;

                            // saving id
                        getImgData!.id = index.toString ();
                        setImg (getImgData);
                    }}
                    alt         = {(index).toString ()}
                    className   = {`img-expanding`}
                    style       = {styles.img_expanding as CSSProperties}
                    src         = {require (`../assets/vc_background_${index}.jpg`)}
                />

            </div >
        )
    }

    const normalize = getGUISize !== 5 ? [0,1,2] : [0,1,2,3,4]
    return (
        <div style = {styles.expanding_container as CSSProperties}>
            <p>Expanding Cards</p>
            <div style={styles.expandingcards as CSSProperties}>
                {normalize.map (index => <Image index = {index} />)}
            </div>
        </div>
    )
}

export default ExpandingCardsView;
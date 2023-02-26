import { CSSProperties, useEffect, useState } from "react";


const BORDER_RADIUS         = 25;
const LITER                 = 3;
const BOTTLES_TO_BE_DRINK   = 8;

const WATER_COLOR           = 'rgb(103, 161, 255)';

type MiniBottlesTypes = {
    ml: number,
    index: number
}

const DrinkWater = () => {
        // 4*250 1/4 of the bottle
    const [getLiterLimit, setLiterLimit]    = useState (LITER);
    const [getCupPerDay, setCupPerDay]      = useState (BOTTLES_TO_BE_DRINK);

    const BOTTLE_LT             = getLiterLimit * 1000;
    const ML_PER_BOTTLE         = parseInt ((BOTTLE_LT / getCupPerDay).toString (),10)


    const styles: {[key: string]: CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        parent: {
            display: 'flex',
        },
        bottle_container: {
            display: 'flex',
            position: 'relative',
            height: '35vh',
            width: '8vw',
            border: '5px solid black',
            borderRadius: BORDER_RADIUS,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            justifyContent: "center",
            alignItems: 'flex-end'
        },
        bottle_water: {
            position:"absolute",
            display: 'flex',
            backgroundColor: 'white',
            width: "100%",
            height: "0%",
            borderRadius: BORDER_RADIUS-5,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            bottom: 0,
            zIndex: 0,
            transitionDuration: "2s"
        },
        label: {
            position:"absolute",
            fontSize: '1.2vw',
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents:"none",
            zIndex: 9,
        },
        input: {
        }
    }


    useEffect (() => {
        const percent_label = document.getElementsByClassName ('percent-label') as HTMLCollectionOf<HTMLElement>;
        const bottle_water  = document.getElementsByClassName ('water') as HTMLCollectionOf<HTMLElement>;
        bottle_water[0].style.height = `0%`;
        percent_label[0].style.opacity = '0';
    }, [getLiterLimit, getCupPerDay]);

    const mini_bottles_clicked = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        const percent_label = document.getElementsByClassName ('percent-label') as HTMLCollectionOf<HTMLElement>;
        const mini_bottle   = document.getElementsByClassName ('mini-bottle') as HTMLCollectionOf<HTMLElement>;
        const bottle_water  = document.getElementsByClassName ('water') as HTMLCollectionOf<HTMLElement>;

        let percent = parseInt (((index+1)/getCupPerDay * 100).toString (), 10);

            // mini bottles
        for (let i = 0; i < getCupPerDay; i++) {
            const duration    = (i*1) * 0.5;

            mini_bottle[i].style.transitionDuration = `${2+duration}s`;

                // if element was double clicked with must change the background to white
            if (i === index && mini_bottle[i].style.backgroundColor === WATER_COLOR) {
               mini_bottle[i].style.height = "0%";
               mini_bottle[i].style.backgroundColor = "white";
            }

                // assigning the water color to each
            else if (i <= index) {
                mini_bottle[i].style.backgroundColor = WATER_COLOR;
                mini_bottle[i].style.height = "100%";
            }

                // returning color white
            else {
                mini_bottle[i].style.height = "0%";
                mini_bottle[i].style.backgroundColor = "white";
            }
        }
            /*
                bottle 0 is empty so, we must set the percent to 0
                removing opacity when bottle is empty and return it back when is filling up
            */
        if (index === 0 && mini_bottle[0].style.backgroundColor === "white") {
            percent = 0;
            percent_label[0].style.opacity = '0';
        } else {
            percent_label[0].style.opacity = '1';
        }

            // label
            // percent label
        percent_label[0].innerText = `${percent.toString ()}%`;
        percent_label[0].style.transitionDuration = `1s`;
        percent_label[0].style.height = `${percent}%`;

            // bottle
            // bottle water will get on time synchronized with the mini bottles
        bottle_water[0].style.transitionDuration = `1s`;
        bottle_water[0].style.height = `${percent}%`;
        bottle_water[0].style.backgroundColor = WATER_COLOR;
    }

    const MiniBottles = (props: MiniBottlesTypes) => {
        return (
            <div style = {{
                ...styles.container,
                margin: 5
            }}>
                <div
                    onClick     = {evt => mini_bottles_clicked (evt, props.index)}
                    style       = {{
                        ...styles.bottle_container,
                        height: '15vh',
                        width: '3.5vw',
                        marginInline: 10
                    }}
                >
                    <div className  = "mini-bottle" style ={styles.bottle_water} />
                    <label style={styles.label}>{props.ml} ml</label>
                </div>
            </div>
        )
    }

    return (
        <div style={styles.container}>
            <p>Drink Water</p>
            <h6 style = {{margin:5}}>Goal 3LT</h6>

            <div style = {styles.parent} >
                <div style={styles.bottle_container}>
                    <div className = "water" style ={styles.bottle_water}/>
                    <label
                        className   = "percent-label"
                        style       = {{
                        ...styles.label,
                        position: "relative",
                        opacity:0
                    }}>12.5%</label>
                </div>

                <div style = {{
                    ...styles.container,
                    margin: '15px'
                }}>
                    <label
                        style       = {{
                        ...styles.label,
                        position: "relative",
                        color: WATER_COLOR
                    }}>Liter</label>
                    <input
                        style   = {styles.input}
                        value   = {getLiterLimit}
                        type    = 'number'
                        onChange={evt => {
                            if (evt.target.value === '') evt.target.value = '0';
                            setLiterLimit (parseInt (evt.target.value, 10));
                        }}
                    />

                    <label
                        style       = {{
                        ...styles.label,
                        position: "relative",
                        color: WATER_COLOR,
                        marginTop: 10
                    }}>Glass per day</label>
                    <input
                        style   = {styles.input}
                        value   = {getCupPerDay}
                        type    = 'number'
                        onChange={evt => {
                            if (evt.target.value === '') evt.target.value = '0';
                            setCupPerDay (parseInt (evt.target.value, 10));
                        }}
                    />
                </div>
            </div>

                <h6 style = {{margin:5}}>Select how many water you drank today!</h6>
            <div
                style = {{
                    ...styles.container,
                    flexDirection: 'row',
                    margin: 25,
                    width: '80vw',
                    flexWrap: 'wrap'
                }}
            >
                {Array (getCupPerDay).fill (ML_PER_BOTTLE).map ((ml, index) => <MiniBottles ml = {ml} index = {index} />)}
             </div>
        </div>
    )
}

export default DrinkWater;
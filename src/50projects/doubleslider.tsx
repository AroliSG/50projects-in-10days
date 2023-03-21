import { CSSProperties, useState } from "react";
const colors = [
    '#1e81b0',
    '#eeeee4',
    '#e28743',
    '#eab676',
    '#76b5c5'
];

const DoubleSlider = () => {
    const [getMoveIt,setMoveIt] = useState (4);
    const styles:{[key:string]:CSSProperties} = {
        container: {
            position: 'relative',
            display: 'flex',
            height: '95vh',
            width: '100vw',
            overflow: 'hidden',
 
            justifyContent: 'center',
            alignItems: 'center',
        },
        img: {
            display: 'flex',
            position: 'absolute',
            height: '100%',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'flex-end',
            transitionDuration: '2s',
        },
        button: {
            position: 'absolute',
            height: '5%',
            width: '10%',
            backgroundColor: 'white',
            borderWidth: 0,
            color:'gray',
            fontSize: '0.8vw'
        },
        label: {
            alignSelf: "center",
            color: 'black',
            fontSize: '1.2vw'
        }
    }

    const animateIt = (
        y1: number,
        y2: number,
        dir: string,
        limit: number
    ) => {
        try {
            setMoveIt (n => {
                    // move limit between 0-4
                if (n === limit) return limit;

                    // updating direction
                    // moving up/down
                const special = dir === "+" ? n+1 : n-1;

                    // calling elements
                const left = document.getElementsByClassName ('left') as HTMLCollectionOf <HTMLElement>;
                const right = document.getElementsByClassName ('right') as HTMLCollectionOf <HTMLElement>;

                    // translating elements
                    // right is going opposite to left
                    // if left is goes up then right goes down
                right[special].style.transform = 'translateY(0%)';
                right[n].style.transform = `translateY(${y1}%)`;

                left[special].style.transform = 'translateY(0%)';
                left[n].style.transform = `translateY(${y2}%)`;

                    // returning the updated special number
                return special;
            })
        }catch (e){console.log(e)}
    }

    return (
        <div style = {styles.container}>
            <p style={{ 
                ...styles.label,
                position: 'absolute',
                zIndex: 4,
                top:0,
                left:0,
                right:0,
                textAlign: 'center',
                fontWeight: 'bolder',
                color: 'yellow'
            }}>Double Slider</p>
            {Array (5).fill ("Custom Paragraph").map ((_,index) => {
                let unique: CSSProperties = index===4 ? {} : { transform: 'translateY(-100%)' };

                return <div
                    className   = "left"
                    style       = {{
                        ...styles.img,
                        width: '30%',
                        left:0,
                        backgroundColor: colors[index],
                        zIndex: 1,
                        ...unique
                    }}
                >
                    <p style = {styles.label}>{_}</p>
                    <button
                        style   = {{
                            ...styles.button,
                            right: '-10%',
                            top: '49.9%',
                            zIndex: 3,
                            borderBottomRightRadius: 10,
                            borderTopRightRadius: 10,
                            display: getMoveIt === 0 ? 'none' : 'unset'
                        }}
                        onClick = {() => animateIt (-100,100,'-',0)}
                    >
                        <i className="fa fa-arrow-down"/>
                    </button>
                    <button
                        style   = {{
                            ...styles.button,
                            bottom: '49.9%',
                            borderBottomLeftRadius: 10,
                            borderTopLeftRadius: 10,
                            display: getMoveIt === 4 ? 'none' : 'unset'
                        }}
                        onClick = {() => animateIt (100,-100,'+',4)}
                    >
                       <i className="fa fa-arrow-up"/>
                    </button>
                </div>}
            )}

            {
                // right image
            Array (5).fill (null).map ((_,index) => {
                let unique: CSSProperties = index===4 ? {} : { transform: 'translateY(100%)' };
                return <img
                    className   = "right"
                    style       = {{
                        ...styles.img,
                        right:0,
                        width: '70%',
                        objectFit: 'cover',
                        zIndex: 0,
                        ...unique
                    }}
                    alt         = {`slider-${index}`}
                    src         = {require (`../assets/vc_background_${index}.jpg`)}
                />
            }
        )}
        </div>
    )
}

export default DoubleSlider;

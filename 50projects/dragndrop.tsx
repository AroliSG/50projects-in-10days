import { CSSProperties, useState } from "react";



const DragDrop = () => {
    const [getBoxCount, setBoxCount] = useState (4);
    const [getDragPos, setDragPos]   = useState ({top:'0', left:'0'})

    const styles: {[key:string]: CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        box_container: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        box: {
            height: '200px',
            width: '200px',
            backgroundColor: 'white',
            margin: 5,
            borderRadius: 10,
            border: '10px solid black',
        },
        input:{
            outline: 0,
            padding: 5,
            borderRadius: 10
        }
    }

    const Box = () => {
        return (
            <div>
                <div
                    style       = {styles.box}
                    onDragEnter = {evt=> {
                        setDragPos ({
                            top: `${evt.currentTarget.getBoundingClientRect().y-5}px`,
                            left: `${evt.currentTarget.getBoundingClientRect().x-5}px`,
                        });
                    }}
                />
            </div>
        )
    }

    return (
        <div style={styles.container}>
            <p>Drag N Drop</p>
            <input
                value       = {getBoxCount}
                type        = 'number'
                onChange    = {evt => {
                    if (evt.currentTarget.value === '') evt.currentTarget.value = '0';
                    setBoxCount (parseInt (evt.currentTarget.value ,10))
                }}
                style       = {styles.input}
            />
            <div style = {styles.box_container}>
                <img
                    draggable  = {true}
                    className   = "image-drag"
                    onDrag      = {evt => {
                        evt.currentTarget.style.top = evt.clientY + 'px';
                        evt.currentTarget.style.left = evt.clientX + 'px';
                    }}

                    onDragEnd  ={evt => {
                        const img = document.getElementsByClassName ("image-drag") as HTMLCollectionOf <HTMLElement>;
                        img[0].style.top = getDragPos.top;
                        img[0].style.left = getDragPos.left;
                    }}

                    alt     = "dragndrop"
                    src     = {require ('../assets/vc_background_3.jpg')}
                    style   = {{
                        ...styles.box,
                        position: 'absolute'
                    }}
                />

                {Array (getBoxCount).fill (null).map ((_,index) => <Box />)}
            </div>
        </div>
    )
}

export default DragDrop;
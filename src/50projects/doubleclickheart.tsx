import { CSSProperties, useState } from "react";

const DoubleClickHeart = () => {
    const [getClickedCount, setClickedCount]     = useState (0);
    const styles: {[key:string]: CSSProperties} = {
        container: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        img: {
            marginTop: '20px',
            width: '200px',
            height: '200px',
            borderRadius: 10
        },
        icon: {
            position: 'absolute',
            color: 'red',
            fontSize: '0vw',
            fontWeight: 'bold',
            transitionDuration: '200ms',
            textAlign: 'center',
        }
    }

    return (
        <div>
            <p>Double Click Heart</p>
            <p style = {{
                fontSize: '1vw',
                textAlign: 'center'
            }}>Like counter {getClickedCount}</p>
            <img
                alt             = 'double-heart'
                src             = {require ('../assets/vc_background_3.jpg')}
                style           = {styles.img}
                onDoubleClick   = {(evt) => {
                    const offset    = 20;
                    const icon      = document.getElementsByClassName ('fa fa-heart') as HTMLCollectionOf <HTMLElement>;

                        // scaling 3vw cuz its was 0vw before
                        // moving to mouse position
                        // opacity to 1 to show text
                    icon[0].style.fontSize  = '3vw';
                    icon[0].style.top       = (evt.pageY-offset) + 'px';
                    icon[0].style.left      = (evt.pageX-offset) + 'px';
                    icon[0].style.opacity   = '1';

                        // removing heart from screen
                        // opacity to 0 and scaling to 10vw
                    setTimeout (() => {
                        icon[0].style.fontSize  = '10vw';
                        icon[0].style.opacity   = '0';
                    },500);
                    setClickedCount (c => c+1);
                }}
            />
            <i
                style       = {styles.icon}
                className   = "fa fa-heart"
            />
        </div>
    )
}

export default DoubleClickHeart;
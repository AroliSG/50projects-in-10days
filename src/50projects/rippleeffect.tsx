import { CSSProperties } from "react";

const RippleEffect = () => {
    const styles: {[key:string]:CSSProperties}= {
        buttonStyle: {
            position: 'relative',
            margin: 40,
            paddingInline: '20px',
            borderRadius: 5,
            backgroundColor: "#5865F2",
            overflow: 'hidden'
        },
        ripple: {
            position: 'absolute',
            backgroundColor: 'white',
            width: '0%',
            height: '0%',
         //  transform: `scale(0)`,
            transitionDuration: '500ms',
            opacity:0.1,
            pointerEvents: 'none',
            border: '1px solid black'
        },
        label: {
            margin: 0,
            fontSize: '2vw',
            padding: 15,
            pointerEvents: 'none'
        }
    }

    const controller = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const offset = { x: 50, y: 20 };
        const ripple = document.getElementsByClassName ('ripple') as HTMLCollectionOf <HTMLElement>;
        const rect  = evt.currentTarget.getBoundingClientRect ()

        const e = ripple[0].style;
        const box_width = (rect.left/2) + offset.x;
        const box_height = (rect.top/2) + offset.y;

        if (evt.pageX/2 > box_width) {
            e.right = '0%';
            e.left = 'auto';
        }
        else {
            e.right = 'auto';
            e.left = '0%';
        }

        if (evt.pageY/2 < box_height) {
            e.top = '0%';
            e.bottom = 'auto';
            e.borderRadius        = '400px'

            if (e.right === 'auto') e.borderTopLeftRadius = '0px';
            else e.borderTopRightRadius = '0px'
        }
        else {
            e.top                 = 'auto';
            e.bottom              = '0%';
            e.borderRadius        = '400px'

            if (e.right === 'auto') e.borderBottomLeftRadius = '0px';
            else e.borderBottomRightRadius = '0px'
        }

        ripple[0].style.width = '400px';
        ripple[0].style.height = '200px';

        setTimeout (() => {
            ripple[0].style.width = '0%';
            ripple[0].style.height = '0%';
        }, 500)
    }

    return (
        <div>
            <div
                style        = {styles.buttonStyle}
                onMouseDown  = {controller}
            >
                <span className="ripple" style = {styles.ripple}/>
                <p style={styles.label}>CLICK ME</p>
            </div>
        </div>
    )
}

export default RippleEffect;
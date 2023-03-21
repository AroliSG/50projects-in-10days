import { CSSProperties } from "react";

const input_size = 300;
const AnimatedNavigation = () => {
    const styles: { [key: string]: CSSProperties } = {
        container: {
            display: 'flex',
            margin: '20px',
            alignItems: 'center',
            flexDirection: 'column',
        },
        nav_icon: {
            display: 'flex',
            paddingBlock: '20px',
            paddingInline: '30px',
            backgroundColor:  "white",
            borderWidth: 0,
            justifyContent: "center",
            alignItems: 'center',
            flexDirection: 'column',
        },
        search_container: {
            display: 'flex',
        },
        nav: {
            display: 'flex',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            transitionDuration: "1s",
            width: input_size,
            borderWidth: 0,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: 'center'
        },
        equal_signs: {
            height: "3px",
            width: "20px",
            backgroundColor:  "#5865F2",
            margin: 3,
            transitionDuration: "1s",
        },
        label: {
            fontSize: '0.8vw',
            color:  "black",
            paddingRight: 5,
            fontWeight: 'bolder',
            transitionDuration: "1s",
        }
    }

    const mousedown = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const labels = document.getElementsByClassName ('labels') as HTMLCollectionOf<HTMLElement>;
        const equals = document.getElementsByClassName ('equal') as HTMLCollectionOf<HTMLElement>;
        const element = document.getElementsByClassName ('input') as HTMLCollectionOf<HTMLElement>;

            // opening up
        if (element[0].style.width === '0px') {
            element[0].style.width = input_size + 'px';

            equals[0].style.transform = `rotate(50deg) translateY(1px) translateX(5px)`;
            equals[1].style.transform = `rotate(-50deg) translateY(-1px) translateX(5px)`

            for (let i = 0; i<labels.length; i++) {
                labels[i].style.transform = `translateX(0px)`;
                labels[i].style.opacity = '1';
            }
        }
            // closing
        else {
            for (let i = 0; i<labels.length; i++) {
                labels[i].style.transform = `translateX(200px) rotate(-180deg) scale(1.5)`;
                labels[i].style.opacity = '0';
            }

            element[0].style.width = '0px';

            equals[0].style.transform = `rotate(180deg)`;
            equals[1].style.transform = `rotate(-180deg)`
        }
    }

    return (
        <div style={styles.container}>
            <p>Animated Navigation</p>
            <div style = {styles.search_container}>
                <div className = 'input' style = {styles.nav}>
                    <label className="labels" style = {styles.label}>Home</label>
                    <label className="labels" style = {styles.label}>About Us</label>
                    <label className="labels" style = {styles.label}>Contact</label>
                    <label className="labels" style = {styles.label}>Docs</label>
                </div>
                <button
                    style   = {styles.nav_icon}
                    onMouseDown = {mousedown}
                    onMouseUp   = {evt => evt.currentTarget.style.opacity = '1'}
                >   <div className = {'equal'} style = {styles.equal_signs} />
                    <div className = {'equal'} style = {styles.equal_signs} />
                </button>
            </div>
        </div>
    )
}
export default AnimatedNavigation
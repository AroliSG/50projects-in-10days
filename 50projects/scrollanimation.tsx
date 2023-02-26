import {
    CSSProperties,
    useEffect
} from "react";

let lastAim = "right";
let oldScrollY = 0;

const boxCount = 10;
const ScrollAnimation = () => {
    const styles: { [key: string]: CSSProperties } = {
        container: {
            display: 'flex',
            width: '100vw',
            margin: "20px",
            overflowX: 'hidden',
            alignItems: 'center',
            flexDirection: 'column'
        },
        box: {
            display: 'flex',
            height: '300px',
            width: '300px',
            backgroundColor: "#5865F2",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: 'center',
            margin: "15px",
            transitionDuration: "2s",
        }
    }

    useEffect (() => {
        let element         = document.getElementsByClassName ('boxes') as HTMLCollectionOf<HTMLElement>;
        let height          = window.innerHeight;
            /*
                credits: https://stackoverflow.com/questions/62497110/detect-scroll-direction-in-react-js
                for this function controlDirection
            */

        const controlDirection = () => {
            let dir = 0;
            if(window.scrollY > oldScrollY) dir = 0;
            else dir = 1;

            oldScrollY = window.scrollY;

            return dir;
        }

        const onScroll = (evt: Event) => {
            const aim = controlDirection ();

            for (let i = 0; i < element.length; i++) {
                const boxes         = element[i].getBoundingClientRect ();

                let aimPos = "-" + (height*2);
                    // changing direction of the boxes
                if (lastAim === 'right') {
                    aimPos = (height*2).toString ();
                    lastAim = "left"
                }
                else lastAim = "right";

                    // scrolling down
                if (aim === 0) {
                        // translating to the sides
                    if(boxes.top > height) element[i].style.transform = `translateX(${aimPos}px)`;

                        // translating to the middle
                    else element[i].style.transform = `translateX(0px)`;
                }

                    // scrolling up
                if (aim === 1) {
                        // translating to the sides
                    if(boxes.bottom > height) element[i].style.transform = `translateX(${aimPos}px)`;

                        // translating to the middle
                    else element[i].style.transform = `translateX(0px)`;
                }
            }
        }

        document.addEventListener ('scroll', onScroll, { passive: true });

        return () => {
            document.removeEventListener ('scroll', onScroll);
        }
    },[])

    return (
        <div
            style       = {styles.container}
        >
            {Array (boxCount).fill (null).map ((_, index) => {
                return (
                    <div
                        className="boxes"
                        key     = {index}
                        style   = {styles.box}
                    >
                        <p>Empty box</p>
                    </div>
                )
            })}
        </div>
    )
}

export default ScrollAnimation;
import { CSSProperties } from "react";

const Hoverboard = () => {
    const styles: { [key: string]: CSSProperties } = {
        container: {
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            flexDirection: 'column'
        },
        gridContainer: {
            marginTop: 50,
            display: "grid",
            gridTemplateColumns: "repeat(20, 1fr)",
            gridRow: 20,
            padding: 20,
            gap: 5
        },
        points: {
            width: 20,
            height: 20,
            backgroundColor: "gray",
            transitionDuration: '100ms',
        }
    }

    const HoverEnter = (evt:  React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const r = Math.floor(Math.random () * 255);
        const g = Math.floor(Math.random () * 255);
        const b = Math.floor(Math.random () * 255);
        evt.currentTarget.style.backgroundColor = `rgba(${r}, ${g}, ${b})`;
    }

    const HoverOut = (idx: number) => {
            // deleting the colored from the specified element = idx is the id of the element
        setTimeout (() => {
            const element = document.getElementsByClassName ("boxId_"+idx) as HTMLCollectionOf <HTMLElement>;
            element[0].style.backgroundColor = "gray";
        }, 500)

    }

    return (
        <div style={styles.container}>
            <h1>Hoverboard</h1>
            <div style={styles.gridContainer}>
                {Array(500).fill (null).map ((_, idx) => <div className={"boxId_"+idx} onMouseEnter={HoverEnter} onMouseLeave={() => HoverOut (idx)} key = {idx} style={styles.points}/>)}
            </div>
        </div>
    )
}

export default Hoverboard;
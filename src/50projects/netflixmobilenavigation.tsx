import { CSSProperties } from 'react';


const toggleTimeout = 800;

/*
    layers percentage
*/

const layerWidth: {[key: number]: string } = {
    0: "90%",
    1: "95%",
    2: "100%",
}

const NetflixMobileNavigation = () => {

    const toggleSideBar = () => {
        const elements = document.getElementsByClassName ("layers") as HTMLCollectionOf <HTMLElement>;

        for (let i = 0; i < elements.length; i++) {
            const w                                 = elements[i].style.width as string;
            const idx                               = w === "0%" ? 3-i : i+1;

            elements[i].style.transitionDuration    = `${idx * toggleTimeout}ms`;
            elements[i].style.width                 = w === "0%" ? layerWidth[i] : "0%";
        }
    }

    return (
        <div style={styles.container}>

            <div style={styles.layerParent}>

                <div className = "layers" style={{
                    ...styles.layers,
                    backgroundColor: "white",
                    zIndex: 2,
                    width: "90%",
                }}>
                    <i className="fa fa-close" style={styles.closeIcon} onClick={toggleSideBar}></i>
                </div>

                <div className = "layers" style={{
                    ...styles.layers,
                    backgroundColor: "red",
                    zIndex: 1,
                    width: "95%",
                }}/>

                <div className = "layers" style={{
                    ...styles.layers,
                    backgroundColor: "black",
                    zIndex: 0
                }}/>

            </div>

            <i className="fa fa-bars" style={{
                ...styles.closeIcon,
                right: "auto",
                left: "0%",
                top: "0%",
            }} onClick={toggleSideBar}></i>

            <label>Netflix Mobile Navigation</label>

        </div>
    )
};


const styles: { [style: string]: CSSProperties } = {
    container: {
        display: 'flex',
        position: 'relative',
        height: "90vh",
        width: '100vw',
        justifyContent: 'center',
        alignItems : 'center',
    },
    layerParent: {
        height: "95vh",
        width: "700px",
        position: "absolute",
        left: "0%",
        top: "0%",
    },
    layers: {
        height: "100%",
        width: "100%",
        position: "absolute",
        display: "flex",
    },
    closeIcon: {
        color: "gray",
        fontSize: "45px",
        position: "absolute",
        right: "0%",
        margin: "20px"
    }
}
export default NetflixMobileNavigation;
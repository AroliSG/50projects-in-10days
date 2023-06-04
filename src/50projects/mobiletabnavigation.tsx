import { CSSProperties, useEffect, useState } from "react"

const bigify    = '1.2';
const smallify  = '1';

const colours = {
    first: "white",
    secondary: "black",
}

const HomeScreen = () => (
    <div>
        <h3 style={{margin:0}}>Home Screen</h3>
        <p style={{margin:0}}>Welcome to Home</p>
    </div>
)

const WorkScreen = () => (
    <div>
        <h3 style={{margin:0}}>Work Screen</h3>
        <p style={{margin:0}}>Welcome to Work</p>
    </div>
)


const BlogScreen = () => (
    <div>
        <h3 style={{margin:0}}>Blog Screen</h3>
        <p style={{margin:0}}>Welcome to Blog</p>
    </div>
)

const AboutUsScreen = () => (
    <div>
        <h3 style={{margin:0}}>AboutUs Screen</h3>
        <p style={{margin:0}}>Welcome to AboutUs</p>
    </div>
)



const MobileTabNavigation = () => {
    const [getNavigation, setNavigation] = useState (0);

    const screenStack = () => {
        if (getNavigation === 0) return <HomeScreen/>
        else if (getNavigation === 1) return <WorkScreen/>
        else if (getNavigation === 2) return <BlogScreen/>
        else return <AboutUsScreen/>
    }

    useEffect (() => {
        let lastItem        = 0;
        const items = document.getElementsByClassName ("tabItems") as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < items.length; i++) {
            const firstChild    = items[i].children[0] as HTMLElement;
            const secondChild   = items[i].children[1] as HTMLElement;

            items[i].addEventListener("mouseenter", () => {
                    // changing colours of only the children
                firstChild.style.color = colours.secondary;
                secondChild.style.color = colours.secondary;

                    // bigifying the whole thing
                items[i].style.scale = bigify;
            });

            items[i].addEventListener("mouseleave", () => {
                if (lastItem !== i) {
                    firstChild.style.color  = colours.first;
                    secondChild.style.color = colours.first;
                }
                    // smallifying the whole thing
                items[i].style.scale = smallify;
            });

            items[i].addEventListener("click", () => {
                const first = items[lastItem].children[0] as HTMLElement;
                const second = items[lastItem].children[1] as HTMLElement;

                first.style.color  = colours.first;
                second.style.color = colours.first;

                firstChild.style.color  = colours.secondary;
                secondChild.style.color = colours.secondary;

                lastItem = i;
                setNavigation(i);
            });
        }
    }, []);

    return (
        <div style={styles.container}>
            <h1>Mobile Tab Navigation</h1>
            <div style={styles.mobile}>
                <div style={styles.screen}>
                    {screenStack ()}
                </div>
                <div style={styles.bottom_tab}>

                    <div style={styles.tab_parent} className = "tabItems">
                        <i style={{
                            ...styles.icons,
                            color: colours.secondary
                        }} className="fa fa-home"></i>
                        <p style={{
                            ...styles.title,
                            color: colours.secondary
                        }}>Home</p>
                    </div>

                    <div style={styles.tab_parent} className = "tabItems">
                        <i style={styles.icons} className="fa fa-dropbox"></i>
                        <p style={styles.title}>Work</p>
                    </div>

                    <div style={styles.tab_parent} className = "tabItems">
                        <i style={styles.icons} className="fa fa-map"></i>
                        <p style={styles.title}>Blog</p>
                    </div>

                    <div style={styles.tab_parent} className = "tabItems">
                        <i style={styles.icons} className="fa fa-group"></i>
                        <p style={styles.title}>About Us</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

const styles: { [key: string]: CSSProperties } = {
    container: {

    },
    mobile: {
        position: "relative",
        borderRadius: 10,
        width: 400,
        height: 700,
        backgroundColor: "black",
        padding: 2.5
    },
    screen: {
        width: "100%",
        height: 700,
        backgroundColor: "gray",
        borderRadius: "10px 10px 0px 0px",
    },
    bottom_tab: {
        display: "inline-flex",
        backgroundColor: "red",
        width: "100%",
        height: "80px",
        borderRadius: "0px 0px 10px 10px",
        alignItems: "center",
        justifyContent: "center",
        gap: 60
    },
    icons: {
        fontSize: 20,
        color: "white",
        transitionDuration: '1s',
    },
    title: {
        fontSize: 15,
        color: "white",
        margin: 0,
        padding: 0,
        fontWeight: "bold",
        transitionDuration: '1s',
    },
    tab_parent: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        transitionDuration: '1s',
    }
}

export default MobileTabNavigation;
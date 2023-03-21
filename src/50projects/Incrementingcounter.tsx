import { CSSProperties, useEffect, useState } from "react";

const IncrementingCounter = () => {
    const [getTwitchCount,setTwitchCount]       = useState (0);
    const [getInstaCount,setInstaCount]         = useState (0);
    const [getFacebookCount,setFacebookCount]   = useState (0);

    const styles: {[key: string]: CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection:"column",
            height: "45vw",
            justifyContent: "center",
            alignItems:"center"
        },
        social_container: {
            display: 'flex',
            flexDirection:"column",
            margin: "50px",
            justifyContent: "center",
            alignItems: "center"
        },
        icon: {
            fontSize: '4vw',
            fontWeight: 'bold'
        },
        number: {
            fontSize: '2vw',
            fontWeight: 'bold'
        },
        label_body: {
            fontSize: '1vw',
            fontWeight: 'bold'
        }
    }

    useEffect (() => {
        const interval = setInterval (() => {
            setInstaCount (i => i+2);
            setTwitchCount (i => i+5);
            setFacebookCount (i => i+1);
        }, 100);

        return () => {
            clearInterval (interval);
        }
    }, []);

    return (
        <div style={styles.container}>
            <p>Incrementing Counter</p>
            <div style={{
                ...styles.container,
                flexDirection:"row",
            }}>
                <div style={styles.social_container}>
                    <i style = {styles.icon} className="fa fa-twitch" />
                    <label style = {styles.number}>{getTwitchCount}</label>
                    <label style = {styles.label_body}>Followers</label>
                </div>

                <div style={styles.social_container}>
                    <i style = {styles.icon} className="fa fa-instagram" />
                    <label style = {styles.number}>{getInstaCount}</label>
                    <label style = {styles.label_body}>Followers</label>
                </div>

                <div style={styles.social_container}>
                    <i style = {styles.icon} className="fa fa-facebook" />
                    <label style = {styles.number}>{getFacebookCount}</label>
                    <label style = {styles.label_body}>Followers</label>
                </div>
            </div>

        </div>
    )
}


export default IncrementingCounter;
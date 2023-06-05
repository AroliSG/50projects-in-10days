import axios from "axios";
import { CSSProperties, useEffect, useState} from "react";

type Slack = {
    fallback: string;
    footer: string;
    text: string;
}

const DadJokes = () => {
    const [getJokeSlack, setJokeSlack]              = useState <Slack> ();
    const [getForceReload, setForceReload]          = useState (0);
    const styles: {[key: string]: CSSProperties}    = {
        square: {
            display: 'flex',
            flexDirection: 'column',
            width: "700px",
            height: "300px",
            backgroundColor: "white",
            alignItems: "center",
            padding: 10,
            border: "1px solid black",
            borderRadius: "15px",
            position: 'relative',
        },
        label: {
            color: "black",
            margin: 0,
            padding: 10,
        },
        button: {
            height: "50px",
            width: "175px",
            position: "absolute",
            bottom: 15,
            fontSize: "20px",
        }
    };

    useEffect(() => {
        const url = 'https://icanhazdadjoke.com/slack';
        (async () => {
            const slack = await axios.get(url);
            setJokeSlack (slack.data.attachments[0]);
        })();
    }, [getForceReload]);

    return (
        <div>
            <h3>Dad Jokes</h3>
            <div style = {styles.square} key = {getForceReload}>
                <p style = {styles.label}>Free Edition</p>
                <p style = {styles.label}>{getJokeSlack?.fallback}</p>
                <button style={styles.button} onClick={() => setForceReload (f => f+1)}>Another joke</button>
            </div>
        </div>
    )
};

export default DadJokes;
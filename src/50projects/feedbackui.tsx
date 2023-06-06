import {CSSProperties, useState} from 'react';


const rating = {
    Satisfied: "Thank you!",
    Neutral: "Are you okay?",
    Unsatisfied: "So sorry to hear that! We'll improve for you!"
}
const FeedbackUI = () => {
    const [getFeedback, setFeedback] = useState("none");
    const [getTemplate, setTemplate] = useState(true);

    const onHoverOutEvents = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => evt.currentTarget.style.boxShadow = "0px 0px 0px 0px transparent";
    const onHoverOverEvents = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => evt.currentTarget.style.boxShadow = "0px 0px 5px 5px gray";

        // feedback content
    const onClickEvents = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const content = evt.currentTarget.lastChild?.textContent!;
      setFeedback (content);
    };

    const RateTemplate = () => (
        <div style={styles.box}>
            <p style={styles.title}>Please, rate us. How satisfied are you with our customer support?</p>
            <div style={styles.box_container}>

                <div style={styles.parent} onClick={onClickEvents} onMouseEnter={onHoverOverEvents} onMouseLeave={onHoverOutEvents}>
                    <img
                        alt     = "happy"
                        style   = {styles.img}
                        src     = {require('../assets/happy.png')}
                    />
                    <p style={styles.label}>Satisfied</p>
                </div>

                <div style={styles.parent} onClick={onClickEvents} onMouseEnter={onHoverOverEvents} onMouseLeave={onHoverOutEvents}>
                    <img
                        alt     = "neutral"
                        style   = {styles.img}
                        src     = {require('../assets/neutral.png')}
                    />
                    <p style={styles.label}>Neutral</p>
                </div>

                <div style={styles.parent} onClick={onClickEvents} onMouseEnter={onHoverOverEvents} onMouseLeave={onHoverOutEvents}>
                    <img
                        alt     = "unhappy"
                        style   = {styles.img}
                        src     = {require('../assets/unhappy.png')}
                    />
                    <p style={styles.label}>Unsatisfied</p>
                </div>

            </div>
            <button style={styles.button} onClick={() => setTemplate (false)}>Send rating</button>
        </div>
    );

    const RatedTemplate = () => (
        <div style={styles.box}>
            <img
                alt     = "heart"
                style   = {{
                    ...styles.img,
                    alignSelf: 'center',
                }}
                src     = {require('../assets/heart.png')}
            />
            <p style={styles.title}>{rating[getFeedback as never]}</p>
            <p style={styles.title}>Feedback: {getFeedback}</p>
            <p style={styles.label}>We'll use your feedback to improve our customer support</p>
        </div>
    )

    return (
        <div>
            <h2>Feedback UI</h2>
            {getTemplate? < RateTemplate /> : < RatedTemplate />}
        </div>
    )
}

const styles: {[key: string]: CSSProperties} = {
    box: {
        display: 'flex',
        width: "500px",
        height: "400px",
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "0px 0px 5px 5px gray",
        flexDirection: "column",
        textAlign: "center"
    },
    box_container: {
        display: 'flex',
        justifyContent: "space-around",
        alignItems: "center",
    },
    img: {
        height: '100px',
        width: '100px',
    },
    label: {
        fontSize: "20px",
        color: "black",

    },
    title: {
        color: "black",
        fontWeight: "bold",
        margin: 0,
        fontSize: "20px",
        marginTop: '20px'
    },
    parent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        marginTop: '10px'
    },
    button: {
        height: "50px",
        width: "150px",
        alignSelf: "center",
        fontSize: "20px",
        borderRadius: "5px",
        backgroundColor: "black",
        color: "white",
        marginTop: "25px"
    }
};


export default FeedbackUI;
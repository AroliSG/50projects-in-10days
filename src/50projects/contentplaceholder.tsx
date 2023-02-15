import { CSSProperties, useEffect, useState } from "react";

const ContentPlaceholder = () => {
    const [getTimeoutIsDone,setTimeoutIsDone] = useState (false);
    const styles: { [key:string]:CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        box: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '350px',
            width: '350px',
            backgroundColor: "white",
            borderRadius: 10,
            boxShadow: '5px 5px 15px 5px #000000'
        },
        img: {
            position: 'absolute',
            width: "100%",
            height: "50%",
            borderRadius: 10,
        },
        body_content: {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: "80%",
            height: "50%",
            bottom: '0px',
        },
        title: {
            color: 'transparent',
            fontWeight: 'bold',
            fontSize: '1.2vw',
            margin: 0,
            marginBottom: 1,
            padding: 0,
            borderRadius: 10,
        },
        body: {
            color: 'transparent',
            fontSize: '0.9vw',
            margin: 0,
            padding: 0,
            borderRadius: 10,
        },
        avatar: {
            width: "40px",
            height: "40px",
            borderRadius: 25,
        },
        avatar_container: {
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
        }
    }

    useEffect (() => {
        const elements = document.getElementsByClassName ('moveIt') as HTMLCollectionOf <HTMLElement>;
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.transitionDuration = '10s';
            elements[i].style.transitionDelay = `${i*50}ms`;
            elements[i].style.backgroundPosition = '1000px 20%';
        }

        const timeout = setTimeout (() => {
            setTimeoutIsDone (true);
        }, 5000);

        return () => clearTimeout (timeout);
    }, []);

    const linear = 'linear-gradient(to left, #f2f2e9 0%, #ebebe8 5%, #f2f2e9 30%, #f2f2e9 90% )';
    return (
        <div style = {styles.container}>
            <p>Content Placeholder</p>
            <div style={styles.box}>
                <div
                    className   = "moveIt"
                    style       = {{
                        ...styles.img,
                        background:  getTimeoutIsDone ? 'transparent' : linear,
                    }}
                >
                    <img
                        alt         = 'content-placeholder'
                        src         = {require('../assets/vc_background_2.jpg')}
                        style       = {{
                            ...styles.img,
                            display: getTimeoutIsDone ? 'flex' : 'none',
                            height: '100%'
                        }}
                    />
                </div>

                <div
                    style       = {styles.body_content}
                >
                    <p
                        className   = "moveIt"
                        style       = {{
                            ...styles.title,
                            color: getTimeoutIsDone ? 'black' : 'transparent',
                            background: getTimeoutIsDone ? 'transparent' : linear
                        }}
                    >Lorem ipsum dolor sit amet</p>

                    <p
                        className   = "moveIt"
                        style       = {{
                            ...styles.body,
                            color: getTimeoutIsDone ? 'black' : 'transparent',
                            background: getTimeoutIsDone ? 'transparent' : linear
                        }}
                    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis</p>

                    <div style={styles.avatar_container}>
                        <div
                            className   = "moveIt"
                            style       = {{
                                ...styles.avatar,
                                //background:  getTimeoutIsDone ? 'transparent' : linear
                            }}
                        >
                            <img
                                alt         = 'content-placeholder'
                                src         = {require('../assets/vc_background_4.jpg')}
                                style       = {{
                                    ...styles.avatar,
                                    display: getTimeoutIsDone ? 'flex' : 'none'
                                }}
                            />
                        </div>

                        <div style = {{
                            width: '250px',
                        }}>
                            <p
                            className   = "moveIt"
                            style       = {{
                                ...styles.title,
                                    fontSize: '0.8vw',
                                    marginLeft: 5,
                                    color: getTimeoutIsDone ? 'black' : 'transparent',
                                    background: getTimeoutIsDone ? 'transparent' : linear
                                }}
                            >AroliS G.</p>
                            <p
                                className   = "moveIt"
                                style       = {{
                                    ...styles.body,
                                    fontSize: '.7vw',
                                    marginLeft: 5,
                                    color: getTimeoutIsDone ? 'black' : 'transparent',
                                    background: getTimeoutIsDone ? 'transparent' : linear
                                }}
                            >Aug, 08. 2022</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentPlaceholder;
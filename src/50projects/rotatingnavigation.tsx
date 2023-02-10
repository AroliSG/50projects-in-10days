import {
    CSSProperties, useEffect, useState
} from "react";

import article from './articles.json';

const RotatingNavigation = () => {
    const [getAnimType, setAnimType]            = useState <number|null>(null);
    const [getArticleList, setArticleList]      = useState ([article]);
    const [getToggleForm, setToggleForm]        = useState (false)
    const [getSingleArticle, setSingleArticle]  = useState <{
        publisher?: string,
        title?: string,
        url?: string,
        body?: string,
        body2?: string,
        date?: any
    }>();

    const styles: { [key: string]: CSSProperties } = {
        container: {
            position: 'relative',
            backgroundColor:  "#5865F2",
            overflow: 'hidden',
        },
        page_container: {
            width: "45%",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
        },
        barsToggle: {
            position: 'absolute',
            alignSelf: "flex-start",
            backgroundColor: "#5865F2",
            padding: 25,
            borderBottomRightRadius: 50,
            zIndex: 2
        },
        articleBodyContainer: {
            fontSize: '.8vw'
        },
        articleTitleContainer: {
            display: 'flex',
            alignItems: "center"
        },
        articleTitle: {
            margin:0
        },
        articleOwner: {
            margin:0,
            fontSize: '.8vw',
            paddingLeft: "25px",
            color: "GrayText"
        },
        image: {
            width: "100%",
        },
        menu: {
            position: "absolute",
            bottom: "100px",
            zIndex: 999,
        },
        menuLabels: {
            margin:0,
            fontSize: '1.2vw',
            paddingLeft: 10,
        },
        menuGroup: {
            display: "flex",
            transitionDuration: "2s",
            transform: 'translateX(-200px)',
            cursor: "pointer",
        },
        overlay_container: {
            display: "flex",
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            justifyContent: "center",
            alignItems: 'flex-start',
            margin: "25px",
            zIndex: 2,
        },
        overlay_form: {
            backgroundColor: "#5865F2",
            display: 'flex',
            flexDirection: 'column',
            padding: 40,
            alignItems: "center",
            borderRadius: 10,
        },
        label: {
            fontSize: '1.2vw',
        },
        inputs: {
            width: '100%',
            padding: 5,
            margin: 5,
            borderRadius: 5
        }
    };

    useEffect (() => {
        let element = document.getElementsByClassName ('rotative') as HTMLCollectionOf<HTMLElement>;
        let menuLabel = document.getElementsByClassName ('menuLabel') as HTMLCollectionOf<HTMLElement>;

        if (typeof getAnimType === "number") {
            if (getAnimType === 1) {
                element[0].style.transform = `rotate(-15deg) translateY(-20%) translateX(10%)`;
                for (let i = 0; i < menuLabel.length; i++) {
                    let realNumber = i === 0 ? 15 : 25;
                    menuLabel.item(i)!.style.transform = `translateX(${realNumber}px)`;
                }

              //  moveIt[0].style.transform = `translateX(20px)`;
            }
            if (getAnimType === 0){
                element[0].style.transform = `rotate(-0deg) translateY(0%) translateX(0%)`;
                for (let i = 0; i < menuLabel.length; i++) {
                    menuLabel.item(i)!.style.transform = `translateX(-200px)`;
                }
            }
        }
    }, [getAnimType]);

    return (
        <div style={styles.container}  >
            <div style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: '#282c34',
            }}>
                 <div style = {styles.overlay_container}>
                 {getToggleForm ? <div style={styles.overlay_form}>
                        <input
                            placeholder ="Publisher name"
                            style       ={styles.inputs}
                            onChange    ={evt => {
                                const desc = {...getSingleArticle};
                                desc.publisher = evt.target.value;

                                setSingleArticle (desc);
                            }}
                        />
                        <input
                            placeholder ="Title"
                            style       ={styles.inputs}
                            onChange    = {evt => {
                                const desc = {...getSingleArticle};
                                desc.title = evt.target.value;

                                setSingleArticle (desc);
                            }}
                        />

                        <input
                            placeholder ="Image URL"
                            style       = {styles.inputs}
                            onChange    = {evt => {
                                const desc = {...getSingleArticle};
                                desc.url = evt.target.value;

                                setSingleArticle (desc);
                            }}
                        />

                        <textarea
                            placeholder ="Body"
                            style       ={styles.inputs}
                            onChange    = {evt => {
                                const desc = {...getSingleArticle};
                                desc.body = evt.target.value;

                                setSingleArticle (desc);
                            }}
                        />

                        <textarea
                            placeholder ="2nd body"
                            style       ={styles.inputs}
                            onChange    = {evt => {
                                const desc = {...getSingleArticle};
                                desc.body2 = evt.target.value;

                                setSingleArticle (desc);
                            }}
                        />
                        <div style={{
                            display: 'flex'
                        }}>
                            <input
                                type    = {'submit'}
                                onClick = {evt => {
                                        // turning off form
                                setToggleForm (false);
                                        // date
                                    const date =  new Date ();
                                    getSingleArticle!.date = `${date.getFullYear ()}-0${date.getMonth ()}-0${date.getDay ()}`;

                                        /*
                                            adding new article to the list
                                        @ts-ignore */
                                    setArticleList (list => [getSingleArticle, ...list]);
                                }}
                            />
                            <i
                                className   = "fa fa-close"
                                style       = {{
                                    paddingLeft: 10
                                }}
                                onClick     = {() => setToggleForm (false)}
                            />
                        </div>
                    </div> : null}
                </div>

                <p style={{
                    alignSelf: "center"
                }}>Rotative Navigation</p>

                <div style={styles.barsToggle}>
                    <i className = "fa fa-bars" onClick={() => {
                        setAnimType (n => n === 1 ? 0 : 1);
                        setToggleForm (false);
                    }}></i>
                </div>
            </div>
            <div
                className   = "rotative"
                style       = {{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: '#282c34',
                    transitionDuration: "2s",
                }}
            >
                {getArticleList.map (article => {
                    return (
                        <div style={styles.page_container}>
                            <h2 style = {styles.articleTitle}>{article.title}</h2>
                            <p style={styles.articleOwner}>Published by {article.publisher}</p>
                            <p style={styles.articleBodyContainer}>{article.body}</p>

                            <img
                                alt     = {"article"}
                                style   = {styles.image}
                                src     = {article.url}
                            />

                            <p style={styles.articleBodyContainer}>{article.body2}</p>
                            <p style={styles.articleOwner}>Last edited {article.date}</p>
                        </div>
                    )
                })}
        </div>
            <div style= {styles.menu}>
                <div
                    className   = "menuLabel"
                    style       = {styles.menuGroup}
                    onMouseDown = {evt => {
                        evt.currentTarget.style.opacity = ".5";
                    }}
                    onMouseUp   = {evt => evt.currentTarget.style.opacity = "1"}
                >
                    <i className = "fa fa-home"/>
                    <p style = {styles.menuLabels}>Home</p>
                </div>
                <div
                    className   = "menuLabel"
                    style       = {styles.menuGroup}

                    onClick = {evt => {
                        setToggleForm (f=>!f);
                        setAnimType (0);
                    }}
                >
                    <i className = "fa fa-plus"/>
                    <p  style = {styles.menuLabels}>Add</p>
                </div>
            </div>
        </div>
    )
}

export default RotatingNavigation;
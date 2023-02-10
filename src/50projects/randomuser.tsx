import { CSSProperties, useEffect, useState } from "react";
import axios from "axios";

const RandomUser = () => {
    const styles: {[key: string]: CSSProperties} = {
        container: {
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            width: "100vw",
            height: "100vh",
        },
        sub_container: {
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: "#5865F2",
            padding: "15px",
            borderRadius: 10,
            width: "30%",
        },
        img: {
            height: '150px',
            width: '150px',
            borderRadius: "100px",
            border: `2px solid white`,
        },
        json_container: {
            backgroundColor: "white",
            marginTop: "15px",
            borderRadius: 5,
            border: `2px solid #5865F2`,
        },
        icon_container: {
            margin: "10px"
        },
        icons: {
            fontSize: '1.5vw',
            margin: "10px"
        },
        label: {
            fontSize: '1vw',
            fontWeight: 'bold',
            color: 'black'
        },
        button: {
            fontSize: '1vw',
            fontWeight: 'bold',
            color: 'black',
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
            borderWidth: 1
        }
    }

    const [getForceReload, setForceReload] = useState (0);
    const [getDataUpdated, setDataUpdated] = useState <any> ();

    const default_item = (first: string, second: string, intro: string) => {
        document.getElementsByClassName ("content")[0]
        .innerHTML = `
            <label style = '
                color:gray;
                font-size:1.2vw;
                font-weight:bold;
            '>${intro}</label>

            <label style = '
                color:black;
                font-size:1.2vw;
                font-weight:bold;
            '>${first} ${second}</label>
        `
    }

    useEffect (() => {
        axios.get ('https://randomuser.me/api' )
            .then (res => {
                setDataUpdated (res.data.results[0]);
                default_item (res.data.results[0].name.first, res.data.results[0].name.last, "Hi, my name is");

                document.getElementsByClassName ("json")[0].innerHTML = "<pre>"+JSON.stringify(res.data.results[0] ,undefined, 2) +"</pre>"
            });
    }, [getForceReload]);

    const mouseOut = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => evt.currentTarget.style.opacity = '1';

    return (
        <div style={styles.container}>
            <p>Random User Generator</p>
            {getDataUpdated ?
                <div style={styles.sub_container}>
                    <div style = {styles.img_container}>
                        <img
                            alt     = {'avatar'}
                            style   = {styles.img}
                            src     = {getDataUpdated?.picture.large}
                        />
                    </div>

                    <div style = {{
                        display: "flex",
                        width: "100%",
                        height: "15vh",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: 'column',
                        backgroundColor: "white",
                        borderRadius: 5
                    }} className="content"/>

                    <button
                        style       = {styles.button}
                        onMouseUp  = {mouseOut}
                        onMouseDown = {evt => {
                            evt.currentTarget.style.opacity = '.1'
                            setForceReload (f=>f+1)
                        }}
                    >
                        Press to generate
                    </button>

                    <div style = {styles.icon_container}>
                        <i
                            className   = "fa fa-user-circle"
                            style       = {styles.icons}
                            onMouseOver = {evt => {
                                default_item (getDataUpdated.name.first, getDataUpdated.name.last, "Hi, my name is");
                                evt.currentTarget.style.opacity = '0.5';
                            }}
                            onMouseOut  = {mouseOut}
                        />

                        <i
                            className   = "fa fa-mail-forward"
                            style       = {styles.icons}
                            onMouseOver = {evt => {
                                default_item (getDataUpdated.email, '', "My email address is");
                                evt.currentTarget.style.opacity = '0.5';
                            }}
                            onMouseOut  = {mouseOut}
                        />
                        <i
                            className   = "fa fa-calendar"
                            style       = {styles.icons}
                            onMouseOver = {evt => {
                                default_item (getDataUpdated.dob.date, ' - ' + getDataUpdated.dob.age + ' years old', "My day of birth");
                                evt.currentTarget.style.opacity = '0.5';
                            }}
                            onMouseOut  = {mouseOut}
                        />
                        <i
                            className   = "fa fa-map"
                            style       = {styles.icons}
                            onMouseOver = {evt => {
                                default_item (getDataUpdated.location.street.number, ' - ' + getDataUpdated.location.street.name, "My address, From " + getDataUpdated.location.state);
                                evt.currentTarget.style.opacity = '0.5';
                            }}
                            onMouseOut  = {mouseOut}
                        />
                        <i
                            className   = "fa fa-phone"
                            style       = {styles.icons}
                            onMouseOver = {evt => {
                                default_item (getDataUpdated.phone, '', "My phone number");
                                evt.currentTarget.style.opacity = '0.5';
                            }}
                            onMouseOut  = {mouseOut}
                        />
                        <i
                            className   = "fa fa-lock"
                            style       = {styles.icons}
                            onMouseOver = {evt => {
                                default_item (getDataUpdated.login.password, '', "Password I normally use");
                                evt.currentTarget.style.opacity = '0.5';
                            }}
                            onMouseOut  = {mouseOut}
                        />
                    </div>
                </div>
            :
            <p>Loading data..</p>}
            <label style={{
                ...styles.label,
                ...{
                    color: 'white',
                    marginTop: 5
                }
                }}>Powered by <a style ={{color:"blue"}}href="https://randomuser.me" target={'_blank'} rel ={'noreferrer'}>Random User</a></label>
            <div style = {styles.json_container}>
                <label style={styles.label} className="json" />
            </div>
        </div>
    )
}

export default RandomUser;
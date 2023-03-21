import { CSSProperties, useState } from "react";

const ToastNotification = () => {
    const [getNotifications, setNotifications]  = useState <number[]> ([]);
    const [getForceReload, setForceReload]     = useState (0);
    const styles: {[key:string]:CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttons: {
            backgroundColor: 'pink',
            borderWidth: 0,
            padding: '20px',
            borderRadius: 10
        },
        toast_container: {
            position: "absolute",
            bottom: 0,
            right:0,
            overflowX: 'hidden'
        },
        toast:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: 'pink',
            borderRadius: 10,
            margin: '5px',
            fontSize: '1vw',
            transitionDuration: '2s',
           // transform: 'translateX(100%)'
        }
    }

    const remove = (index: number) => {
        setTimeout (() => {
            setNotifications (dup => {
                const Id = dup.indexOf (index+1);

                if (Id !== -1) {
                    dup.splice (Id, 1);
                    setForceReload (f=>f+1);
                }

                return dup;
            });
        },3000);
    }

    const add = () => {
        setNotifications (p =>{
                // removing new notification
            remove (p.length);

                // adding new notification
            const len = p.length+1;
            return [...p, len];
        });
    }

    return (
        <div style={styles.container} key = {getForceReload}>
            <p>Toast Notification</p>
            <button
                onClick = {add}
                style={styles.buttons}
            >Show notification</button>
            <div style={styles.toast_container}>
                {getNotifications!.length > 0 ? getNotifications.map ((_, index) => {
                    return (
                        <div style  = {{
                            ...styles.toast,
                          //  transform: 'translateX(-10%)'
                        }}>
                            <p style = {{
                                margin:0,
                                padding:0
                            }}>Notification {index}</p>
                        </div>
                    )
                }) : null}
            </div>
        </div>
    )
}

export default ToastNotification;
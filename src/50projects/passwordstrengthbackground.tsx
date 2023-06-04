import { CSSProperties, useState } from "react";

const passwordIntegrity = (password: string) => {
    let percent = 0;
        // password contains numbers
    if (/\d/.test(password)) percent += 5;

        // password contains upper case letter
    if (/[A-Z]/.test(password)) percent += 5;

        // password contains lower case letter
    if (/[a-z]/.test(password)) percent += 5;

    if (/[!#@$%^&[*(\])_+{}:'./,;~`*-><?]/.test(password)) percent += 5;

    if (password.length >= 5) percent += 5;

    return percent;
}

const PasswordStrengthBackground = () => {
    const [getBlur, setBlur] = useState (0);
    return (
        <div style={styles.container}>
            <img
                alt     = "background"
                src     = {require('../assets/vc_background_0.jpg')}
                style   = {{
                    ...styles.image,
                    filter: `blur(${getBlur}px)`
                }}
            />
            <h1>Password Strength Background</h1>
            <div style={styles.square}>
                <p style={styles.title}>Login</p>
                <div style={styles.items}>
                    <p style={styles.label}>Email:</p>
                    <input
                        style           = {styles.input}
                        placeholder     = "Email"
                        type            = "email"
                    />
                </div>

                <div style={styles.items}>
                    <p style={styles.label}>Password:</p>
                    <input
                        style           = {styles.input}
                        placeholder     = "Password"
                        type            = "password"
                        onChange        = {evt => {
                            const msg = evt.currentTarget.value;
                            setBlur (passwordIntegrity (msg));
                        }}
                    />
                </div>

                <input
                    style           = {{
                        ...styles.input,
                        width: "82%",
                        marginTop: "50px",
                    }}
                    type            = "submit"
                />
            </div>
        </div>
    );
}

const styles: { [key: string]: CSSProperties } =  {
    container: {
        position: "relative",
        display: "flex",
        width: '100vw',
        height: '93vh',
     //   backgroundImage: `url(${require('../assets/vc_background_1.jpg')})`,
     //   backgroundPositionY: -250,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        width: '500px',
        height: '500px',
        backgroundColor: 'rgba(255, 255, 255, 255)',
        borderRadius: '5px',
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 255)',
        alignItems: 'center',
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",

    },
    image: {
        position: "absolute",
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1
    },
    input: {
        width: '100%',
        height: '40px',
        fontSize: '20px',
        borderRadius: '5px',
    },
    items: {
        width: "80%"
    },
    label: {
        color: "black",
        fontSize: "20px"
    },
    title: {
        color: "black",
        fontSize: "30px",
        fontWeight: 'bold'
    }
}

export default PasswordStrengthBackground;
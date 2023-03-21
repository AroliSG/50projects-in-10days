import { CSSProperties, useState } from "react";

type generatorTypes = {
    options: {
        uppercase: boolean,
        lowercase: boolean,
        numbers: boolean,
        symbols: boolean
    }
}

    // password generator
    // generates a random password depending on length provided, longer password + randomized
    // very easy and simple, not 100% random but is almost there hh
const generate_password = (len: number, options: generatorTypes['options']) => {
    const numbers  = [0,1,2,3,4,5,6,7,8,9]
    const symbols  = ['&','^','%','$','#','@','!','_','+','=',')','(',']','[','{','}','|','*','-','+', '~'];
    const alphabet = new Array(26).fill(null).map((_,i) => String.fromCharCode(65+i));

    let generated = '';
    for (let i = 0; i < len; i++) {
            // identifier to choose when to pick one generator
            // real random generator somehow?
        let identifier = Math.floor (Math.random () * 4);

            // lowercase generator
        if (options.lowercase && identifier === 0) generated += alphabet[Math.floor (Math.random () * alphabet.length)].toLocaleLowerCase ();

            // uppercase generator
        if (options.uppercase && identifier === 1) generated += alphabet[Math.floor (Math.random () * alphabet.length)]

            // number generator
        if (options.numbers && identifier === 2) generated += numbers[Math.floor (Math.random () * numbers.length)];

            // symbols generator
        if (options.symbols && identifier === 3) generated += symbols[Math.floor (Math.random () * symbols.length)];
    }

    return generated;
}

const copyToClipboard = async (password: string) => {
    await navigator.clipboard.writeText (password);
    alert ("Copied to clipboard");
}

const PasswordGenerator = () => {
    const [getPasswordGenerated, setPasswordGenerated]      = useState ('');
    const [getPasswordLen, setPasswordLen]                  = useState (5);
    const [getPasswordOptions, setPasswordOptions]          = useState ({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });

    const styles: {[key:string]:CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        box: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'pink',
            height: '350px',
            width: '300px',
            alignItems: 'center',
            borderRadius: 5,
            marginTop: '25px'
        },
        labels: {
            fontSize: '1vw',
            margin:5
        },
        password_label_container: {

            backgroundColor: "red",
            opacity: 0.5,
            height: '40px',
            width: '85%',
            margin: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
            paddingInline: 5,
            marginBottom: '25px',
            fontSize: '1.2vw'
        },
        options_container: {
            display: 'flex',
            width: '85%',
            margin: 0,
            padding: 0,
            justifyContent: 'space-between'
        },
        input: {
            outline: 0,
            borderRadius: 5,
            borderWidth: 0,
            margin: 0
        },
        icon: {
            position: 'absolute',
            left: 0,
            margin: 5,
            fontSize: '1.1vw'
        }
    }

    const toggleBox = (id: 'lowercase' | 'uppercase' | 'numbers' | 'symbols') => {
        setPasswordOptions ({
            ...getPasswordOptions,
            [id]: getPasswordOptions[id] = !getPasswordOptions[id]
        });

    }

    const {uppercase,lowercase,numbers,symbols} = getPasswordOptions;

    return (
        <div style = {styles.container}>
            <div style = {styles.box}>
                <i style = {styles.icon}className = "fa fa-clipboard" onClick={() => copyToClipboard (getPasswordGenerated)}/>
                <p style={styles.labels}>Password Generator</p>
                <div style = {{
                    ...styles.password_label_container,
                    overflowY: 'hidden',
                    overflowX: 'scroll'
                }}>
                    <p style = {styles.password_label}>{getPasswordGenerated}</p>
                </div>
                <div style={styles.options_container}>
                    <p style={styles.labels}>Length</p>
                    <input
                        value       = {getPasswordLen}
                        type        = {'number'}
                        onChange    = {evt => setPasswordLen (parseInt (evt.currentTarget.value, 10))}
                        style       = {{
                           ...styles.input,
                           width: '50px',
                        }}
                    />
                </div>
                <div style={styles.options_container}>
                    <p style={styles.labels}>Uppercase</p>
                    <input
                        checked     = {uppercase}
                        onChange    = {evt => toggleBox ('uppercase')}
                        type        = {'checkbox'}
                        style       = {{
                           ...styles.input
                        }}
                    />
                </div>
                <div style={styles.options_container}>
                    <p style={styles.labels}>Lowercase</p>
                    <input
                        checked     = {lowercase}
                        type        = {'checkbox'}
                        onChange    = {evt => toggleBox ('lowercase')}
                        style       = {{
                           ...styles.input
                        }}
                    />
                </div>
                <div style={styles.options_container}>
                    <p style={styles.labels}>Numbers</p>
                    <input
                        onChange    = {evt => toggleBox ('numbers')}
                        checked     = {numbers}
                        type        = {'checkbox'}
                        style       = {{
                           ...styles.input
                        }}
                    />
                </div>
                <div style={styles.options_container}>
                    <p style={styles.labels}>Symbols</p>
                    <input
                        onChange    = {evt => toggleBox ('symbols')}
                        checked     = {symbols}
                        type        = {'checkbox'}
                        style       = {{
                           ...styles.input
                        }}
                    />
                </div>
                <button
                        // assigning password generated to the state
                    onClick = {() => setPasswordGenerated (
                        generate_password (
                                    // password length
                                getPasswordLen,

                                    // password generator options
                                getPasswordOptions
                            )
                        )
                    }
                    style   = {{
                        ...styles.password_label_container,
                        marginTop: "20px",
                        backgroundColor: "#5865F2",
                        justifyContent: 'center',
                        borderWidth: 0,
                        opacity: 0.9
                    }}
                >Generate</button>
            </div>
        </div>
    )
}


export default PasswordGenerator;
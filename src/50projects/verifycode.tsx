import {
    CSSProperties
} from 'react';

const VerifyCode = () => {
    const styles: {[key: string]: CSSProperties} =  {
        square: {
            height: '300px',
            width: '500px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '2px solid black',
            borderRadius: '10px',
        },
        title: {
            fontWeight: 'bold',
            fontSize: 25,
            color: 'black',
            margin: 0,
            padding: 5,
        },
        body: {
            fontWeight: 'bold',
            fontSize: 15,
            color: 'black',
            margin: 0,
            padding: 0,
        },
        parent: {
            marginTop: '50px',
            display: 'flex',
        },
        code: {
            display: 'flex',
            height: '40px',
            width: '40px',
            margin: 5,
            border: '1px solid black',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: "center",
            borderRadius: "5px",

        }
    }

    const changeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const elements  = document.getElementsByClassName ('boxes') as HTMLCollectionOf<HTMLElement>;
        const value     = parseInt(evt.target.getAttribute ("data-index")!, 10);
        elements[value+1]?.focus ();
    }

    return (
        <div>
            <h3>Verify Code</h3>
            <div style={styles.square}>
                <p style={styles.title}>Verify your account</p>
                <p style={styles.body}>A 6 length verification code was sent into your account</p>
                <div style={styles.parent}>
                    {Array(6).fill (null).map ((_, idx) => (
                        <input
                            className   = 'boxes'
                            maxLength   = {1}
                            size        = {1}
                            type        = 'numeric'
                            data-index  = {idx}
                            style       = {styles.code}
                            onChange    = {changeInput}
                            placeholder = '0'
                        />)
                    )}
                </div>
                <p style={{
                    ...styles.body,
                    marginTop: '50px',
                    color: 'gray'
                }}>This is a design template, no emails were sent to you.</p>
            </div>
        </div>
    )
}

export default VerifyCode;
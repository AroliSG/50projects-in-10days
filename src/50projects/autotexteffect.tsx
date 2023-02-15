import { CSSProperties, useEffect, useState } from "react";


const originalText = 'We Love Programming!!';
const AutoTextEffect = () => {
    const [getLabel, setLabel] = useState ('W');
    const [getSpeedNumber, setSpeedNumber] = useState (10);

    const styles: {[key:string]:CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            alignItems: 'center'
        },
        parent: {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center'
        },
        input: {
            backgroundColor: 'rgba(0,0,0,10%)',
            borderWidth: 0,
            outline: 0,
            padding: 5,
            fontSize: '1vw',
            color:'white'
        },
        label: {
            margin: 0,
            fontSize: '1vw',
            paddingRight: '5px'
        }
    }

    useEffect (() => {
        const interval = setInterval (() => {
            setLabel (label => {
                label = originalText.slice (0,label.length+1);
                if (label.length === originalText.length) return 'W';
                return label;
            })
        }, getSpeedNumber/10 * 500);

        return () => clearInterval (interval);
    }, [getSpeedNumber])

    return (
        <div style = {styles.container}>
            <p>Auto Text Effect</p>
            <p>{getLabel}</p>
            <div style = {styles.parent}>
                <p style={styles.label}>Speed:</p>
                <input
                    style       = {styles.input}
                    type        = {'number'}
                    value       = {getSpeedNumber}
                    onChange    = {evt => {
                        if (evt.currentTarget.value === '0') return 1;
                        if (evt.currentTarget.value === '11') return 10;

                        return setSpeedNumber (parseInt (evt.currentTarget.value,10));
                    }}
                />
            </div>

        </div>
    )
}

export default AutoTextEffect;